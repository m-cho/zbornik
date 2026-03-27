import BibleBookPicker from "@/components/BibleBookPicker";
import { useNavigationHistory } from "@/components/NavigationHistoryContext";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function BookPickerScreen() {
  const {
    loading,
    bible,
    retry,
    errorMsg,
    lastReaderPosition,
    setLastReaderPosition,
  } = useBible();
  const router = useRouter();
  const [showLastPositionPrompt, setShowLastPositionPrompt] = useState(false);
  const [lastPositionPromptChecked, setLastPositionPromptChecked] =
    useState(false);
  const { lastRoute } = useNavigationHistory();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [hidePromptInitially, setHidePromptInitially] = useState(true);

  useEffect(() => {
    // To prevent flash of prompt
    let timer = setTimeout(() => {
      setHidePromptInitially(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lastRouteParsed = (lastRoute ?? "")
      .split("/")
      .filter((str) => !str.includes("(") && !str.includes(")"))
      .join("/");

    // Show prompt only on first load or if coming from non-/bible route
    let shouldShow = false;
    if (
      bible &&
      lastReaderPosition &&
      !lastPositionPromptChecked &&
      (isFirstLoad ||
        !(lastRouteParsed && lastRouteParsed.startsWith("/bible")))
    ) {
      shouldShow = true;
      setShowLastPositionPrompt(true);
    } else {
      setShowLastPositionPrompt(false);
    }
    setIsFirstLoad(false);

    // Auto-hide after 5 seconds
    let timer: number | undefined;
    if (shouldShow) {
      timer = setTimeout(() => {
        setShowLastPositionPrompt(false);
        setLastPositionPromptChecked(true);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    lastReaderPosition,
    lastPositionPromptChecked,
    bible,
    lastRoute,
    isFirstLoad,
  ]);

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
      {!hidePromptInitially && showLastPositionPrompt && (
        <ThemedView style={styles.promptContainer}>
          <ThemedText style={{ color: "#fff", flex: 1 }}>
            {`${i18n.t("bibleReader.resumeLastPosition")}\n${i18n.t(`books.${lastReaderPosition?.book}`)}:${lastReaderPosition?.chapter}`}
          </ThemedText>
          <PrimaryButton
            title={i18n.t("no")}
            onPress={() => {
              setLastPositionPromptChecked(true);
              setShowLastPositionPrompt(false);
              setLastReaderPosition(null);
            }}
          />
          <PrimaryButton
            title={i18n.t("yes")}
            onPress={() => {
              setLastPositionPromptChecked(true);
              setShowLastPositionPrompt(false);
              router.push(
                `/bible/${lastReaderPosition?.book}/${lastReaderPosition?.chapter}`,
              ); // Navigate to last position
            }}
            style={{ marginLeft: 8 }}
          />
        </ThemedView>
      )}
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  promptContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  promptOptionsBtn: {
    marginLeft: 8,
  },
});
