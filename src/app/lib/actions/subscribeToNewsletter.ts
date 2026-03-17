"use server";

import { BrevoClient } from "@getbrevo/brevo";
import {
  NewsletterSubscriptionSchema,
  NewsletterSubscriptionState,
} from "@/app/lib/schema/NewsletterSubscriptionSchema";
import sendFirstTimeSubscriberEmail from "@/app/lib/emailActions/sendFirstTimeSubscriberEmail";
import unblacklistContact from "@/app/lib/emailActions/unblacklistContact";
import createContact from "@/app/lib/emailActions/createContact";
import getBrevoContactData from "@/app/lib/emailActions/getBrevoContactData";

// Helper function to send welcome email to subscriber and normalize error handling for that action
const sendWelcomeEmailToSubscriber = async (
  email: string,
  brevoClient: BrevoClient,
) => {
  const result = await sendFirstTimeSubscriberEmail(email, brevoClient);
  if (!result.success) {
    console.error(result.message);
    // We won't return an error state here since the subscription itself was successful
  }
};

const DEFAULT_NEWSLETTER_LIST_ID = "3"; // Default Brevo newsletter list ID
const DEFAULT_UNSUBSCRIBED_LIST_ID = "4"; // Default Brevo unsubscribed list ID

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
 * - Uses BREVO_UNSUBSCRIBED_LIST_ID environment variable (defaults to "4" if not set)
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
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Validation failed:",
        validatedFields.error.flatten().fieldErrors,
      );
    }
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message:
        "Invalid email address. Please enter a valid email to subscribe to the newsletter.",
    };
  }

  const subscriptionListId = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || DEFAULT_NEWSLETTER_LIST_ID,
    10,
  );

  if (isNaN(subscriptionListId)) {
    console.error("Invalid BREVO_NEWSLETTER_LIST_ID configuration.");
    return {
      message: "Failed to subscribe to the newsletter. Please contact support.",
      success: false,
    };
  }

  // LOGIC FOR EXISTING CONTACTS:
  const getContactDataResult = await getBrevoContactData(
    validatedFields.data.email,
    brevoClient,
  );

  if (!getContactDataResult.success && getContactDataResult.code !== 404) {
    console.error(
      "Error checking existing contact in Brevo:",
      getContactDataResult.error,
    );
    return {
      message: "Failed to subscribe to the newsletter. Please try again later.",
      success: false,
    };
  }
  
  const contactExists =
    getContactDataResult.success && getContactDataResult.data;

  if (contactExists) {
    const contactData = getContactDataResult.data;
    const { emailBlacklisted, listIds } = contactData;
    // If on blacklist, has unsubscribed using the Brevo unsubscribe link. Must unblock before resubscribing.
    if (emailBlacklisted) {
      const unblockResult = await unblacklistContact(
        validatedFields.data.email,
        brevoClient,
      );
      if (!unblockResult.success) {
        return {
          message:
            "Error removing contact from unsubscribed list. Please contact support to resolve this issue.",
          success: false,
        };
      }
    }

    if (listIds.includes(subscriptionListId)) {
      // If contact already exists and is already in the newsletter list, return success without trying to add again
      return {
        message:
          "Already subscribed to the newsletter, but we appreciate it anyway.",
        success: true,
      };
    } else {
      // Add existing contact to newsletter list
      await brevoClient.contacts.updateContact({
        identifier: validatedFields.data.email,
        listIds: [...listIds, subscriptionListId],
      });
      if (process.env.NODE_ENV === "development") {
        console.log("Contact already exists, ensured in newsletter list.");
      }

      const unsubscribedListId = parseInt(
        process.env.BREVO_UNSUBSCRIBED_LIST_ID || DEFAULT_UNSUBSCRIBED_LIST_ID,
        10,
      );

      const hasSubscribedBefore = listIds.includes(unsubscribedListId);
      if (!hasSubscribedBefore && !emailBlacklisted) {
        // Send welcome email for first time subscribers only
        await sendWelcomeEmailToSubscriber(
          validatedFields.data.email,
          brevoClient,
        );

        return {
          message:
            "Successfully subscribed to the newsletter! Thank you for joining.",
          success: true,
        };
      }

      // Don't send welcome email if they had previously unsubscribed, but still return success
      return {
        message: "Welcome back! You've been re-subscribed to the newsletter.",
        success: true,
      };
    }
  }

  // LOGIC FOR NEW CONTACTS:
  const createContactResult = await createContact(
    validatedFields.data.email,
    brevoClient,
    {
      listIds: [subscriptionListId],
    },
  );

  if (!createContactResult.success) {
    console.error(
      "Error creating contact in Brevo:",
      createContactResult.error,
    );
    return {
      message: "Failed to subscribe to the newsletter. Please try again later.",
      success: false,
    };
  }

  // Send first time subscription email
  await sendWelcomeEmailToSubscriber(validatedFields.data.email, brevoClient);

  return {
    message:
      "Successfully subscribed to the newsletter! Thank you for joining.",
    success: true,
  };
}
