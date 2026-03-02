"use server";

import { BrevoClient } from "@getbrevo/brevo";
import { NewsletterSubscriptionSchema, NewsletterSubscriptionState } from "../schema/NewsletterSubscriptionSchema";

export async function subscribeToNewsletter(
  prevState: NewsletterSubscriptionState,
  formData: FormData,
): Promise<NewsletterSubscriptionState> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Brevo API key is not properly configured.");
    return {
      message: "Failed to subscribe to the newsletter. Please contact support.",
      success: false,
    };
  }

  const brevoClient = new BrevoClient({ apiKey });

  const rawFormData = Object.fromEntries(formData);
  const validatedFields = NewsletterSubscriptionSchema.safeParse(rawFormData);

  if (!validatedFields.success) { 
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message:
        "Invalid email address. Please enter a valid email to subscribe to the newsletter.",
    };
  }

  // Create Brevo contact and add to newsletter list
  try {
    const data = await brevoClient.contacts.createContact({
      email: validatedFields.data.email,
      listIds: [Number(process.env.BREVO_NEWSLETTER_LIST_ID || "3")],
    });

    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter subscription successful:", data);
    }

    return {
      message: "Successfully subscribed to the newsletter! Thank you for joining.",
      success: true,
    };

  } catch (error) {
    console.error("Failed to subscribe to the newsletter:", error);
    return {
      message: "Failed to subscribe to the newsletter. Please try again later.",
      success: false,
    };
  }
}
