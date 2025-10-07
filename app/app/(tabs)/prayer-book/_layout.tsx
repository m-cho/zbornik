import BackButton from "@/components/ui/BackButton";
import getHeaderSettings from "@/components/ui/HeaderSettings";
import i18n from "@/constants/i18n";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from "expo-router";


export default function PrayerBookLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={
        getHeaderSettings(colorScheme, {})
      }
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t('prayerBook.title'),
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="[prayer]/index"
        options={{
          title: i18n.t('prayerBook.title'),
          headerLeft: () => <BackButton href="/prayer-book" />,
        }}
      />
    </Stack>
  );
}