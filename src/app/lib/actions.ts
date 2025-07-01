'use server';

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import { z } from "zod";
import generateEmailHtml from "./utils/generateEmailHtml";

const FormSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  birthday: z.string(),
  instagram: z.string(),
  occasion: z.string(),
  howFound: z.string(),
  tanHistory: z.string(),
  desiredResults: z.string(),
  questionsConcerns: z.string()
});

export type State = {
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
   message?: string | null;
}

const CreateInquiry = FormSchema;

export async function sendInquiryEmail(prevState: State, formData: FormData): Promise<State> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = CreateInquiry.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create and Send Inquiry.'
    }
  }

  const html = generateEmailHtml(validatedFields.data);
  
  try {
    const data = await mg.messages.create("sandbox02a0d3203d1b484dadce57177c7dd6ed.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox02a0d3203d1b484dadce57177c7dd6ed.mailgun.org>",
      to: ["Dalton Pettus <daltpettus@gmail.com>"],
      subject: `Inquiry from ${validatedFields.data.name}`,
      text: "Graced and Golden Inquiry",
      html
    });

    console.log(data); // logs response data
    return {
      message: 'success'
    };
  } catch (error) {
    console.log(error); //logs any error
    return {
      message: 'failed'
    }
  }
}

