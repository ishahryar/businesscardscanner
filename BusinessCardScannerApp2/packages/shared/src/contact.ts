import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(3).optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  website: z.string().url().optional(),
  notes: z.string().optional()
});

export type Contact = z.infer<typeof ContactSchema>;
