/**
 * Represents the response from a helper function that interacts with the Brevo API.
 * @typedef {Object} BrevoActionResponse
 * @property {boolean} success - Indicates whether the action was completed successfully.
 * @property {string} message - A descriptive message about the action result or any error that occurred.
 * @property {number} [code] - Optional HTTP status code or error code associated with the response.
 * @property {unknown} [data] - Optional additional data returned from the Brevo API or related to the action performed.
 */
export type BrevoActionResponse = {
  success: boolean;
  message: string;
  code?: number;
  data?: unknown;
};
