import { Colors } from "@/constants/Colors";
import { Bible } from "@/hooks/useBible";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ChurchSlavonicText } from "./ChurchSlavonicText";
import ThemedContainer from "./ThemedContainer";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";

type BibleReaderProps = {
  book: string;
  chapter: number;
  verses: Bible["books"][0]["chapters"][0]["verses"];
  bibleId?: string;
  totalChapters?: number;
};

const BUTTONS_HEIGHT = 36;

const useNativeDriver = Platform.OS !== "web";

export function BibleReader({
  book,
  chapter,
  verses,
  bibleId,
  totalChapters,
}: BibleReaderProps) {
  const isChurchSlavonic = bibleId === "church-slavonic";
  const colorScheme = useColorScheme();
  const router = useRouter();
  const scheme = colorScheme ?? "light";

  const hasPrev = chapter > 1;
  const hasNext = totalChapters ? chapter < totalChapters : false;

  const lastY = useRef(0);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.96)).current;

  const show = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 0.96,
        duration: 150,
        useNativeDriver,
      }),
    ]).start();
  };

  const hide = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      hideTimeout.current = null;
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: BUTTONS_HEIGHT,
          duration: 200,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver,
        }),
      ]).start();
    }, 200);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const y = contentOffset.y;
    const isAtBottom = y + layoutMeasurement.height >= contentSize.height - 20;

    if (isAtBottom || y < lastY.current - 5) {
      show();
    } else if (y > lastY.current + 5) {
      hide();
    }

    lastY.current = y;
  };

  return (
    <ThemedContainer>
      <ThemedScrollView
        animated
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={100}
        onScroll={onScroll}
        lightColor={Colors.light.backgroundLight}
        darkColor={Colors.dark.backgroundLight}
      >
        {verses.map((v) => (
          <Pressable
            key={v.verse}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            {isChurchSlavonic ? (
              <>
                <ChurchSlavonicText
                  style={styles.verseNumber}
                  lightColor={Colors.light.textSecondary}
                  darkColor={Colors.dark.textSecondary}
                >
                  {v.verse}
                </ChurchSlavonicText>
                <ChurchSlavonicText style={styles.verseText}>
                  {v.text}
                </ChurchSlavonicText>
              </>
            ) : (
              <>
                <ThemedText
                  style={styles.verseNumber}
                  lightColor={Colors.light.textSecondary}
                  darkColor={Colors.dark.textSecondary}
                >
                  {v.verse}
                </ThemedText>
                <ThemedText style={styles.verseText}>{v.text}</ThemedText>
              </>
            )}
          </Pressable>
        ))}
      </ThemedScrollView>
      <Animated.View
        style={[
          styles.buttonsContainer,
          {
            transform: [{ translateY }],
            opacity,
            backgroundColor: Colors[scheme].backgroundLight,
            borderTopColor: Colors[scheme].border,
            borderTopWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        {hasPrev ? (
          <TouchableOpacity
            onPress={() => router.replace(`/bible/${book}/${chapter - 1}`)}
            style={styles.navButton}
          >
            <ThemedText
              style={[
                styles.navButtonText,
                { color: Colors[scheme].secondary },
              ]}
            >
              ‹ {chapter - 1}
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <ThemedText style={styles.navButtonPlaceholder} />
        )}

        <TouchableOpacity
          onPress={() => router.replace(`/bible/${book}`)}
          style={styles.navButton}
        >
          <ThemedText
            style={[
              styles.navButtonText,
              { color: Colors[scheme].textSecondary },
            ]}
          >
            ≡
          </ThemedText>
        </TouchableOpacity>

        {hasNext ? (
          <TouchableOpacity
            onPress={() => router.replace(`/bible/${book}/${chapter + 1}`)}
            style={styles.navButton}
          >
            <ThemedText
              style={[
                styles.navButtonText,
                { color: Colors[scheme].secondary },
              ]}
            >
              {chapter + 1} ›
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <ThemedText style={styles.navButtonPlaceholder} />
        )}
      </Animated.View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 20,
    paddingBottom: BUTTONS_HEIGHT,
  },
  verseNumber: {
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 20,
    textAlign: "right",
  },
  verseText: {
    flex: 1,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: BUTTONS_HEIGHT,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  navButton: {
    flex: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonPlaceholder: {
    flex: 1,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: "600",
    userSelect: "none",
  },
});
