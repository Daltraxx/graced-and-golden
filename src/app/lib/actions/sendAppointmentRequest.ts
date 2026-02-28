"use server";

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import generateApptRequestEmailHtml from "../generateApptRequestEmailHtml";
import {
  AppointmentRequestSchema,
  AppointmentRequestState,
} from "@/app/lib/schema/AppointmentRequestSchema";

/**
 * Processes an appointment request form submission, validates input fields, and sends an email
 * notification via Mailgun when validation succeeds.
 *
 * The function:
 * - Parses raw `FormData` into a plain object.
 * - Validates the payload against `AppointmentRequestSchema`.
 * - Returns field-level validation errors when invalid.
 * - Sends an appointment request email using Mailgun when valid.
 * - Returns a success/failure state consumable by UI form handlers.
 *
 * @param prevState - The previous appointment request state from the form action pipeline.
 *   This value is accepted for action signature compatibility and is not directly used in processing.
 * @param formData - The submitted form payload containing appointment request fields.
 * @returns A promise resolving to an {@link AppointmentRequestState} indicating:
 * - `success: true` with a confirmation message when email delivery is attempted successfully.
 * - `success: false` with validation `errors` when schema validation fails.
 * - `success: false` with a fallback message when email sending fails unexpectedly.
 *
 * @remarks
 * Requires `MAILGUN_API_KEY` in environment configuration for authenticated Mailgun requests.
 * Falls back to a placeholder key when unset, which will cause delivery failures in production.
 *
 * @throws This function does not rethrow operational errors; failures are caught and translated
 * into a failure state response.
 */
export async function sendAppointmentRequest(
  prevState: AppointmentRequestState,
  formData: FormData,
): Promise<AppointmentRequestState> {
  const apiKey = process.env.MAILGUN_API_KEY;
  if (!apiKey) {
    console.error("Mailgun API key is not properly configured.");
    return {
      message: "Please contact support.",
      success: false,
    };
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
  });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = AppointmentRequestSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
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
