import ThemedContainer from "@/components/ThemedContainer";
import { Colors } from "@/constants/Colors";
import usePrayerBook from "@/hooks/usePrayerBook";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Markdown from 'react-native-markdown-display';

export default function PrayerScreen() {
  const { prayer } = useLocalSearchParams();
  const navigation = useNavigation();
  const { prayers, getPrayerContent } = usePrayerBook();
  const [content, setContent] = useState<string>('');

  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  useEffect(() => {
    const prayerMetadata = prayers[prayer as string];
    if (prayerMetadata) {
      navigation.setOptions({ title: prayerMetadata.title });
    }
  }, [navigation, prayer, prayers]);

  useEffect(() => {
    if (prayer && getPrayerContent) {
      const prayerContent = getPrayerContent(prayer as string);
      setContent(prayerContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayer]);

  return (
    <ThemedContainer>
      <ScrollView style={{ padding: 16 }}>
        <Markdown
          style={{
            body: { color: textColor, fontSize: 16, lineHeight: 24 },
            heading1: { color: textColor, fontSize: 24, fontWeight: '600', marginBottom: 16 },
            heading2: { color: textColor, fontSize: 20, fontWeight: '600', marginBottom: 12, marginTop: 20 },
            paragraph: { color: textColor, marginBottom: 12 },
            strong: { fontWeight: '600' },
            em: { fontStyle: 'italic', opacity: 0.8 },
            hr: { backgroundColor: textColor, opacity: 0.2, height: 1, marginVertical: 16 },
          }}
        >
          {content}
        </Markdown>
      </ScrollView>
    </ThemedContainer>
  );
}