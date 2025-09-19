import i18n from "@/constants/i18n";
import type { Bible } from "@/hooks/useBible";
import useFuzzySearch from "@/hooks/useFuzzySearch";
import { Link } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedSearchInput } from "./ThemedSearchInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type BibleBookPickerProps = {
  books: Bible["books"];
}

export default function BibleBookPicker({ books }: BibleBookPickerProps) {
  const booksWithTranslation = useMemo(() => books.map(book => ({
    translatedName: i18n.t(`books.${book.name}`),
    name: book.name,
    numOfChapters: book.chapters.length,
  })), [books]);

  const { hits: filteredBooks, query, handleSearchChange } = useFuzzySearch(booksWithTranslation, {
    keys: ['translatedName'],
    threshold: 0.3,
    isCaseSensitive: false,
    shouldSort: true,
  });

  return (
    <ThemedView style={{ flex: 1, flexDirection: 'column' }}>
      <ThemedSearchInput placeholder={i18n.t('bibleReader.search')} style={{ margin: 8 }} value={query} onChangeText={handleSearchChange} />
      <ThemedScrollView style={{ flex: 1 }}>
        {filteredBooks.map((b) => (
          <ThemedView key={b.name}>
            <Link href={`/bible/${b.name}`} style={{ padding: 12, display: 'flex' }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <ThemedText style={{ marginRight: 8, flex: 1 }}>{i18n.t(`books.${b.name}`)}</ThemedText>
                <ThemedText style={{ fontSize: 12, color: 'gray' }}>
                  {i18n.t('bibleReader.numberOfChapters', { count: b.numOfChapters })}
                </ThemedText>
              </View>
            </Link>
            <View style={{ height: 1, backgroundColor: '#777', marginVertical: 4, opacity: 0.1 }} />
          </ThemedView>
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
}