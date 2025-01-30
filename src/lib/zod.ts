import { object, string } from "zod";
import { z } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required." })
    .min(1, "Email is required.")
    .email("Invalid email."),
  password: string({ required_error: "Password is required." })
    .min(1, "Password is required.")
    .min(8, "Password must be more than 8 characters.")
    .max(32, "Password must be less than 32 characters."),
});

export const signUpSchema = object({
  firstName: string({ required_error: "Name is required." })
    .min(1, "Name is required.")
    .max(50, "Name must be less than 50 characters."),

  lastName: string({ required_error: "Name is required." })
    .min(1, "Name is required.")
    .max(50, "Name must be less than 50 characters."),

  email: string({ required_error: "Email is required." })
    .min(1, "Email is required.")
    .email("Invalid email."),

  password: string({ required_error: "Password is required." })
    .min(8, "Password must be more than 8 characters.")
    .max(32, "Password must be less than 32 characters."),

  confirmPassword: string({ required_error: "Please confirm your password." })
    .min(8, "Password must be more than 8 characters.")
    .max(32, "Password must be less than 32 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const createOrganisationSchema = z.object({
  organisationName: z
    .string({ required_error: "Organisation name is required." })
    .min(1, "Organisation name is required.")
    .max(100, "Name must be less than 100 characters."),
  country: z.string().min(2, "Country is required."),
  street1: z.string().min(1, "Street address is required."),
  street2: z.string().optional(),
  floor: z.string().optional(),
  unit: z.string().optional(),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 4 characters.")
    .max(10, "Postal code must be less than 10 characters."),
});
