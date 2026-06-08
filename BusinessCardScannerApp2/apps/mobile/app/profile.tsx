import { useState } from "react";
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { OfferProfile } from "@business-card/shared";

type OfferProfileForm = {
  products: string;
  services: string;
  claimsBlacklist: string;
  tone: OfferProfile["tone"];
  regions: string;
};

const defaultProfile: OfferProfileForm = {
  products: "",
  services: "",
  claimsBlacklist: "",
  tone: "friendly",
  regions: ""
};

const toneOptions: OfferProfile["tone"][] = ["friendly", "formal", "enthusiastic", "casual"];

function sanitiseTone(value: string): OfferProfile["tone"] {
  return toneOptions.includes(value as OfferProfile["tone"]) ? (value as OfferProfile["tone"]) : "friendly";
}

function parseList(raw: string) {
  return raw
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<OfferProfileForm>(defaultProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof OfferProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload: OfferProfile = {
      products: parseList(profile.products),
      services: parseList(profile.services),
      claimsBlacklist: parseList(profile.claimsBlacklist),
      tone: sanitiseTone(profile.tone),
      regions: parseList(profile.regions)
    };
    console.log("Saving offer profile", payload);
    // TODO: persist profile preferences locally and sync to backend.
    setTimeout(() => setIsSaving(false), 400);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Offer Profile</Text>
      <Text style={styles.subtitle}>
        Configure which offerings are highlighted in personalized outreach.
      </Text>
      <ProfileField
        label="Products"
        value={profile.products}
        placeholder="One per line (e.g. Outreach Automation)"
        onChangeText={(text) => handleChange("products", text)}
        multiline
      />
      <ProfileField
        label="Services"
        value={profile.services}
        placeholder="One per line (e.g. White-glove onboarding)"
        onChangeText={(text) => handleChange("services", text)}
        multiline
      />
      <ProfileField
        label="Claims Blacklist"
        value={profile.claimsBlacklist}
        placeholder="Comma or line-separated claims to avoid"
        onChangeText={(text) => handleChange("claimsBlacklist", text)}
        multiline
      />
      <ProfileField
        label="Tone"
        value={profile.tone}
        placeholder={`Choose: ${toneOptions.join(", ")}`}
        onChangeText={(text) => handleChange("tone", sanitiseTone(text))}
      />
      <ProfileField
        label="Regions"
        value={profile.regions}
        placeholder="Comma or line-separated (e.g. North America)"
        onChangeText={(text) => handleChange("regions", text)}
        multiline
      />
      <Button title={isSaving ? "Saving…" : "Save Profile"} onPress={handleSave} disabled={isSaving} />
    </ScrollView>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  multiline?: boolean;
  onChangeText: (value: string) => void;
};

function ProfileField({ label, value, placeholder, multiline, onChangeText }: ProfileFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline ? styles.largeInput : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
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
  subtitle: {
    fontSize: 15,
    color: "#475569"
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
  largeInput: {
    minHeight: 120,
    textAlignVertical: "top"
  }
});
