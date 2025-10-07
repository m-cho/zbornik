import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import i18n from "@/constants/i18n";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from "react";

export default function PrayerScreen() {
  const { prayer } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const translationKey = {
      morning: 'morningPrayers',
      evening: 'eveningPrayers',
      'st-seraphim-of-sarov': 'stSeraphimOfSarovPrayerRule',
    }[prayer as string] ?? prayer;
    navigation.setOptions({ title: `${i18n.t(`prayerBook.${translationKey}`)}` });
  }, [navigation, prayer]);

  // @TODO
  return (
    <ThemedContainer>
      <ThemedText>Prayer: {prayer}</ThemedText>
    </ThemedContainer>
  );
}