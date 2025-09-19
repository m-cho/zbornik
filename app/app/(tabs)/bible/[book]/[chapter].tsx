import { BibleReader } from "@/components/BibleReader";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ChapterReaderScreen() {
  const { book, chapter } = useLocalSearchParams();
  const { bible, bibleId } = useBible();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `${i18n.t(`books.${book}`)}: ${chapter}` });
  }, [navigation, book, chapter]);

  if (!bible) return <ThemedText>Loading Bible...</ThemedText>;
  if (!book) return <ThemedText>No book selected.</ThemedText>;
  if (!chapter) return <ThemedText>No chapter selected.</ThemedText>;

  const selectedBook = bible.books.find(b => b.name === book);
  if (!selectedBook) return <ThemedText>Book not found: {String(book)}</ThemedText>;

  const chapterNumber = parseInt(chapter as string, 10);
  const selectedChapter = selectedBook.chapters.find(c => c.chapter === chapterNumber);
  if (!selectedChapter) return <ThemedText>Chapter not found: {chapter}</ThemedText>;

  return (
    <ThemedContainer>
      <BibleReader
        book={selectedBook.name}
        chapter={selectedChapter.chapter}
        verses={selectedChapter.verses}
        bibleId={bibleId || undefined}
      />
    </ThemedContainer>
  );
}