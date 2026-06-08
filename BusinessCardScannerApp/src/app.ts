import { OcrService } from './services/ocr.service';
import { OpenAiService } from './services/openai.service';
import { EmailService } from './services/email.service';
import { ProcessedResult, EmailContent } from './interfaces/types';

export class Application {
    private ocrService: OcrService;
    private openAiService: OpenAiService;
    private emailService: EmailService;

    constructor() {
        this.ocrService = new OcrService();
        this.openAiService = new OpenAiService();
        this.emailService = new EmailService();
    }

    async processImage(imageUrl: string, recipientEmailForNotification: string): Promise<ProcessedResult> {
        try {
            // 1. Extract text from image
            console.log(`Extracting text from ${imageUrl}...`);
            const extractedText = await this.ocrService.extractText(imageUrl);

            // 2. Parse details & Research Application
            console.log('Analyzing contact details and researching industry...');
            const processedResult = await this.openAiService.enhanceText(extractedText);

            // 3. Generate tailored email content
            if (processedResult.contactDetails) {
                const emailDraft = await this.openAiService.generateSalesEmail(
                    processedResult.contactDetails,
                    processedResult.contactDetails.industry || 'Unknown'
                );

                processedResult.emailContent = {
                    recipient: processedResult.contactDetails.email, // The contact's email
                    subject: emailDraft.subject,
                    body: emailDraft.body
                };
            }

            // 4. Send notification email to the user (optional, or send the sales email?)
            // The original requirement (Rule #6) says "Use the emails to send emails". 
            // Usually this means sending TO the contact.
            // But the original code sent a report to "recipient".
            // We will do both: create the object for sending, and return it.

            return processedResult;

        } catch (error) {
            console.error('Application error:', error);
            throw error;
        }
    }

    async sendEmail(emailContent: EmailContent): Promise<boolean> {
        return await this.emailService.sendEmail(emailContent);
    }
}
