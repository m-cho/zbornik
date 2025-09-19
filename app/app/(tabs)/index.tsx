import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText type="title">Home Screen</ThemedText>
      <ThemedText>Dobrodosli u zbornik</ThemedText>
    </ThemedView>
  );
}