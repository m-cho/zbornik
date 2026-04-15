import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { View } from "react-native";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";

type BibleChapterPickerProps = {
  book: string;
  chapters: number[];
};

export default function BibleChapterPicker({
  book,
  chapters,
}: BibleChapterPickerProps) {
  const borderColor = useThemeColor({}, "secondary");
  const cardBg = useThemeColor(
    { light: Colors.light.backgroundLight, dark: Colors.dark.backgroundLight },
    "backgroundLight",
  );

  return (
    <ThemedScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View
        style={{
          backgroundColor: cardBg,
          borderRadius: 20,
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {chapters.map((chapter) => (
          <Link key={chapter} href={`/app/bible/${book}/${chapter}`}>
            <View
              style={{
                borderRadius: 48,
                width: 48,
                height: 48,
                margin: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor,
                borderWidth: 1,
                borderStyle: "solid",
                userSelect: "none",
              }}
            >
              <ThemedText
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                {chapter}
              </ThemedText>
            </View>
          </Link>
        ))}
      </View>
    </ThemedScrollView>
  );
}
