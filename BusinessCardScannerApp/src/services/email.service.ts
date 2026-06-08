import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { config } from '../config/api.config';
import { EmailContent } from '../interfaces/types';

export class EmailService {
    private async getAccessToken() {
        const oauth2Client = new google.auth.OAuth2(
            config.gmail.clientId,
            config.gmail.clientSecret,
            'https://developers.google.com/oauthplayground' // Redirect URL
        );

        oauth2Client.setCredentials({
            refresh_token: config.gmail.refreshToken
        });

        return await oauth2Client.getAccessToken();
    }

    async sendEmail(emailContent: EmailContent): Promise<boolean> {
        if (config.mockMode) {
            console.log('\n[MOCK EMAIL SENT]');
            console.log(`To: ${emailContent.recipient}`);
            console.log(`Subject: ${emailContent.subject}`);
            console.log(`Body: ${emailContent.body}`);
            console.log('-------------------\n');
            return true;
        }

        try {
            const accessToken = await this.getAccessToken();

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: config.gmail.user,
                    clientId: config.gmail.clientId,
                    clientSecret: config.gmail.clientSecret,
                    refreshToken: config.gmail.refreshToken,
                    accessToken: accessToken.token || ''
                }
            });

            await transport.sendMail({
                from: `${config.sender.name} <${config.gmail.user}>`,
                to: emailContent.recipient,
                subject: emailContent.subject,
                html: emailContent.body
            });

            return true;
        } catch (error: any) {
            console.error('Email sending failed:', error);
            throw new Error(`Email sending failed: ${error.message}`);
        }
    }
}
