import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#f8fafc" }
      }}
    >
      <Stack.Screen name="scan" options={{ headerTitle: "Scan Card" }} />
      <Stack.Screen name="confirm" options={{ headerTitle: "Confirm Contact" }} />
      <Stack.Screen name="profile" options={{ headerTitle: "Offer Profile" }} />
      <Stack.Screen name="drafts" options={{ headerTitle: "Drafts" }} />
      <Stack.Screen name="settings" options={{ headerTitle: "Settings" }} />
    </Stack>
  );
}
