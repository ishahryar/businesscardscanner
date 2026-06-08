import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["log", "error", "warn"] });
  app.setGlobalPrefix("api");

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error("Failed to bootstrap API", error);
  process.exit(1);
});
