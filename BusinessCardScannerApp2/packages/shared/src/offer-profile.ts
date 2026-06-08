import { z } from "zod";

export const OfferProfileSchema = z.object({
  products: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  claimsBlacklist: z.array(z.string()).default([]),
  tone: z.enum(["friendly", "formal", "enthusiastic", "casual"]).default("friendly"),
  regions: z.array(z.string()).default([])
});

export type OfferProfile = z.infer<typeof OfferProfileSchema>;
