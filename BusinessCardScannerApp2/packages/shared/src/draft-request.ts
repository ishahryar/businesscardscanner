import { z } from "zod";
import { ContactSchema } from "./contact";
import { OfferProfileSchema } from "./offer-profile";

export const DraftRequestSchema = z.object({
  contact: ContactSchema,
  notes: z.string().optional(),
  offerProfile: OfferProfileSchema.optional()
});

export type DraftRequest = z.infer<typeof DraftRequestSchema>;
