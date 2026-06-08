import { Injectable } from "@nestjs/common";
import { OcrFallbackResponse } from "@business-card/shared";

@Injectable()
export class OcrService {
  generateFallback(imageUrl: string): OcrFallbackResponse {
    console.log(`Received OCR fallback request for ${imageUrl}`);

    return {
      contact: {
        firstName: "Taylor",
        lastName: "Nguyen",
        email: "taylor.nguyen@example.com",
        phone: "+1 (555) 011-0111",
        company: "Summit Analytics",
        title: "VP Sales"
      },
      confidence: {
        firstName: 0.94,
        lastName: 0.92,
        email: 0.9,
        phone: 0.88,
        company: 0.86,
        title: 0.84
      }
    };
  }
}
