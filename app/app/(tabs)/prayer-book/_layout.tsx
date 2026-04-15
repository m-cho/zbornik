import getHeaderSettings from "@/components/ui/HeaderSettings";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function PrayerBookLayout() {
  const colorScheme = useColorScheme();
  const { isLargeScreen } = useBox();

  return (
    <Stack
      screenOptions={getHeaderSettings(colorScheme, {}, { isLargeScreen })}
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t("prayerBook.title"),
          headerLeft: () => null,
        }}
      />
      {/* <Stack.Screen
        name="[prayer]/index"
        options={{
          title: i18n.t('prayerBook.title'),
          headerLeft: () => <BackButton href="/prayer-book" />,
        }}
      /> */}
    </Stack>
  );
}
