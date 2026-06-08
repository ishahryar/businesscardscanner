import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { OcrService } from "./ocr.service";
import { OcrFallbackRequestSchema } from "@business-card/shared";

@Controller("ocr")
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post("fallback")
  fallback(@Body() payload: unknown) {
    const result = OcrFallbackRequestSchema.safeParse(payload);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    return this.ocrService.generateFallback(result.data.imageUrl);
  }
}
