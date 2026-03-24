import { BrevoClient } from "@getbrevo/brevo";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

/**
 * Removes a contact from the email blacklist in Brevo.
 *
 * @param email - The email address of the contact to unblacklist. Email is expected to already be validated in the calling function.
 * @param brevoClient - The Brevo client instance used to communicate with the Brevo API.
 * @returns A promise that resolves to an object containing:
 *   - `success`: A boolean indicating whether the operation succeeded.
 *   - `message`: An optional error message if the operation failed.
 *
 * @example
 * const result = await unblacklistContact('user@example.com', brevoClient);
 * if (result.success) {
 *   console.log('Contact unblacklisted successfully');
 * } else {
 *   console.error('Failed to unblacklist contact:', result.message);
 * }
 */
const unblacklistContact = async (email: string, brevoClient: BrevoClient): Promise<BrevoActionResponse> => {
  try {
    await brevoClient.contacts.updateContact({
      identifier: email,
      emailBlacklisted: false,
    });
    return {
      success: true,
      message: "Contact removed from blacklist successfully.",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error removing contact from blacklist in Brevo:", error);
    }
    return {
      success: false,
      message: "Error removing contact from blacklist.",
    };
  }
};

export default unblacklistContact;
