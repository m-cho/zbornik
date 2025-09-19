import BibleBookPicker from "@/components/BibleBookPicker";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useBible } from "@/hooks/useBible";

export default function BookPickerScreen() {
  const {
    loading,
    bible,
  } = useBible();

  if (loading) {
    return (
      <ThemedContainer>
        <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </ThemedContainer>
    )
  }

  if (!bible) {
    return (
      <ThemedContainer>
        <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ThemedText>Error loading Bible data.</ThemedText>
        </ThemedView>
      </ThemedContainer>
    )
  }

  return (
    <ThemedContainer>
      <BibleBookPicker books={bible.books} />
    </ThemedContainer>
  );
}
