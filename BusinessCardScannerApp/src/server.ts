import express, { Request, Response } from 'express';
import { Application } from './app';
import { config } from './config/api.config';
import path from 'path';
import os from 'os';

const expressApp = express();
const scannerApp = new Application();

// Increase JSON payload limit for large base64 image strings
expressApp.use(express.json({ limit: '50mb' }));
expressApp.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static frontend
expressApp.use(express.static(path.join(__dirname, '../public')));

expressApp.post('/api/scan', async (req: Request, res: Response): Promise<void> => {
    try {
        const { imageBase64, recipientEmail } = req.body;

        if (!imageBase64) {
            res.status(400).json({ success: false, error: 'No image provided' });
            return;
        }

        console.log('Received image for scanning via Web UI.');

        // Pass the base64 string to the application
        const result = await scannerApp.processImage(imageBase64, recipientEmail || 'admin@example.com');

        res.json({ success: true, data: result });
    } catch (error: any) {
        console.error('API Error:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

// Function to get local IP address
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        if (!iface) continue;
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

const PORT = Number(config.port) || 3000;
const localIp = getLocalIpAddress();

expressApp.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Web Interface is running!`);
    console.log(`💻 Local access: http://localhost:${PORT}`);
    console.log(`📱 Phone access: http://${localIp}:${PORT}`);
    console.log(`======================================================`);
    console.log(`To test on your phone:`);
    console.log(`1. Ensure your phone and computer are on the SAME WiFi network.`);
    console.log(`2. Open the "Phone access" link above in your phone browser.`);
    console.log(`3. Tap "Scan Business Card" to take a photo.`);
    console.log(`======================================================\n`);
});
