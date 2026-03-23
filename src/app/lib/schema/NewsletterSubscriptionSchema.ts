import { z } from "zod";
import { EmailSchema } from "./EmailSchema";

export const NewsletterSubscriptionSchema = z.object({
  email: EmailSchema,
  surname: z.string().optional(), // Honeypot field to prevent spam bots
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
