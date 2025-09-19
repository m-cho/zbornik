import BackButton from "@/components/ui/BackButton";
import BibleSettingsButton from "@/components/ui/BibleSettingsButton";
import getHeaderSettings from "@/components/ui/HeaderSettings";
import i18n from "@/constants/i18n";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from "expo-router";


export default function BibleLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={
        getHeaderSettings(colorScheme, {
          headerRight: () => (<BibleSettingsButton />),
        })
      }
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="[book]/index"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => <BackButton href="/bible" />,
        }}
      />
      <Stack.Screen
        name="[book]/[chapter]"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => <BackButton href="/bible/[book]/index"/>,
        }}
      />
    </Stack>
  );
}