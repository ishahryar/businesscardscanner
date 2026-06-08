import { PrismaClient, DraftChannel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ownerId = "demo-owner";

  const contacts = await Promise.all(
    sampleCards.map((card) =>
      prisma.contact.upsert({
        where: { email: card.email ?? `${card.firstName}.${card.lastName}@example.com` },
        update: {},
        create: {
          ownerId,
          firstName: card.firstName,
          lastName: card.lastName,
          email: card.email,
          phone: card.phone,
          title: card.title,
          company: card.company,
          website: card.website,
          address: card.address,
          country: card.country,
          ocrConfidenceJson: card.ocrConfidenceJson,
          notes: {
            create: card.notes.map((body) => ({ body }))
          }
        }
      })
    )
  );

  await prisma.offerProfile.upsert({
    where: { ownerId: `${ownerId}-default` },
    update: {},
    create: {
      id: `${ownerId}-default`,
      ownerId,
      productsJson: { items: ["C4 Outreach Automation", "CRM Pro"] },
      servicesJson: { items: ["White-glove onboarding", "LLM prompt tuning"] },
      claimsBlacklist: "Never promise ROI beyond 3x.",
      tone: "friendly",
      regionsSupported: "North America, EMEA"
    }
  });

  await prisma.offerProfile.upsert({
    where: { ownerId: `${ownerId}-enterprise` },
    update: {},
    create: {
      id: `${ownerId}-enterprise`,
      ownerId,
      productsJson: { items: ["C4 Enterprise Suite", "Analytics Pro"] },
      servicesJson: { items: ["Custom integration", "Team enablement"] },
      claimsBlacklist: "Avoid security commitments without legal approval.",
      tone: "consultative",
      regionsSupported: "Global"
    }
  });

  await Promise.all(
    contacts.map((contact) =>
      prisma.draft.create({
        data: {
          contactId: contact.id,
          channel: DraftChannel.email,
          subject: `Follow-up with ${contact.firstName}`,
          body: `Hi ${contact.firstName}, it was a pleasure meeting you at ${contact.company}.`,
          rationaleJson: {
            offersUsed: ["C4 Outreach Automation"],
            personalizationPoints: [`Noted interest in ${contact.title ?? "new tools"}`]
          }
        }
      })
    )
  );
}

const sampleCards = [
  {
    firstName: "Taylor",
    lastName: "Nguyen",
    email: "taylor.nguyen@example.com",
    phone: "+1-555-0111",
    title: "VP Sales",
    company: "Summit Analytics",
    website: "https://summitanalytics.io",
    address: "123 Market St, San Francisco, CA",
    country: "USA",
    notes: ["Interested in automation case studies"],
    ocrConfidenceJson: { email: 0.94, phone: 0.91 }
  },
  {
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@example.com",
    phone: "+1-555-0199",
    title: "Head of Partnerships",
    company: "Atlas Ventures",
    website: "https://atlasvc.com",
    address: "90 State St, Boston, MA",
    country: "USA",
    notes: ["Requested deck", "Follow up in 2 weeks"],
    ocrConfidenceJson: { email: 0.9 }
  },
  {
    firstName: "Priya",
    lastName: "Kulkarni",
    email: "priya.kulkarni@example.com",
    phone: "+44-20-5555-0101",
    title: "Director of Marketing",
    company: "Brightwave",
    website: "https://brightwave.co.uk",
    address: "221B Baker Street, London",
    country: "UK",
    notes: ["Focus on personalization compliance"],
    ocrConfidenceJson: { phone: 0.88 }
  },
  {
    firstName: "Miguel",
    lastName: "Santos",
    email: "miguel.santos@example.com",
    phone: "+34-91-555-0142",
    title: "Growth Manager",
    company: "Iberia Logistics",
    website: "https://iberialogistics.es",
    address: "Gran Via, Madrid",
    country: "Spain",
    notes: ["Interested in WhatsApp outreach"],
    ocrConfidenceJson: { company: 0.85 }
  },
  {
    firstName: "Ava",
    lastName: "Patel",
    email: "ava.patel@example.com",
    phone: "+61-2-5555-0222",
    title: "Sales Operations Lead",
    company: "Pacific Solar",
    website: "https://pacificsolar.au",
    address: "400 George St, Sydney",
    country: "Australia",
    notes: ["Need API docs for CRM integration"],
    ocrConfidenceJson: { website: 0.9 }
  }
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
