import { BrevoClient } from "@getbrevo/brevo";
import { isBrevoError } from "@/app/lib/types/BrevoError";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

type getBrevoContactDataResponse = BrevoActionResponse & {
  data: {
    emailBlacklisted: boolean;
    listIds: number[];
    id: number;
  } | null;
};


/**
 * Retrieves contact data from Brevo for a given email address.
 * 
 * @param {string} email - The email address of the contact to retrieve.
 * @param {BrevoClient} client - The Brevo API client instance.
 * @returns {Promise<getBrevoContactDataResponse>} A promise that resolves to a response object containing:
 *   - `success`: Boolean indicating if the operation was successful.
 *   - `message`: Descriptive message about the operation result.
 *   - `data`: Object containing `emailBlacklisted`, `listIds`, and `id` if successful, or `null` if failed.
 *   - `code`: HTTP status code (200 for success, 404 if contact not found, 500 or specific Brevo error code on failure).
 * 
 * @throws Does not throw; errors are caught and returned in the response object.
 * 
 * @example
 * const response = await getBrevoContactData('user@example.com', brevoClient);
 * if (response.success) {
 *   console.log(response.data.id);
 * }
 */
const getBrevoContactData = async (
  email: string,
  client: BrevoClient,
): Promise<getBrevoContactDataResponse> => {
  try {
    const data = await client.contacts.getContactInfo({
      identifier: email,
    });
    const { emailBlacklisted, listIds, id } = data;
    return {
      success: true,
      message: "Contact data retrieved successfully.",
      data: { emailBlacklisted, listIds, id },
      code: 200,
    };
  } catch (error) {
    if (isBrevoError(error) && error.statusCode === 404) {
      if (process.env.NODE_ENV === "development") {
        console.log("Contact not found in Brevo.");
      }
      return {
        success: false,
        message: "Contact not found in Brevo.",
        data: null,
        code: 404,
      };
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("Error checking existing contact in Brevo:", error);
      }
      return {
        success: false,
        message: "Error checking existing contact in Brevo.",
        data: null,
        code: isBrevoError(error) && error.statusCode ? error.statusCode : 500,
      };
    }
  }
};

export default getBrevoContactData;
