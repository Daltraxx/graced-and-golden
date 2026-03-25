import { z } from "zod";

export const EmailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .trim()
  .toLowerCase()
  .min(5, "Email must be at least 5 characters long")
  .max(254, "Email must be at most 254 characters long")
  .email({
    message: "Please enter a valid email address.",
  });
