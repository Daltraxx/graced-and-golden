"use server";

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import {
  InquiryFormSchema,
  InquiryState,
} from "@/app/lib/schema/InquiryFormSchema";
import generateEmailHtml from "@/app/lib/utils/generateEmailHtml";

/**
 * Sends an inquiry email using the Mailgun API.
 *
 * This server action validates form data against the InquiryFormSchema,
 * generates an HTML email template, and sends it to the configured recipient.
 *
 * @param prevState - The previous state of the inquiry form (unused in this implementation)
 * @param formData - The form data containing inquiry details (name, email, message, etc.)
 *
 * @returns A promise that resolves to an InquiryState object containing:
 *   - `success`: boolean indicating whether the email was sent successfully
 *   - `message`: a user-friendly message describing the result
 *   - `errors`: (optional) field-level validation errors if validation fails
 *
 * @throws Does not throw errors directly; all errors are caught and returned as InquiryState
 *
 * @example
 * ```typescript
 * const result = await sendInquiryEmail(prevState, formData);
 * if (result.success) {
 *   console.log("Email sent:", result.message);
 * } else {
 *   console.error("Failed:", result.message);
 * }
 * ```
 *
 * @remarks
 * - Requires MAILGUN_API_KEY environment variable to be set
 * - Validates all form fields before attempting to send
 * - Returns specific error messages for authentication and timeout failures
 * - Emails are sent from postmaster@gracedandgolden.com to Grace Burgess
 */
export async function sendInquiryEmail(
  prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = InquiryFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message:
        "Fields are not correctly filled. Please fill all required fields and resolve errors before submitting.",
    };
  }

  const html = generateEmailHtml(validatedFields.data);

  try {
    const data = await mg.messages.create("gracedandgolden.com", {
      from: "G&G Inquiries <postmaster@gracedandgolden.com>",
      to: ["Grace Burgess <hello@gracedandgolden.com>"],
      subject: `Inquiry from ${validatedFields.data.name}`,
      text: "Graced and Golden Inquiry",
      html,
    });

    console.log(data); // logs response data
    return {
      message:
        "Inquiry submitted successfully! We will get back to you as soon as possible.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);

    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        return {
          message:
            "Email service authentication failed. Please contact support.",
          success: false,
        };
      }
      if (error.message.includes("timeout")) {
        return {
          message: "Request timed out. Please try again.",
          success: false,
        };
      }
    }

    return {
      message: "Submission failed. Please try again later.",
      success: false,
    };
  }
}
