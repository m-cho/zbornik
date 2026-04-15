import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";
import type { Bible } from "@/hooks/useBible";
import useFuzzySearch from "@/hooks/useFuzzySearch";
import { Link } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedSearchInput } from "./ThemedSearchInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type BibleBookPickerProps = {
  books: Bible["books"];
};

export default function BibleBookPicker({ books }: BibleBookPickerProps) {
  const booksWithTranslation = useMemo(
    () =>
      books.map((book) => ({
        translatedName: i18n.t(`books.${book.name}`),
        name: book.name,
        numOfChapters: book.chapters.length,
      })),
    [books],
  );

  const {
    hits: filteredBooks,
    query,
    handleSearchChange,
  } = useFuzzySearch(booksWithTranslation, {
    keys: ["translatedName"],
    threshold: 0.3,
    isCaseSensitive: false,
    shouldSort: true,
  });

  return (
    <ThemedView style={{ flex: 1, flexDirection: "column" }}>
      <ThemedScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingTop: 12 }}
      >
        <ThemedSearchInput
          placeholder={i18n.t("bibleReader.search")}
          style={{ marginBottom: 12 }}
          value={query}
          onChangeText={handleSearchChange}
          lightBackgroundColor={Colors.light.backgroundLight}
          darkBackgroundColor={Colors.dark.backgroundLight}
          lightBorderColor={Colors.light.border}
          darkBorderColor={Colors.dark.border}
          lightTextColor={Colors.light.text}
          darkTextColor={Colors.dark.text}
        />
        <ThemedView
          lightColor={Colors.light.backgroundLight}
          darkColor={Colors.dark.backgroundLight}
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          {filteredBooks.map((b, index) => (
            <ThemedView
              key={b.name}
              lightColor={Colors.light.backgroundLight}
              darkColor={Colors.dark.backgroundLight}
            >
              <Link
                href={`/app/bible/${b.name}`}
                style={{ padding: 14, paddingHorizontal: 18, display: "flex" }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ThemedText
                    style={{ marginRight: 8, flex: 1, userSelect: "none" }}
                  >
                    {i18n.t(`books.${b.name}`)}
                  </ThemedText>
                  <ThemedText
                    lightColor={Colors.light.textSecondary}
                    darkColor={Colors.dark.textSecondary}
                    style={{ fontSize: 12, userSelect: "none" }}
                  >
                    {i18n.t("bibleReader.numberOfChapters", {
                      count: b.numOfChapters,
                    })}
                  </ThemedText>
                </View>
              </Link>
              {index < filteredBooks.length - 1 && (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: Colors.light.border,
                    marginHorizontal: 18,
                    opacity: 0.8,
                  }}
                />
              )}
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedScrollView>
    </ThemedView>
  );
}
