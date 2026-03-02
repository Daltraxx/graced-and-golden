"use server";

import { BrevoClient } from "@getbrevo/brevo";
import {
  NewsletterSubscriptionSchema,
  NewsletterSubscriptionState,
} from "../schema/NewsletterSubscriptionSchema";

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

  // Create Brevo contact and add to newsletter list
  try {
    const data = await brevoClient.contacts.createContact({
      email: validatedFields.data.email,
      listIds: [Number(process.env.BREVO_NEWSLETTER_LIST_ID || "3")],
    });

    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter subscription successful:", data);
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
