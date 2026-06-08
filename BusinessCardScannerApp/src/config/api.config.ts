import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mockMode: process.env.MOCK_MODE === 'true',
    ocrSpace: {
        apiKey: process.env.OCR_SPACE_API_KEY,
        endpoint: 'https://api.ocr.space/parse/image'
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY
    },
    gmail: {
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        user: process.env.GMAIL_USER
    },
    sender: {
        name: process.env.SENDER_NAME,
        title: process.env.SENDER_TITLE,
        company: process.env.SENDER_COMPANY
    },
    port: process.env.PORT || 3000
};
