import axios from 'axios';
import { config } from '../config/api.config';
import { ProcessedResult, ContactDetails } from '../interfaces/types';

export class OpenAiService {
    private async callGpt(prompt: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // Or 'gpt-4' if available
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3
                },
                {
                    headers: {
                        'Authorization': `Bearer ${config.openai.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error: any) {
            console.error('OpenAI API call failed:', error);
            throw new Error(`OpenAI processing failed: ${error.message}`);
        }
    }

    async parseContactDetails(ocrText: string): Promise<ContactDetails> {
        if (config.mockMode) {
            console.log('[MOCK] Parsing contact details...');
            return {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1-555-0198",
                company: "Acme Corp",
                title: "Software Engineer",
                website: "www.example.com",
                address: "123 Tech Lane, Silicon Valley, CA"
            };
        }
        const prompt = `
      Please parse the following text from a business card and return a JSON object ONLY.
      Do not include any other text or markdown formatting (like \`\`\`json).
      
      Structure:
      {
        "name": "Full Name",
        "email": "Email Address",
        "phone": "Phone Number (normalized)",
        "company": "Company Name",
        "title": "Job Title",
        "website": "Website URL",
        "address": "Full Address"
      }

      Text:
      ${ocrText}
      `;

        const jsonStr = await this.callGpt(prompt);
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("Failed to parse OpenAI JSON response", jsonStr);
            throw new Error("Failed to parse extracted contact details");
        }
    }

    async researchIndustry(companyName: string): Promise<string> {
        if (config.mockMode) {
            console.log(`[MOCK] Researching industry for ${companyName}...`);
            return "Software Development";
        }
        if (!companyName) return "General Business";
        const prompt = `What industry and sector does the company "${companyName}" belong to? Provide a brief 1-sentence answer.`;
        return await this.callGpt(prompt);
    }

    async enhanceText(originalText: string, recipient: string = 'User'): Promise<ProcessedResult> {
        const contactDetails = await this.parseContactDetails(originalText);
        const industry = await this.researchIndustry(contactDetails.company);
        contactDetails.industry = industry;

        // We can also generate an email draft here inside the object if needed, 
        // or keep the basic structure for now.

        return {
            originalText,
            enhancedText: JSON.stringify(contactDetails, null, 2), // Representation of the data
            contactDetails
        };
    }

    async generateSalesEmail(contact: ContactDetails, industry: string): Promise<{ subject: string, body: string }> {
        if (config.mockMode) {
            console.log(`[MOCK] Generating sales email for ${contact.name}...`);
            return {
                subject: `Enhancing ${contact.company}'s Sales Process`,
                body: `<p>Hi ${contact.name},</p><p>We have a great solution for the ${industry} industry!</p>`
            };
        }
        const prompt = `
      Write a professional sales email to ${contact.name}, who is the ${contact.title} at ${contact.company}.
      The company is in the ${industry} industry.
      
      Our product is a "Business Card Scanner & CRM Solution" that helps sales teams organize contacts and automate follow-ups.
      
      Tailor the email to their industry.
      Return a JSON object with "subject" and "body" keys.
      Body should be HTML formatted.
      `;

        const jsonStr = await this.callGpt(prompt);
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            // Fallback if JSON parsing fails
            return {
                subject: "Connecting regarding Business Card Scanner",
                body: `<p>Hi ${contact.name},</p><p>I wanted to reach out...</p>`
            };
        }
    }
}
