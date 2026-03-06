import { BrevoClient } from "@getbrevo/brevo";

export default async function sendFirstTimeSubscriberEmail(email: string, emailerClient: BrevoClient) {
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
    }
  } catch (error) {
    console.error("Failed to send subscription confirmation email:", error);
    return {
      message: "Failed to send subscription confirmation email.",
      success: false,
    }
  }
}