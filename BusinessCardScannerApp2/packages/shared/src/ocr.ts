import { z } from "zod";
import { ContactSchema } from "./contact";

export const OcrFallbackRequestSchema = z.object({
  imageUrl: z.string().url()
});

export const OcrConfidenceSchema = z.record(z.number().min(0).max(1));

export const OcrFallbackResponseSchema = z.object({
  contact: ContactSchema,
  confidence: OcrConfidenceSchema
});

export type OcrFallbackRequest = z.infer<typeof OcrFallbackRequestSchema>;
export type OcrFallbackResponse = z.infer<typeof OcrFallbackResponseSchema>;
