import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Draft, DraftRequest } from "@business-card/shared";
import { Queue } from "bullmq";

@Injectable()
export class DraftsService {
  constructor(@InjectQueue("drafts") private readonly draftsQueue: Queue) {}

  async createDrafts(request: DraftRequest): Promise<Draft[]> {
    await this.draftsQueue.add(
      "generate-drafts",
      request,
      {
        removeOnComplete: true,
        removeOnFail: true
      }
    );

    return [
      {
        id: "draft-email-1",
        channel: "email",
        subject: `Great meeting you${request.contact.firstName ? `, ${request.contact.firstName}` : ""}!`,
        body: [
          `Hi ${request.contact.firstName ?? "there"},`,
          "",
          "Wonderful connecting with you about revenue automation.",
          "Linking the case study we discussed and happy to schedule a follow-up."
        ].join("\n"),
        rationale: {
          offersUsed: ["Automation Case Study"],
          personalizationPoints: [
            request.notes ? "Used your meeting notes" : "Referenced conversation highlights"
          ]
        }
      },
      {
        id: "draft-sms-1",
        channel: "sms",
        body: `Hi ${request.contact.firstName ?? "there"} — thanks for the chat! Here’s that quick ROI calculator: https://example.com/roi`,
        rationale: {
          offersUsed: ["ROI Calculator"],
          personalizationPoints: ["Short mobile-friendly follow-up"]
        }
      }
    ];
  }
}
