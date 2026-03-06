"use server";

import { BrevoClient } from "@getbrevo/brevo";
import {
  NewsletterSubscriptionSchema,
  NewsletterSubscriptionState,
} from "../schema/NewsletterSubscriptionSchema";

// TODO: Add status code if found to exist
type BrevoError = {
  code: string;
  message: string;
};

const isBrevoError = (error: unknown): error is BrevoError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
};

/**
 * Subscribes a user to the newsletter via Brevo API
 *
 * @param prevState - The previous state of the newsletter subscription form
 * @param formData - The form data containing the email address to subscribe
 * @returns A promise resolving to the subscription state with success status and message
 *
 * @remarks
 * - Validates the email address using the NewsletterSubscriptionSchema
 * - Creates a contact in Brevo and adds them to the newsletter list
 * - Handles cases where the contact already exists in Brevo and ensures they are added to the newsletter list
 * - Requires BREVO_API_KEY environment variable to be set
 * - Uses BREVO_NEWSLETTER_LIST_ID environment variable (defaults to "3" if not set)
 * - Logs successful subscriptions in development mode
 *
 * @example
 * ```typescript
 * const formData = new FormData();
 * formData.append('email', 'user@example.com');
 * const result = await subscribeToNewsletter({}, formData);
 * if (result.success) {
 *   console.log(result.message);
 * }
 * ```
 *
 * @throws Does not throw errors directly; returns error state object instead
 */
export async function subscribeToNewsletter(
  prevState: NewsletterSubscriptionState,
  formData: FormData,
): Promise<NewsletterSubscriptionState> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Brevo API key is not properly configured.");
    return {
      message: "Failed to subscribe to the newsletter. Please contact support.",
      success: false,
    };
  }

  const brevoClient = new BrevoClient({ apiKey });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = NewsletterSubscriptionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message:
        "Invalid email address. Please enter a valid email to subscribe to the newsletter.",
    };
  }

  const subscriptionListId = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || "3",
    10,
  );

  // Check if contact already exists in Brevo.
  // If it does, skip creating a new contact and just ensure they are in the newsletter list.
  try {
    const contactData = await brevoClient.contacts.getContactInfo({
      identifier: validatedFields.data.email,
    });

    const contactsLists = contactData.listIds;
    if (!contactsLists.includes(subscriptionListId)) {
      // Add existing contact to newsletter list
      await brevoClient.contacts.updateContact({
        identifier: validatedFields.data.email,
        listIds: [...contactsLists, subscriptionListId],
      });
      if (process.env.NODE_ENV === "development") {
        console.log("Contact already exists, ensured in newsletter list.");
      }
      return {
        message:
          "Successfully subscribed to the newsletter! Thank you for joining.",
        success: true,
      };
    }
  } catch (error) {
    if (isBrevoError(error) && error.code === "document_not_found") {
      if (process.env.NODE_ENV === "development") {
        console.log("Contact not found in Brevo, will create new contact.");
      }
    } else {
      console.error("Error checking existing contact in Brevo:", error);
      return {
        message:
          "Failed to subscribe to the newsletter. Please try again later.",
        success: false,
      };
    }
  }

  // Create Brevo contact and add to newsletter list
  try {
    const data = await brevoClient.contacts.createContact({
      email: validatedFields.data.email,
      listIds: [subscriptionListId],
    });

    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter subscription successful:", data);
    }

    // Send first time subscription email
    try {
      await brevoClient.transactionalEmails.sendTransacEmail({
        subject: "Welcome to the Graced and Golden Newsletter!",
        sender: {
          name: "Graced and Golden",
          email: "hello@gracedandgolden.com",
        },
        to: [{ email: validatedFields.data.email }],
        templateId: 1,
      });
    } catch (emailError) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Failed to send subscription confirmation email:",
          emailError,
        );
      }
      // Not critical to subscription success, so we won't return an error state here
    }

    return {
      message:
        "Successfully subscribed to the newsletter! Thank you for joining.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to subscribe to the newsletter:", error);
    return {
      message: "Failed to subscribe to the newsletter. Please try again later.",
      success: false,
    };
  }
}
