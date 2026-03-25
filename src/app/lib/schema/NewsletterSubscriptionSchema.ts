import { z } from "zod";
import { EmailSchema } from "./EmailSchema";

export const NewsletterSubscriptionSchema = z.object({
  email: EmailSchema,
  surname: z.string().max(0, "Invalid submission").optional(), // Honeypot field to prevent spam bots, must be empty
});

export type NewsletterSubscriptionState = {
  errors?: {
    email?: string[];
  };
  success: boolean;
  message: string | null;
};

export type NewsletterSubscriptionInput = z.infer<
  typeof NewsletterSubscriptionSchema
>;
