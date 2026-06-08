import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { DraftRequestSchema } from "@business-card/shared";
import { DraftsService } from "./drafts.service";

@Controller("drafts")
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post()
  async createDrafts(@Body() payload: unknown) {
    const result = DraftRequestSchema.safeParse(payload);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    return this.draftsService.createDrafts(result.data);
  }
}
