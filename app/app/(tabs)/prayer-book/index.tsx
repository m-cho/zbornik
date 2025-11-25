import PrayersGroup from "@/components/PrayersGroup";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import usePrayerBook from "@/hooks/usePrayerBook";

export default function PrayerBookScreen() {
  const { categories, prayers } = usePrayerBook();

  return (
    <ThemedContainer>
      <ThemedScrollView
        style={{ marginTop: 20 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {categories.map((category) => (
          <PrayersGroup
            key={category.id}
            title={category.title}
            items={category.prayers.map((prayerId) => {
              const prayer = prayers[prayerId];
              return {
                label: prayer?.title || prayerId,
                href: `/prayer-book/${prayerId}`,
              };
            })}
          />
        ))}
      </ThemedScrollView>
    </ThemedContainer>
  );
}