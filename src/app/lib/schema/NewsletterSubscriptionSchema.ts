import { z } from "zod";
import { EmailSchema } from "./EmailSchema";

export const NewsletterSubscriptionSchema = z.object({
  email: EmailSchema,
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
