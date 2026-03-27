import { Bibles } from "@/constants/Bibles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { create } from "zustand";

export type Bible = {
  translation: string;
  books: {
    name: string;
    chapters: {
      chapter: number;
      verses: { verse: number; text: string }[];
    }[];
  }[];
};

type State = {
  selectedBibleId: keyof typeof Bibles | null;
  setSelectedBibleId: (bibleId: keyof typeof Bibles) => void;

  bible: Bible | null;
  setBible: (bible: Bible) => void;
  clearBible: () => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  errorMsg: string | null;
  setErrorMsg: (book: string | null) => void;

  book: string | null;
  setBook: (book: string | null) => void;

  chapter: number | null;
  setChapter: (chapter: number | null) => void;

  verse: number | null;
  setVerse: (verse: number | null) => void;

  lastReaderPosition: {
    book: string;
    chapter: number;
  } | null;
  setLastReaderPosition: (
    position: {
      book: string;
      chapter: number;
    } | null,
  ) => void;
};

const LAST_READER_POSITION_KEY = "lastReaderPosition";
const SELECTED_BIBLE_ID_KEY = "selectedBibleId";
const BIBLE_DATA_KEY = "bibleData";

const useStore = create<State>()((set) => ({
  selectedBibleId: null,
  setSelectedBibleId: (bibleId: State["selectedBibleId"]) =>
    set({ selectedBibleId: bibleId }),

  bible: null,
  setBible: (bible: State["bible"]) => set({ bible }),
  clearBible: () => set({ bible: null }),

  loading: true,
  setLoading: (loading: State["loading"]) => set({ loading }),

  errorMsg: null,
  setErrorMsg: (errorMsg: State["errorMsg"]) => set({ errorMsg }),

  book: null,
  setBook: (book: State["book"]) => set({ book }),

  chapter: null,
  setChapter: (chapter: State["chapter"]) => set({ chapter }),

  verse: null,
  setVerse: (verse: State["verse"]) => set({ verse }),

  lastReaderPosition: null,
  setLastReaderPosition: (position: State["lastReaderPosition"]) =>
    set({
      lastReaderPosition: position,
    }),
}));

async function getBibleDataFromStorage() {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(BIBLE_DATA_KEY);
  } else {
    const file = new File(Paths.cache, `${BIBLE_DATA_KEY}.json`);

    if (!file.exists) {
      file.create();
    }

    return file.text();
  }
}

async function setBibleDataToStorage(data: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(BIBLE_DATA_KEY, data);
  } else {
    const file = new File(Paths.cache, `${BIBLE_DATA_KEY}.json`);
    file.write(data);
  }
}

async function clearBibleDataFromStorage() {
  await AsyncStorage.removeItem(SELECTED_BIBLE_ID_KEY);
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem(BIBLE_DATA_KEY);
  } else {
    const file = new File(Paths.cache, `${BIBLE_DATA_KEY}.json`);
    if (file.exists) {
      file.delete();
    }
  }
}

export function useBible() {
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const errorMsg = useStore((state) => state.errorMsg);
  const setErrorMsg = useStore((state) => state.setErrorMsg);
  const bibleId = useStore((state) => state.selectedBibleId);
  const setSelectedBibleId = useStore((state) => state.setSelectedBibleId);
  const bible = useStore((state) => state.bible);
  const setBible = useStore((state) => state.setBible);
  const clearBible = useStore((state) => state.clearBible);
  const book = useStore((state) => state.book);
  const setBook = useStore((state) => state.setBook);
  const chapter = useStore((state) => state.chapter);
  const setChapter = useStore((state) => state.setChapter);
  const verse = useStore((state) => state.verse);
  const setVerse = useStore((state) => state.setVerse);
  const lastReaderPosition = useStore((state) => state.lastReaderPosition);
  const setLastReaderPositionToStore = useStore(
    (state) => state.setLastReaderPosition,
  );

  const setLastReaderPosition = useCallback(
    async (position: State["lastReaderPosition"]) => {
      if (position) {
        await AsyncStorage.setItem(
          LAST_READER_POSITION_KEY,
          JSON.stringify(position),
        );
      } else {
        await AsyncStorage.removeItem(LAST_READER_POSITION_KEY);
      }
      setLastReaderPositionToStore(position);
    },
    [setLastReaderPositionToStore],
  );

  useEffect(() => {
    AsyncStorage.getItem(LAST_READER_POSITION_KEY)
      .then((pos) => {
        if (pos) {
          setLastReaderPositionToStore(JSON.parse(pos));
          if (book === null && chapter === null) {
            try {
              const { book, chapter } = JSON.parse(pos);
              setBook(book);
              setChapter(chapter);
            } catch (err) {
              console.error("Error parsing last reader position:", err);
              setLastReaderPositionToStore(null);
            }
          }
        }
      })
      .then(() => {
        return getBible();
      })
      .then((data) => {
        if (data) {
          setBible(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBible, setLoading, setErrorMsg]);

  const getBible = async (bibleId?: keyof typeof Bibles) => {
    try {
      const storedBible = !bibleId ? await getBibleDataFromStorage() : null;
      if (storedBible && !bibleId) {
        setSelectedBibleId(
          (await AsyncStorage.getItem(
            SELECTED_BIBLE_ID_KEY,
          )) as keyof typeof Bibles,
        );
        return JSON.parse(storedBible);
      } else {
        const bibleIdToSelect = bibleId ?? "srpski-ekavski-danicic-karadzic";
        await AsyncStorage.setItem(SELECTED_BIBLE_ID_KEY, bibleIdToSelect);
        setSelectedBibleId(bibleIdToSelect);
        const response = await fetch(Bibles[bibleIdToSelect].url);
        const data = await response.json();
        await setBibleDataToStorage(JSON.stringify(data));

        return data;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Error fetching Bible data:", err);
      setErrorMsg(message);
      return null;
    }
  };

  const retry = async () => {
    clearBible();
    setErrorMsg(null);
    setLoading(true);
    await clearBibleDataFromStorage();
    getBible()
      .then((data) => {
        if (data) {
          setBible(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    bible,
    errorMsg,
    bibleId,
    book,
    setBook,
    chapter,
    setChapter,
    verse,
    setVerse,
    lastReaderPosition,
    setLastReaderPosition,
    getBible,
    retry,
  };
}
