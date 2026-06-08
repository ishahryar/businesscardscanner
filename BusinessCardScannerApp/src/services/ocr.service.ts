import axios from 'axios';
import { config } from '../config/api.config';
import { OcrResult } from '../interfaces/types';

export class OcrService {
    async extractText(imageUrl: string): Promise<string> {
        if (config.mockMode) {
            console.log('[MOCK] Extracting text from image...');
            return "John Doe\nSoftware Engineer\nAcme Corp\njohn.doe@example.com\n+1-555-0198\nwww.example.com\n123 Tech Lane, Silicon Valley, CA";
        }

        try {
            // If imageUrl is a local path, we might need to handle it differently (upload or base64)
            // For now assuming URL as per original code, but we should support local files too

            const formData = new URLSearchParams();
            formData.append('apikey', config.ocrSpace.apiKey || '');
            formData.append('language', 'eng');
            formData.append('isOverlayRequired', 'false');

            let response;
            if (imageUrl.startsWith('http')) {
                // Fetch the image first to avoid OCR Space URL fetching issues with some URLs
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const base64Image = `data:${imageResponse.headers['content-type'] || 'image/jpeg'};base64,${Buffer.from(imageResponse.data).toString('base64')}`;

                const postData = new URLSearchParams();
                postData.append('apikey', config.ocrSpace.apiKey || '');
                postData.append('language', 'eng');
                postData.append('isOverlayRequired', 'false');
                postData.append('base64Image', base64Image);

                response = await axios.post(config.ocrSpace.endpoint, postData);
            } else if (imageUrl.startsWith('data:image/')) {
                const postData = new URLSearchParams();
                postData.append('apikey', config.ocrSpace.apiKey || '');
                postData.append('language', 'eng');
                postData.append('isOverlayRequired', 'false');
                postData.append('base64Image', imageUrl);

                response = await axios.post(config.ocrSpace.endpoint, postData);
            } else {
                // TODO: Handle local file upload (base64 or file stream)
                // For MVP we can assume we only process URLs or we will implement base64 logic later
                throw new Error("Local file processing not yet implemented in OcrService. Please provide a URL or Base64 string.");
            }


            const result: OcrResult = response.data;

            if (result.ErrorMessage) {
                throw new Error(result.ErrorMessage);
            }

            // OCR Space returns an array of ParsedResults
            const parsedText = (result as any).ParsedResults?.[0]?.ParsedText || '';
            return parsedText;

        } catch (error: any) {
            throw new Error(`OCR processing failed: ${error.message}`);
        }
    }
}
