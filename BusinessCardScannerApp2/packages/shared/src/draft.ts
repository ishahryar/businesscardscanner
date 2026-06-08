import { z } from "zod";

export const DraftChannelSchema = z.enum(["email", "whatsapp", "sms"]);

export const DraftRationaleSchema = z.object({
  offersUsed: z.array(z.string()),
  personalizationPoints: z.array(z.string())
});

export const DraftSchema = z.object({
  id: z.string().optional(),
  channel: DraftChannelSchema,
  subject: z.string().optional(),
  body: z.string(),
  rationale: DraftRationaleSchema
});

export type Draft = z.infer<typeof DraftSchema>;
