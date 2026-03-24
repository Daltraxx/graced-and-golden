import { BrevoClient } from "@getbrevo/brevo";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

const DEFAULT_NEWSLETTER_LIST_ID = "3"; // Default Brevo newsletter list ID

/**
 * Adds a contact to the newsletter subscription list in Brevo.
 *
 * @param email - The email address of the contact to add to the newsletter.
 * @param brevoClient - The Brevo API client instance used to update the contact.
 * @returns A promise that resolves to an object containing:
 *   - `success` (boolean): Indicates whether the operation was successful.
 *   - `message` (string): A descriptive message about the result of the operation.
 *
 * @remarks
 * - Contact must already exist in Brevo for this function to work, as it uses the updateContact method to add the contact to the newsletter list.
 * - If the BREVO_NEWSLETTER_LIST_ID environment variable is invalid or not configured,
 *   the function returns an error message without attempting to update the contact.
 * - Errors during the API call are caught and logged to the console.
 *
 * @example
 * ```typescript
 * const result = await addContactToNewsletter('user@example.com', brevoClient);
 * if (result.success) {
 *   console.log(result.message); // "Contact added to newsletter list."
 * }
 * ```
 */
const addContactToNewsletter = async (
  email: string,
  brevoClient: BrevoClient,
): Promise<BrevoActionResponse> => {
  const subscriptionListId = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || DEFAULT_NEWSLETTER_LIST_ID,
    10,
  );
  if (isNaN(subscriptionListId)) {
    console.error("Invalid BREVO_NEWSLETTER_LIST_ID configuration.");
    return {
      success: false,
      message:
        "Failed to subscribe to the newsletter due to invalid configuration of BREVO_NEWSLETTER_LIST_ID.",
    };
  }
  try {
    await brevoClient.contacts.updateContact({
      identifier: email,
      listIds: [subscriptionListId],
    });
    return { success: true, message: "Contact added to newsletter list." };
  } catch (error) {
    console.error("Error adding existing contact to newsletter list:", error);
    return {
      success: false,
      message: "Failed to add contact to newsletter list.",
    };
  }
};

export default addContactToNewsletter;
