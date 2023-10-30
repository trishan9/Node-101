import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty")
    .min(3, "Name can't be less than 3 characters"),
  phone: z
    .string()
    .min(1, "Phone Number can't be empty")
    .min(10, "Phone Number can't be less than 10 characters"),
  gmail: z
    .string()
    .min(1, "Email Address can't be empty")
    .email("Email Address Must be Valid"),
});

export default formSchema;
