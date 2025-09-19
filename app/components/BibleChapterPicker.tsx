import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { View } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";

type BibleChapterPickerProps = {
  book: string;
  chapters: number[];
}

export default function BibleChapterPicker({ book, chapters }: BibleChapterPickerProps) {
  const borderColor = useThemeColor({}, 'secondary');

  return (
    <ThemedScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
        {chapters.map((chapter) => (
          <Link key={chapter} href={`/bible/${book}/${chapter}`}>
            <View style={{
              borderRadius: 48,
              width: 48,
              height: 48,
              margin: 8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor,
              borderWidth: 1,
              borderStyle: 'solid',
            }}>
              <ThemedText lightColor={Colors.light.secondary} darkColor={Colors.dark.secondary}>{chapter}</ThemedText>
            </View>
          </Link>
        ))}
      </View>
    </ThemedScrollView>
  )
}