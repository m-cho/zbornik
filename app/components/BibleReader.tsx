import { Colors } from "@/constants/Colors";
import { Bible } from "@/hooks/useBible";
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRef } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, Text } from "react-native";
import { ChurchSlavonicText } from "./ChurchSlavonicText";
import ThemedContainer from "./ThemedContainer";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";

type BibleReaderProps = {
  book: string;
  chapter: number;
  verses: Bible["books"][0]["chapters"][0]["verses"];
  bibleId?: string;
}

const BUTTONS_HEIGHT = 50;

export function BibleReader({ book: _book, chapter: _chapter, verses, bibleId }: BibleReaderProps) {
  const isChurchSlavonic = bibleId === "church-slavonic";
  const colorScheme = useColorScheme();

  const lastY = useRef(0);
  const translateY = useRef(
    new Animated.Value(BUTTONS_HEIGHT)
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;


  const show = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.96,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: BUTTONS_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y < lastY.current - 5) {
      show(); // scrolling up
    } else if (y > lastY.current + 5) {
      hide(); // scrolling down
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
      >
        {verses.map(v => (
          <Pressable key={v.verse} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' }}>
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
                <ThemedText
                  style={styles.verseText}
                >{v.text}</ThemedText>
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
            backgroundColor: Colors[colorScheme ?? 'light'].backgroundLight
          }
        ]}
      >
        <Text>The buttons go here</Text>
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
    paddingTop: 0,
    paddingBottom: BUTTONS_HEIGHT
  },
  verseNumber: { 
    fontWeight: 'bold', 
    marginRight: 10,
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
  },
});
