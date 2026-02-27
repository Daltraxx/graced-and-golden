import { z } from "zod";

export const AppointmentRequestSchema = z.object({
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