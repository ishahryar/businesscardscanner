export interface OcrResult {
    ParsedText: string;
    ErrorMessage?: string;
    ErrorDetails?: string;
}

export interface EmailContent {
    subject: string;
    body: string;
    recipient: string;
}

export interface ProcessedResult {
    originalText: string;
    enhancedText: string;
    emailContent?: EmailContent;
    contactDetails?: ContactDetails;
}

export interface ContactDetails {
    id?: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    title: string;
    website: string;
    address: string;
    industry?: string;
    notes?: string;
    createdAt?: string;
}
