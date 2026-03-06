import { BrevoClient } from "@getbrevo/brevo";


/**
 * Sends a welcome email to a first-time subscriber using the Brevo email service.
 *
 * @param email - The email address of the new subscriber
 * @param emailerClient - The Brevo client instance used to send transactional emails
 * @returns A promise that resolves to an object indicating the success status and an optional message in case of failure
 * @remarks
 * - The email is sent using a predefined transactional email template in Brevo (templateId: 1)
 * - The sender's name and email are set to "Graced and Golden" and "hello@gracedandgolden.com" respectively
 * @throws Does not throw, errors are caught and returned in the response object
 *
 * @example
 * ```typescript
 * const result = await sendFirstTimeSubscriberEmail('user@example.com', brevoClient);
 * if (result.success) {
 *   console.log('Welcome email sent');
 * } else {
 *   console.log(result.message);
 * }
 * ```
 */
export default async function sendFirstTimeSubscriberEmail(
  email: string,
  emailerClient: BrevoClient,
): Promise<{ success: boolean; message?: string }> {
  try {
    await emailerClient.transactionalEmails.sendTransacEmail({
      subject: "Welcome to the Graced and Golden Newsletter!",
      sender: {
        name: "Graced and Golden",
        email: "hello@gracedandgolden.com",
      },
      to: [{ email }],
      templateId: 1,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to send subscription confirmation email:", error);
    return {
      message: "Failed to send subscription confirmation email.",
      success: false,
    };
  }
}
