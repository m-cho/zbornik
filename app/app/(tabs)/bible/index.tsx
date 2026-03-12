import BibleBookPicker from "@/components/BibleBookPicker";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";

export default function BookPickerScreen() {
  const { loading, bible, retry, errorMsg } = useBible();

  if (loading) {
    return (
      <ThemedContainer>
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>{i18n.t("bibleReader.loading")}</ThemedText>
        </ThemedView>
      </ThemedContainer>
    );
  }

  if (!bible) {
    return (
      <ThemedContainer>
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <ThemedText>{i18n.t("bibleReader.errorLoading")}</ThemedText>
          <PrimaryButton
            title={i18n.t("bibleReader.retry")}
            onPress={() => retry()}
          />
          {errorMsg && (
            <ThemedText
              style={{ fontSize: 12, opacity: 0.6, textAlign: "center" }}
            >
              {errorMsg}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedContainer>
    );
  }

  return (
    <ThemedContainer>
      <BibleBookPicker books={bible.books} />
    </ThemedContainer>
  );
}
