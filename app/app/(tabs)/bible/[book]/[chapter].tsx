import { BibleReader } from "@/components/BibleReader";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { Bibles } from "@/constants/Bibles";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export async function generateStaticParams(): Promise<
  { book: string; chapter: string }[]
> {
  const bible = await fetch(Bibles["church-slavonic"].url).then((res) =>
    res.json(),
  );
  return (
    bible.books as { name: string; chapters: { chapter: number }[] }[]
  ).flatMap((b) =>
    b.chapters.map((c) => ({ book: b.name, chapter: String(c.chapter) })),
  );
}

export default function ChapterReaderScreen() {
  const { book, chapter } = useLocalSearchParams();
  const { bible, bibleId, setLastReaderPosition } = useBible();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `${i18n.t(`books.${book}`)}: ${chapter}` });
    if (book && chapter) {
      setLastReaderPosition({
        book: String(book),
        chapter: parseInt(String(chapter), 10),
      });
    }
  }, [navigation, book, chapter, setLastReaderPosition]);

  if (!bible) return <ThemedText>{i18n.t("bibleReader.loading")}</ThemedText>;
  if (!book)
    return <ThemedText>{i18n.t("bibleReader.noBookSelected")}</ThemedText>;
  if (!chapter)
    return <ThemedText>{i18n.t("bibleReader.noChapterSelected")}</ThemedText>;

  const selectedBook = bible.books.find((b) => b.name === book);
  if (!selectedBook)
    return (
      <ThemedText>
        {i18n.t("bibleReader.bookNotFound", { book: String(book) })}
      </ThemedText>
    );

  const chapterNumber = parseInt(chapter as string, 10);
  const selectedChapter = selectedBook.chapters.find(
    (c) => c.chapter === chapterNumber,
  );
  if (!selectedChapter)
    return (
      <ThemedText>
        {i18n.t("bibleReader.chapterNotFound", { chapter: String(chapter) })}
      </ThemedText>
    );

  return (
    <ThemedContainer>
      <BibleReader
        book={selectedBook.name}
        chapter={selectedChapter.chapter}
        verses={selectedChapter.verses}
        bibleId={bibleId || undefined}
        totalChapters={selectedBook.chapters.length}
      />
    </ThemedContainer>
  );
}
