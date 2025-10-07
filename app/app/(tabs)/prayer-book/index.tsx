import PrayersGroup from "@/components/PrayersGroup";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedView } from "@/components/ThemedView";
import i18n from "@/constants/i18n";

export default function PrayerBookScreen() {
  return (
    <ThemedContainer>
      <ThemedView style={{ alignItems: 'center', marginTop: 20 }}>
        <PrayersGroup
          title={i18n.t('prayerBook.everydayPrayers')}
          items={[
            { label: i18n.t('prayerBook.morningPrayers'), href: '/prayer-book/morning' },
            { label: i18n.t('prayerBook.eveningPrayers'), href: '/prayer-book/evening' },
          ]}
        />
        <PrayersGroup
          title={i18n.t('prayerBook.prayerRules')}
          items={[
            { label: i18n.t('prayerBook.stSeraphimOfSarovPrayerRule'), href: '/prayer-book/st-seraphim-of-sarov' },
          ]}
        />
      </ThemedView>
    </ThemedContainer>
  );
}