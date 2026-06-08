import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ScanScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMockScan = async () => {
    setIsProcessing(true);
    // TODO: integrate VisionKit / ML Kit capture, cropping, and OCR pipeline.
    setTimeout(() => {
      setIsProcessing(false);
      router.push({
        pathname: "/confirm",
        params: { contactId: "temp-contact-id" }
      });
    }, 750);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Business Card</Text>
      <Text style={styles.subtitle}>
        Capture the card, highlight fields, and review before saving.
      </Text>
      <Button title={isProcessing ? "Processing…" : "Mock Scan"} onPress={handleMockScan} disabled={isProcessing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#64748b",
    marginBottom: 24
  }
});
