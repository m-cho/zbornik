import BackButton from "@/components/ui/BackButton";
import getHeaderSettings from "@/components/ui/HeaderSettings";
import SettingsHeaderButton from "@/components/ui/SettingsHeaderButton";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from "expo-router";

export default function BibleLayout() {
  const colorScheme = useColorScheme();
  const { isLargeScreen } = useBox();

  return (
    <Stack
      screenOptions={
        getHeaderSettings(colorScheme, {}, { isLargeScreen })
      }
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => null,
          headerRight: () => <SettingsHeaderButton />,
        }}
      />
      <Stack.Screen
        name="[book]/index"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => <BackButton href="/bible" />,
          headerRight: () => <SettingsHeaderButton />,
        }}
      />
      <Stack.Screen
        name="[book]/[chapter]"
        options={{
          title: i18n.t('bibleReader.title'),
          headerLeft: () => <BackButton href="/bible/[book]/index"/>,
          headerRight: () => <SettingsHeaderButton />,
        }}
      />
    </Stack>
  );
}