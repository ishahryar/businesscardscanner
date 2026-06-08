import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { Contact, Draft } from "@business-card/shared";

const editableFields: Array<keyof Contact> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "title",
  "company"
];

export default function ConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [contact, setContact] = useState<Contact>({});
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof Contact, value: string) => {
    setContact((prev) => {
      const trimmed = value.trim();
      const nextValue = trimmed === "" ? undefined : value;
      const next: Contact = { ...prev };
      if (nextValue === undefined) {
        delete next[key];
      } else {
        next[key] = nextValue;
      }
      return next;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: persist contact locally and sync with backend.
    const draft: Draft = {
      channel: "email",
      subject: "Thanks for connecting!",
      body: "Hi there — thanks for the great conversation.",
      rationale: { offersUsed: [], personalizationPoints: [] }
    };
    console.log("Mock draft generated", draft);
    setTimeout(() => {
      setIsSaving(false);
      router.push({ pathname: "/drafts", params: { contactId: params.contactId } });
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Contact Details</Text>
      {editableFields.map((field) => (
        <View key={field} style={styles.field}>
          <Text style={styles.label}>{field}</Text>
          <TextInput
            style={styles.input}
            value={(contact[field] as string) ?? ""}
            onChangeText={(text) => handleChange(field, text)}
            placeholder={`Enter ${field}`}
            autoCapitalize="none"
          />
        </View>
      ))}
      <View style={styles.field}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notes]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add meeting notes"
          multiline
        />
      </View>
      <Button title={isSaving ? "Saving…" : "Save & Generate Drafts"} onPress={handleSave} disabled={isSaving} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "600"
  },
  field: {
    gap: 6
  },
  label: {
    fontSize: 14,
    textTransform: "capitalize",
    color: "#475569"
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5f5",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff"
  },
  notes: {
    minHeight: 120,
    textAlignVertical: "top"
  }
});
