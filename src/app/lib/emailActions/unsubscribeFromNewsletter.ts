"use server";

import { BrevoClient } from "@getbrevo/brevo";
import { EmailSchema } from "@/app/lib/schema/EmailSchema";
import { isBrevoError } from "@/app/lib/types/BrevoError";

export type UnsubscribeResult = {
  success: boolean;
  message: string;
};

const DEFAULT_NEWSLETTER_LIST_ID = "3"; // Default Brevo newsletter list ID
const DEFAULT_UNSUBSCRIBED_LIST_ID = "4"; // Default Brevo unsubscribed list ID

// ORGANIZE

/**
 * Unsubscribes a user from the newsletter by removing their email from the newsletter list
 * and adding it to the unsubscribed list using the Brevo API.
 *
 * Validates the email address, checks required environment variables, and handles errors gracefully.
 * Returns a result indicating success or failure, along with a user-friendly message.
 *
 * @param email - The email address of the user to unsubscribe.
 * @returns A promise that resolves to an `UnsubscribeResult` indicating the outcome.
 *
 * @throws Will log errors to the console if environment variables are misconfigured,
 *         the email is invalid, or if Brevo API calls fail.
 */
export default async function unsubscribeFromNewsletter(
  email: string,
): Promise<UnsubscribeResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Brevo API key is not properly configured.");
    return {
      message:
        "Failed to unsubscribe from the newsletter. Please contact support.",
      success: false,
    };
  }

  // Validate the email address before making API calls
  const validatedEmail = EmailSchema.safeParse(email);
  if (!validatedEmail.success) {
    console.error(
      "Invalid email address:",
      validatedEmail.error.flatten().fieldErrors,
    );
    return {
      success: false,
      message: "Invalid email address.",
    };
  }

  const subscriptionListId = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || DEFAULT_NEWSLETTER_LIST_ID,
    10,
  );
  const unsubscribedListId = parseInt(
    process.env.BREVO_UNSUBSCRIBED_LIST_ID || DEFAULT_UNSUBSCRIBED_LIST_ID,
    10,
  );

  if (isNaN(subscriptionListId) || isNaN(unsubscribedListId)) {
    if (isNaN(subscriptionListId)) {
      console.error("Invalid BREVO_NEWSLETTER_LIST_ID configuration.");
    } else {
      console.error("Invalid BREVO_UNSUBSCRIBED_LIST_ID configuration.");
    }
    return {
      message:
        "Failed to unsubscribe from the newsletter. Please contact support.",
      success: false,
    };
  }

  // Make API calls to Brevo to update the contact's subscription status
  const brevoClient = new BrevoClient({ apiKey });

  // First, remove the contact from the newsletter list
  try {
    await brevoClient.contacts.removeContactFromList({
      listId: subscriptionListId,
      body: { emails: [validatedEmail.data] },
    });
  } catch (error) {
    if (isBrevoError(error)) {
      if (error.statusCode === 400) {
        return {
          success: false,
          message: "No subscribed users found with the provided email address.",
        };
      } else {
        console.error("Error removing contact from newsletter list:", error);
        return {
          success: false,
          message:
            "Failed to unsubscribe from the newsletter. Please contact support.",
        };
      }
    }
  }
  
  // Then, add the contact to the unsubscribed list and mark as blacklisted to prevent future campaign emails
  try {
    await brevoClient.contacts.updateContact({
      identifier: validatedEmail.data,
      listIds: [unsubscribedListId],
      emailBlacklisted: true,
    });

    return {
      success: true,
      message: "Successfully unsubscribed from the newsletter.",
    };
  } catch (error) {
    console.error(
      "Error occurred when updating contact to unsubscribed list:",
      error,
    );
    // Even if adding to the unsubscribed list fails, we consider the unsubscription successful
    return {
      success: true,
      message: "Successfully unsubscribed from the newsletter.",
    };
  }
}
