import { BrevoClient } from "@getbrevo/brevo";
import { isBrevoError } from "@/app/lib/types/BrevoError";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

type getBrevoContactDataResponse = BrevoActionResponse & {
  data?: {
    emailBlacklisted: boolean;
    listIds: number[];
    id: number;
  } | null;
};


/**
 * Retrieves contact information from Brevo using the provided email address.
 *
 * @param email - The email address of the contact to retrieve.
 * @param client - The Brevo client instance used to make the API request.
 *
 * @returns A promise that resolves to an object with the following structure:
 *   - On success: `{ success: true, data: ContactInfo }`
 *   - On 404 error: `{ success: false, message: "Contact not found in Brevo.", data: null, code: 404 }`
 *   - On other errors: `{ success: false, message: "Error checking existing contact in Brevo.", data: null, code: number }`
 *
 * @throws Does not throw; errors are caught and returned in the response object.
 *
 * @example
 * const result = await getBrevoContactData('user@example.com', brevoClient);
 * if (result.success) {
 *   console.log('Contact found:', result.data);
 * } else {
 *   console.log('Error:', result.message);
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
