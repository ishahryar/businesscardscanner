import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { OcrModule } from "./ocr/ocr.module";
import { DraftsModule } from "./drafts/drafts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? "127.0.0.1",
        port: Number(process.env.REDIS_PORT ?? 6379)
      }
    }),
    PrismaModule,
    HealthModule,
    OcrModule,
    DraftsModule
  ]
})
export class AppModule {}
