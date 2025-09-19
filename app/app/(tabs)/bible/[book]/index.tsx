import BibleChapterPicker from '@/components/BibleChapterPicker';
import ThemedContainer from '@/components/ThemedContainer';
import { ThemedText } from '@/components/ThemedText';
import i18n from '@/constants/i18n';
import { useBible } from '@/hooks/useBible';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function ChapterPickerScreen() {
  const { bible } = useBible();
  const navigation = useNavigation();
  const { book } = useLocalSearchParams();

  const selectedBook = bible?.books.find(b => b.name === book);

  useEffect(() => {
    navigation.setOptions({ title: `${i18n.t(`books.${book}`)}` });
  }, [navigation, book]);

  if (!bible) return <ThemedText>Loading Bible...</ThemedText>;
  if (!selectedBook) return <ThemedText>Book not found: {String(book)}</ThemedText>;

  return (
    <ThemedContainer>
      <BibleChapterPicker
        book={book as string}
        chapters={selectedBook.chapters.map(c => c.chapter)}
      />
    </ThemedContainer>
  );
}