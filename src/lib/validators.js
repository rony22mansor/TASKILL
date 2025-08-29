import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),

    task_capacity: z.coerce
      .number()
      .min(0, { message: "Task capacity cannot be negative." }),
    available_hours: z.coerce
      .number()
      .min(0, { message: "Available hours cannot be negative." }),

    phone_number: z.string().regex(/^09\d{8}$/, {
      message: "Please enter a valid 10-digit phone number starting with 09.",
    }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." }),

    birth_date: z
      .date({ required_error: "Please select a birth date." })
      .max(new Date(), { message: "Birth date cannot be in the future." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const taskDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Task description must be at least 10 characters long.",
    })
    .max(500, { message: "Description cannot exceed 500 characters." }),
});
