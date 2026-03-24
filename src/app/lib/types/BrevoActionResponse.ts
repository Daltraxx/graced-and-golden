/**
 * Represents the response from a Brevo action.
 * @property {boolean} success - Indicates whether the Brevo action was successful.
 * @property {string} message - A descriptive message about the action result.
 * @property {number} [code] - Optional status or error code associated with the response.
 */
export type BrevoActionResponse = {
  success: boolean;
  message: string;
  code?: number;
};
