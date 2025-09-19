import { Colors } from "@/constants/Colors";
import { Bible } from "@/hooks/useBible";
import { Pressable } from "react-native";
import { ChurchSlavonicText } from "./ChurchSlavonicText";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";

type BibleReaderProps = {
  book: string;
  chapter: number;
  verses: Bible["books"][0]["chapters"][0]["verses"];
  bibleId?: string;
}

export function BibleReader({ book: _book, chapter: _chapter, verses, bibleId }: BibleReaderProps) {
  const isChurchSlavonic = bibleId === "church-slavonic";
  
  return (
    <ThemedScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "flex-start", padding: 20, paddingTop: 0 }}>
      {verses.map(v => (
        <Pressable key={v.verse} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' }}>
          {isChurchSlavonic ? (
            <>
              <ChurchSlavonicText
                style={{ 
                  fontWeight: 'bold', 
                  marginRight: 10,
                }}
                lightColor={Colors.light.textSecondary}
                darkColor={Colors.dark.textSecondary}
              >
                {v.verse}
              </ChurchSlavonicText>
              <ChurchSlavonicText style={{ flex: 1 }}>
                {v.text}
              </ChurchSlavonicText>
            </>
          ) : (
            <>
              <ThemedText
                style={{ fontWeight: 'bold', marginRight: 10 }}
                lightColor={Colors.light.textSecondary}
                darkColor={Colors.dark.textSecondary}
              >
                {v.verse}
              </ThemedText>
              <ThemedText>{v.text}</ThemedText>
            </>
          )}
        </Pressable>
      ))}
    </ThemedScrollView>
  );
}