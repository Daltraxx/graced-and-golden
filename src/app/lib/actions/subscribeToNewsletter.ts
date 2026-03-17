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

/**
 * Subscribes a user to the newsletter via Brevo email service.
 *
 * @async
 * @function subscribeToNewsletter
 * @param {NewsletterSubscriptionState} prevState - The previous state of the newsletter subscription form
 * @param {FormData} formData - The form data containing the email to subscribe
 * @returns {Promise<NewsletterSubscriptionState>} The result state containing success status and message
 *
 * @description
 * This function handles the complete newsletter subscription workflow:
 * - Validates the email input against the NewsletterSubscriptionSchema
 * - Checks if the contact already exists in Brevo
 * - For existing contacts: removes them from blacklist if necessary (re-subscription)
 * - For existing non-blacklisted contacts: returns already subscribed message
 * - For new contacts: creates a new contact and sends a welcome email
 *
 * @throws Does not throw errors; returns error states in the response object
 *
 * @example
 * const formData = new FormData();
 * formData.append('email', 'user@example.com');
 * const result = await subscribeToNewsletter({}, formData);
 * if (result.success) {
 *   console.log(result.message);
 * }
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

  // LOGIC FOR EXISTING CONTACTS:
  const getContactDataResult = await getBrevoContactData(
    validatedFields.data.email,
    brevoClient,
  );

  if (!getContactDataResult.success && getContactDataResult.code !== 404) {
    return {
      message: "Failed to subscribe to the newsletter. Please try again later.",
      success: false,
    };
  }

  const contactExists = getContactDataResult.success;

  if (contactExists) {
    const contactData = getContactDataResult.data;
    if (!contactData) {
      console.error(
        "Unexpected error: Contact data is missing despite successful retrieval.",
      );
      return {
        message:
          "Failed to subscribe to the newsletter. Please try again later.",
        success: false,
      };
    }

    const { emailBlacklisted } = contactData;
    // If on blacklist, must remove from blacklist to effectively re-subscribe them
    if (emailBlacklisted) {
      const unblockResult = await unblacklistContact(
        validatedFields.data.email,
        brevoClient,
      );
      if (!unblockResult.success) {
        return {
          message:
            "Error resubscribing. Please contact support to resolve this issue.",
          success: false,
        };
      }
      // Resubscribe successful
      return {
        message: "Welcome back! You've been re-subscribed to the newsletter.",
        success: true,
      };
    } else {
      // User is already subscribed
      return {
        message:
          "Already subscribed to the newsletter, but we appreciate it anyway.",
        success: true,
      };
    }
  }

  // LOGIC FOR NEW CONTACTS:
  const NEWSLETTER_LIST_ID = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || "3",
    10,
  ); // Brevo list ID for newsletter subscribers - add to this list upon contact creation so we know they signed up from the newsletter CTA
  const createContactResult = await createContact(
    validatedFields.data.email,
    brevoClient,
    { listIds: [NEWSLETTER_LIST_ID] }, // Add to newsletter list upon creation so we know they signed up from CTA
  );

  if (!createContactResult.success) {
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
