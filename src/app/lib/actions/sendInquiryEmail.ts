"use server";

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import { InquiryFormSchema, InquiryState } from "@/app/lib/schema/InquiryFormSchema";
import generateEmailHtml from "@/app/lib/utils/generateEmailHtml";

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