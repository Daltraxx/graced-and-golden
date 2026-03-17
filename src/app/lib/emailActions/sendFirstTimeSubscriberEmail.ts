import { BrevoClient } from "@getbrevo/brevo";
import { BrevoActionResponse } from "@/app/lib/types/BrevoActionResponse";

const FIRST_TIME_SUBSCRIBER_EMAIL_TEMPLATE_ID = Number(
  process.env.BREVO_FIRST_TIME_SUBSCRIBER_TEMPLATE_ID ?? "1"
);

const DEFAULT_SENDER = {
  name: process.env.BREVO_SENDER_NAME ?? "Graced and Golden",
  email: process.env.BREVO_SENDER_EMAIL ?? "hello@gracedandgolden.com",
};

/**
 * Sends a welcome email to a first-time subscriber using the Brevo email service.
 *
 * @param email - The email address of the new subscriber
 * @param emailerClient - The Brevo client instance used to send transactional emails
 * @returns A promise that resolves to an object indicating the success status and an optional message in case of failure
 * @remarks
 * - The email is sent using a predefined transactional email template in Brevo (templateId: FIRST_TIME_SUBSCRIBER_EMAIL_TEMPLATE_ID)
 * - The sender's name and email are set to DEFAULT_SENDER.name and DEFAULT_SENDER.email respectively
 * - Trusts that the provided email address has already been validated and does not perform additional validation
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
): Promise<BrevoActionResponse> {
  try {
    await emailerClient.transactionalEmails.sendTransacEmail({
      subject: "Welcome to the Graced and Golden Newsletter!",
      sender: DEFAULT_SENDER,
      to: [{ email }],
      templateId: FIRST_TIME_SUBSCRIBER_EMAIL_TEMPLATE_ID,
      params: {
        email,
      },
    });
    return {
      success: true,
      message: "Welcome email sent successfully.",
    };
  } catch (error) {
    console.error("Failed to send first-time subscriber email:", error);
    return {
      message: "Failed to send subscription confirmation email.",
      success: false,
    };
  }
}
