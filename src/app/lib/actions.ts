"use server";

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import generateApptRequestEmailHtml from "./generateApptRequestEmailHtml";
import { AppointmentRequestSchema, AppointmentRequestState } from "@/app/lib/schema/AppointmentRequestSchema";

export async function sendAppointmentRequest(
  prevState: AppointmentRequestState,
  formData: FormData
): Promise<AppointmentRequestState> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = AppointmentRequestSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message:
        "Form not correctly filled. Please resolve errors before submitting.",
    };
  }

  try {
    const data = await mg.messages.create("gracedandgolden.com", {
      from: "G&G Appointment Requests <postmaster@gracedandgolden.com>",
      to: ["Grace Burgess <hello@gracedandgolden.com>"],
      subject: `Appointment Request`,
      text: "Graced and Golden Appointment Request",
      html: generateApptRequestEmailHtml(validatedFields.data.message),
    });
    console.log(data); // logs response data
    return {
      message:
        "Appointment request submitted successfully! We will get back to you as soon as possible.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to send appointment request:", error);
    return {
      message: "Submission failed. Please try again later.",
      success: false,
    };
  }
}
