import { z } from "zod";

export const NewsletterSubscriptionSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
});

export type NewsletterSubscriptionState = {
  errors?: {
    message?: string[];
  };
  success: boolean;
  message: string | null;
};
