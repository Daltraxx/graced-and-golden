import { BrevoClient } from "@getbrevo/brevo";

type CreateContactOptions = {
  listIds?: number[]; // Optional array of list IDs to add the contact to
};

/**
 * Creates a new contact in Brevo.
 *
 * @param email - The email address of the contact to create.
 * @param brevoClient - The Brevo client instance used to make the API request.
 * @param options - Optional configuration object.
 * @param options.listIds - Optional array of list IDs to add the contact to. Defaults to an empty array.
 * @returns A promise that resolves to an object with `success: true` and `data` containing the created contact object from Brevo on success, or an object with `success: false`, `message`, and `error` properties on failure.
 * @throws Does not throw errors; catches and returns error responses instead. Errors are logged to the console only in development mode.
 *
 * @example
 * ```ts
 * const result = await createContact('user@example.com', brevoClient, { listIds: [1, 2, 3] });
 * if (result.success === false) {
 *   console.error(result.message);
 * } else {
 *   console.log(result.data);
 * }
 * ```
 */
const createContact = async (
  email: string,
  brevoClient: BrevoClient,
  options: CreateContactOptions = {},
) => {
  const { listIds = [] } = options;
  try {
    const result = await brevoClient.contacts.createContact({
      email,
      listIds,
    });

    return { success: true, data: result };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating contact in Brevo:", error);
    }
    return {
      success: false,
      message: "Error creating contact in Brevo.",
      error,
    };
  }
};

export default createContact;
