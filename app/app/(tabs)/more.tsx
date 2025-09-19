import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function MoreScreen() {
  return (
    <ThemedScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText type="title">More Screen</ThemedText>
    </ThemedScrollView>
  )
} 