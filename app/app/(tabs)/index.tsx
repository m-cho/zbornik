import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";
import { Link, useRouter } from "expo-router";
import { dates as datesModule, periods } from 'ortodox-utils';
import { useEffect, useMemo, useState } from "react";

export default function HomeScreen() {
  const [weekAfterPascha, setWeekAfterPascha] = useState<number | null>(null);
  const [weekAfterPentecost, setWeekAfterPentecost] = useState<number | null>(null);
  const router = useRouter();

  const today = useMemo(() => new Date(), []);
  const locale = i18n.locale;

  const formattedDate = useMemo(() => {
    const weekdayIndex = today.getDay();
    const weekday = i18n.t(`weekdays.${weekdayIndex}`);
    const dateString = today.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${weekday}, ${dateString}`;
  }, [today, locale]);

  useEffect(() => {
    const todayISO = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const weekPentecost = periods.getWeekAfterPentecost(todayISO, 'new')
    const weekPascha = periods.getWeekAfterPascha(todayISO, 'new')
    const dates = datesModule.getForYear(today.getFullYear(), 'new');

    console.log('dates', dates);

    setWeekAfterPascha(weekPascha.week);
    setWeekAfterPentecost(weekPentecost.week);
  }, [today]);

  const weekName = useMemo(() => {
    if (weekAfterPascha !== null) {
      return i18n.t('weekNames.afterPascha', { count: weekAfterPascha });
    } else if (weekAfterPentecost !== null) {
      return i18n.t('weekNames.afterPentecost', { count: weekAfterPentecost });
    }

    return '';
  }, [weekAfterPascha, weekAfterPentecost])

  return (
    <ThemedContainer>
      <ThemedView style={{ flex: 1, flexDirection: 'column', justifyContent: "space-around", alignItems: "center" }}>
        <ThemedView
          lightColor={Colors.light.backgroundLight}
          darkColor={Colors.dark.backgroundLight}
          style={{ padding: 20, borderRadius: 20, width: '90%' }}
        >
          <ThemedText
            type="title"
            style={{ marginBottom: 10 }}
          >
            {i18n.t('home.todayIs')}:
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{ marginBottom: 10 }}
          >
            {formattedDate}
          </ThemedText>
          <ThemedText
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
            style={{ marginBottom: 20 }}
          >
            {weekName}
          </ThemedText>
          <ThemedText
            // lightColor={Colors.light.textSecondary}
            // darkColor={Colors.dark.textSecondary}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
            style={{ marginBottom: 20 }}
          >
            <Link href="/bible/John/1?verses=43-51">
              Јеванђеље: Јн 1, 43-51
              {/* <View style={{ position: 'absolute', right: -30, top: 10 }}>
                <Icon name="chevron-right" size={16} />
              </View> */}
            </Link>
          </ThemedText>
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {/* @TODO add icon <Ionicons name="sunny-outline" size={24} color="black" /> */}
            <PrimaryButton
              title={i18n.t('prayerBook.morningPrayers')}
              style={{ marginBottom: 8 }}
              onPress={() => router.navigate('/prayer-book/morning')}
            />
            {/* @TODO add icon <Ionicons name="moon-outline" size={24} color="black" /> */}
            <PrimaryButton
              title={i18n.t('prayerBook.eveningPrayers')}
              style={{ marginBottom: 8 }}
              onPress={() => router.navigate('/prayer-book/evening')}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedContainer>
  );
}