"use server";

import { BrevoClient } from "@getbrevo/brevo";
import { EmailSchema } from "@/app/lib/schema/EmailSchema";
import { isBrevoError } from "../types/BrevoError";

export type UnsubscribeResult = {
  success: boolean;
  message: string;
};

/**
 * Unsubscribes a user from all email communications by adding their contact to Brevo's email blacklist.
 *
 * This function performs the following steps:
 * 1. Verifies that the Brevo API key is available in environment configuration.
 * 2. Validates the provided email address using `EmailSchema`.
 * 3. Calls Brevo's contact update endpoint to set `emailBlacklisted` to `true`.
 * 4. Treats a "contact not found" (`404`) response as a successful unsubscribe outcome.
 *
 * @param email - The email address of the contact to unsubscribe.
 * @returns A promise resolving to an {@link UnsubscribeResult} indicating whether the unsubscribe operation succeeded and a user-facing message.
 *
 * @remarks
 * - If `process.env.BREVO_API_KEY` is missing, the function returns a failure result without calling Brevo.
 * - Invalid email input returns a failure result and does not trigger external API calls.
 * - A missing contact in Brevo is considered effectively unsubscribed and therefore returns success.
 *
 * @throws This function does not rethrow errors from Brevo; unexpected failures are converted into a failure {@link UnsubscribeResult}.
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

  // Make API calls to Brevo to update the contact's subscription status
  const brevoClient = new BrevoClient({ apiKey });

  // Add contact to email blacklist to unsubscribe from all emails, including newsletter
  try {
    await brevoClient.contacts.updateContact({
      identifier: validatedEmail.data,
      emailBlacklisted: true,
    });

    return {
      success: true,
      message: "Successfully unsubscribed from emails from Graced and Golden.",
    };
  } catch (error) {
    if (isBrevoError(error) && error.statusCode === 404) {
      // If contact not found in Brevo, treat as success for unsubscribe action since the contact is effectively unsubscribed
      return {
        success: true,
        message: "No contact found with provided email.",
      };
    }
    console.error("Unexpected error during unsubscribe:", error);
    return {
      success: false,
      message: "Failed to unsubscribe. Please try again later or contact support.",
    };
  }
}
