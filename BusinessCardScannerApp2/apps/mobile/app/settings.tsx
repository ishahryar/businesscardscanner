import { useState } from "react";
import { ScrollView, View, Text, Switch, Button, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const [syncGoogleContacts, setSyncGoogleContacts] = useState(true);
  const [syncGoogleDrive, setSyncGoogleDrive] = useState(false);
  const [exportCSV, setExportCSV] = useState(false);

  const handleSave = () => {
    // TODO: persist sync preferences in secure storage and backend.
    console.log("Saving settings", { syncGoogleContacts, syncGoogleDrive, exportCSV });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Destinations</Text>
      <SettingRow
        label="Google Contacts"
        value={syncGoogleContacts}
        onValueChange={setSyncGoogleContacts}
      />
      <SettingRow label="Google Drive" value={syncGoogleDrive} onValueChange={setSyncGoogleDrive} />
      <SettingRow label="CSV Export" value={exportCSV} onValueChange={setExportCSV} />
      <Button title="Save Settings" onPress={handleSave} />
    </ScrollView>
  );
}

type SettingRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingRow({ label, value, onValueChange }: SettingRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20
  },
  title: {
    fontSize: 22,
    fontWeight: "600"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0"
  },
  label: {
    fontSize: 16
  }
});
