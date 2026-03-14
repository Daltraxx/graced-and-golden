"use server";

import { BrevoClient } from "@getbrevo/brevo";
import { EmailSchema } from "@/app/lib/schema/EmailSchema";
import { isBrevoError } from "@/app/lib/types/BrevoError";

export type UnsubscribeResult = {
  success: boolean;
  message: string;
};

const DEFAULT_NEWSLETTER_LIST_ID = "3"; // Default Brevo newsletter list ID
const DEFAULT_UNSUBSCRIBED_LIST_ID = "4"; // Default Brevo unsubscribed list ID

export default async function unsubscribeFromNewsletter(
  email: string,
): Promise<UnsubscribeResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Brevo API key is not properly configured.");
    return {
      message:
        "Failed to unsubscribe from the newsletter. Please contact support.",
      success: false,
    };
  }

  // Validate the email address before making API calls
  const validatedEmail = EmailSchema.safeParse(email);
  if (!validatedEmail.success) {
    console.error(
      "Invalid email address:",
      validatedEmail.error.flatten().fieldErrors,
    );
    return {
      success: false,
      message: "Invalid email address.",
    };
  }

  const subscriptionListId = parseInt(
    process.env.BREVO_NEWSLETTER_LIST_ID || DEFAULT_NEWSLETTER_LIST_ID,
    10,
  );
  const unsubscribedListId = parseInt(
    process.env.BREVO_UNSUBSCRIBED_LIST_ID || DEFAULT_UNSUBSCRIBED_LIST_ID,
    10,
  );

  if (isNaN(subscriptionListId) || isNaN(unsubscribedListId)) {
    if (isNaN(subscriptionListId)) {
      console.error("Invalid BREVO_NEWSLETTER_LIST_ID configuration.");
    } else {
      console.error(
        "Invalid BREVO_UNSUBSCRIBED_LIST_ID configuration.",
      );
    }
    return {
      message:
        "Failed to unsubscribe from the newsletter. Please contact support.",
      success: false,
    };
  }

  // Make API calls to Brevo to update the contact's subscription status
  const brevoClient = new BrevoClient({ apiKey });
  try { 
    const contactData = await brevoClient.contacts.getContactInfo({
      identifier: validatedEmail.data,
    });
    if (!contactData?.id) {
      console.error(
        "Contact not found in Brevo when attempting to unsubscribe.",
      );
      return {
        success: false,
        message: "Email address not found in our subscription list.",
      };
    }
    const lists = contactData.listIds || [];
    if (lists.includes(subscriptionListId)) { 
      const updatedLists = lists.filter((id) => id !== subscriptionListId);
      updatedLists.push(unsubscribedListId);
      await brevoClient.contacts.updateContact({
        identifier: validatedEmail.data,
        listIds: updatedLists,
      });
      return {
        success: true,
        message: "Successfully unsubscribed from the newsletter.",
      };
    } else {
      return {
        success: false,
        message: "Email address is not subscribed to the newsletter.",
      };
    }
  } catch (error) {
    console.error("Error occurred while unsubscribing from newsletter:", error);
    if (isBrevoError(error)) {
      if (error.statusCode === 400) { 
        return {
          success: false,
          message: "No contact found with the provided email address.",
        };
      }
    }
    return {
      success: false,
      message: "Failed to unsubscribe from the newsletter. Please contact support.",
    };
  }
}
