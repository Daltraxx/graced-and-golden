'use server';

import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export type State = {
   errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
   };
   message?: string | null;
}

export async function sendSimpleMessage(prevState: State, formData: FormData): Promise<State> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("sandbox02a0d3203d1b484dadce57177c7dd6ed.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox02a0d3203d1b484dadce57177c7dd6ed.mailgun.org>",
      to: ["Dalton Pettus <daltpettus@gmail.com>"],
      subject: "Hello Dalton Pettus",
      text: "Congratulations Dalton Pettus, you just sent an email with Mailgun! You are truly awesome!",
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

