"use server";

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import { z } from "zod";
import generateEmailHtml from "./utils/generateEmailHtml";
import generateApptRequestEmailHtml from "./generateApptRequestEmailHtml";

// INQUIRY FORM
const InquiryFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, {
      message: "Name must be at least 4 characters long",
    })
    .max(50, {
      message: "Name must be at most 50 characters long",
    })
    .regex(/^$|[A-Za-z]+(['-][A-Za-z]+)*(\s+[A-Za-z]+(['-][A-Za-z]+)*)+$/, {
      message: "Name can only contain letters, hyphens, and apostrophes.",
    }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      {
        message: "Please enter a valid phone number.",
      }
    )
    .min(10, {
      message: "Phone number must be at least 10 digits long",
    })
    .max(15, {
      message: "Phone number must be at most 15 digits long",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  birthday: z
    .string({
      required_error: "Birthday is required",
      invalid_type_error: "Birthday must be a string",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Please enter a valid date.",
    }),
  instagram: z
    .string({
      required_error: "Instagram handle is required",
      invalid_type_error: "Instagram handle must be a string",
    })
    .min(1, {
      message: "Instagram handle must be at least 1 character long",
    })
    .max(30, {
      message: "Instagram handle must be at most 30 characters long",
    })
    .regex(/^$|[a-z](?!.*\.\.)(?!.*\.$)[a-z0-9_.]+$/i, {
      message:
        "Instagram handle can only contain letters, numbers, underscores, and periods. It must start with a letter and cannot end with a period or contain consecutive periods.",
    }),
  occasion: z
    .string({
      required_error: "Occasion is required",
      invalid_type_error: "Occasion must be a string",
    })
    .min(2, {
      message: "Occasion must be at least 2 characters long",
    })
    .max(300, {
      message: "Occasion must be at most 300 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/, {
      message:
        "Occasion can only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    }),
  howFound: z
    .string({
      required_error: "How you found us is required",
      invalid_type_error: "How you found us must be a string",
    })
    .min(2, {
      message: "How you found us must be at least 2 characters long",
    })
    .max(300, {
      message: "How you found us must be at most 300 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/, {
      message:
        "How you found us can only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    }),
  tanHistory: z
    .string({
      required_error: "Tanning history is required",
      invalid_type_error: "Tanning history must be a string",
    })
    .min(2, {
      message: "Tanning history must be at least 2 characters long",
    })
    .max(300, {
      message: "Tanning history must be at most 300 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/, {
      message:
        "Tanning history can only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    }),
  desiredResults: z
    .string({
      required_error: "Desired results are required",
      invalid_type_error: "Desired results must be a string",
    })
    .min(2, {
      message: "Desired results must be at least 2 characters long",
    })
    .max(300, {
      message: "Desired results must be at most 300 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/, {
      message:
        "Desired results can only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    }),
  questionsConcerns: z
    .string({
      invalid_type_error: "Questions or concerns must be a string",
    })
    .max(300, {
      message: "Questions or concerns must be at most 300 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]*$/, {
      message:
        "Questions or concerns can only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    })
    .optional(),
});

export type InquiryState = {
  errors?: {
    name?: string[];
    phoneNumber?: string[];
    email?: string[];
    birthday?: string[];
    instagram?: string[];
    occasion?: string[];
    howFound?: string[];
    tanHistory?: string[];
    desiredResults?: string[];
    questionsConcerns?: string[];
  };
  success: boolean;
  message: string | null;
};

const CreateInquiry = InquiryFormSchema;

export async function sendInquiryEmail(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = CreateInquiry.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors
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
      const anyErr = error as any;
      const msg = String(error.message || "").toLowerCase();
      if (
        (typeof anyErr.status === "number" && anyErr.status === 401) ||
        msg.includes("401") ||
        msg.includes("unauthorized")
      ) {
        return {
          message:
            "Email service authentication failed. Please contact support.",
          success: false,
        };
      }
      if (msg.includes("timeout")) {
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

// APPOINTMENT REQUEST FORM
const AppointmentRequestSchema = z.object({
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .min(10, {
      message: "Message must be at least 10 characters long",
    })
    .max(500, {
      message: "Message must be at most 500 characters long",
    })
    .regex(/^[a-zA-Z0-9.,'"?:()_@#!&$\-\/ \n\r]+$/, {
      message:
        "Message may only contain letters, numbers, spaces, and the following special characters: . _ @ # ! & $ - /",
    }),
});

export type AppointmentRequestState = {
  errors?: {
    message?: string[];
  };
  success: boolean;
  message: string | null;
};

const CreateAppointmentRequest = AppointmentRequestSchema;

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
  const validatedFields = CreateAppointmentRequest.safeParse(rawFormData);

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
