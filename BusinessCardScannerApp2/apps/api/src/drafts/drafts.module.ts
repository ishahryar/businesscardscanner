import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { DraftsController } from "./drafts.controller";
import { DraftsService } from "./drafts.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "drafts"
    })
  ],
  controllers: [DraftsController],
  providers: [DraftsService]
})
export class DraftsModule {}
