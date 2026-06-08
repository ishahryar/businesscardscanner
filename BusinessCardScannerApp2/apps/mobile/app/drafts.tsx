import { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Draft } from "@business-card/shared";

const mockDrafts: Draft[] = [
  {
    channel: "email",
    subject: "Great to meet you at the summit",
    body: "Hi Taylor, thanks again for visiting our booth. Here is a quick recap and next steps…",
    rationale: { offersUsed: ["Pro CRM"], personalizationPoints: ["Met at SaaS Summit"] }
  },
  {
    channel: "whatsapp",
    body: "Hi Taylor! Quick link to the ROI calculator we mentioned. Ping me if you want a walkthrough.",
    rationale: { offersUsed: ["ROI Calculator"], personalizationPoints: ["Asked about ROI"] }
  }
];

export default function DraftsScreen() {
  const [drafts] = useState<Draft[]>(mockDrafts);

  const handleSendDraft = (draft: Draft) => {
    console.log("Sending draft", draft);
    // TODO: integrate with API to send via Gmail OAuth or WhatsApp deep link.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated Drafts</Text>
      <FlatList
        data={drafts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.channel}>{item.channel.toUpperCase()}</Text>
            {item.subject ? <Text style={styles.subject}>{item.subject}</Text> : null}
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.meta}>
              Offers: {item.rationale.offersUsed.join(", ") || "—"}
            </Text>
            <Text style={styles.meta}>
              Personalization: {item.rationale.personalizationPoints.join(", ") || "—"}
            </Text>
            <Button title="Send Draft" onPress={() => handleSendDraft(item)} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: "#f8fafc"
  },
  title: {
    fontSize: 22,
    fontWeight: "600"
  },
  list: {
    gap: 16
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8
  },
  channel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1"
  },
  subject: {
    fontSize: 16,
    fontWeight: "600"
  },
  body: {
    fontSize: 14,
    color: "#334155"
  },
  meta: {
    fontSize: 12,
    color: "#64748b"
  }
});
