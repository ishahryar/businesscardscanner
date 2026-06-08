import { Application } from './app';
import { config } from './config/api.config';

async function main() {
    try {
        const app = new Application();

        // Check if arguments are provided
        const args = process.argv.slice(2);
        if (args.length > 0) {
            const imageUrl = args[0];
            console.log(`Processing image: ${imageUrl}`);
            const result = await app.processImage(imageUrl, 'admin@example.com');
            console.log('Result:', JSON.stringify(result, null, 2));

            if (result.emailContent) {
                console.log('\nStarting email sending... (Mock Mode will intercept this)');
                await app.sendEmail(result.emailContent);
            }
        } else {
            console.log('Usage: npm start <image_url>');
            console.log('Server mode will be implemented in Phase 4');
        }

    } catch (error) {
        console.error('Failed to process:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
