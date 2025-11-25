import ThemedContainer from "@/components/ThemedContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { dates as datesModule, periods } from 'ortodox-utils';
import { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

export default function HomeScreen() {
  const [weekAfterPascha, setWeekAfterPascha] = useState<number | null>(null);
  const [weekAfterPentecost, setWeekAfterPentecost] = useState<number | null>(null);
  const router = useRouter();

  const today = useMemo(() => new Date(), []);
  const todayJulian = useMemo(() => {
    const julianDate = new Date(today);
    julianDate.setDate(julianDate.getDate() - 13);
    return julianDate;
  }, [today]);
  const locale = i18n.locale;

  const formattedDate = useMemo(() => {
    const weekdayIndex = today.getDay();
    const weekday = i18n.t(`weekdays.${weekdayIndex}`);
    const dateString = today.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const julianDateString = todayJulian.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${weekday}, ${dateString} (${julianDateString})`;
  }, [today, todayJulian, locale]);

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

  const openWebPage = async (url: string) => {
    console.log('Opening URL:', url);

    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      await WebBrowser.openBrowserAsync(url);
    }
  }

  const openPrologueForToday = async () => {
    const url = `https://www.svetosavlje.org/prolog-${todayJulian.getMonth() + 2}/${todayJulian.getDate() + 1}`;

    openWebPage(url);
  }

  const openSaintsForToday = async () => {
    const url = `https://www.svetosavlje.org/zitija-svetih-${todayJulian.getMonth() + 2}/${todayJulian.getDate() + 1}`;

    openWebPage(url);
  }

  return (
    <ThemedContainer>
      <ThemedView style={{ flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
        <ThemedView
          lightColor={Colors.light.backgroundLight}
          darkColor={Colors.dark.backgroundLight}
          style={{ padding: 24, borderRadius: 24, width: '90%', maxWidth: 600 }}
        >
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={{
              marginBottom: 24,
              borderBottomColor: Colors.light.textSecondary,
              borderBottomWidth: 0.5,
              paddingBottom: 20,
            }}
          >
            <ThemedText
              type="title"
              style={{ marginBottom: 12, fontSize: 24 }}
            >
              {i18n.t('home.todayIs')}:
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={{ marginBottom: 8, fontSize: 18, lineHeight: 26 }}
            >
              {formattedDate}
            </ThemedText>
            <ThemedText
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
              style={{ fontSize: 15, lineHeight: 22 }}
            >
              {weekName}
            </ThemedText>
            {/* <ThemedText
              // lightColor={Colors.light.textSecondary}
              // darkColor={Colors.dark.textSecondary}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
              style={{ marginBottom: 20 }}
            >
              <Link href="/bible/John/1?verses=43-51">
                Јеванђеље: Јн 1, 43-51
              </Link>
            </ThemedText> */}
          </ThemedView>
          <ThemedText
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
            style={{ marginBottom: 14, fontSize: 13, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' }}
          >
            {i18n.t('home.prayers')}:
          </ThemedText>
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginBottom: 24,
              gap: 10,
            }}
          >
            <PrimaryButton
              title={i18n.t('home.morningPrayers')}
              style={{ flex: 1, minWidth: 150 }}
              textStyle={{ fontSize: 15 }}
              iconLeft="sunny-outline"
              onPress={() => router.navigate('/prayer-book/jutarnje')}
            />
            <PrimaryButton
              title={i18n.t('home.eveningPrayers')}
              style={{ flex: 1, minWidth: 150 }}
              textStyle={{ fontSize: 15 }}
              iconLeft="moon-outline"
              onPress={() => router.navigate('/prayer-book/vecernje')}
            />
          </ThemedView>
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}
          >
            <ThemedText
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
              style={{ fontSize: 13, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' }}
            >
              {i18n.t('home.reading')}:
            </ThemedText>
            <ThemedText
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
              style={{ fontSize: 11, fontStyle: 'italic', opacity: 0.6 }}
              onPress={() => openWebPage('https://www.svetosavlje.org')}
            >
              {i18n.t('home.readingSource')}
            </ThemedText>
          </ThemedView>
          <ThemedView
            lightColor={Colors.light.backgroundLight}
            darkColor={Colors.dark.backgroundLight}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <PrimaryButton
              title={i18n.t('home.prologue')}
              style={{ flex: 1, minWidth: 150 }}
              textStyle={{ fontSize: 15 }}
              iconLeft="book-open-page-variant"
              onPress={() => openPrologueForToday()}
            />
            <PrimaryButton
              title={i18n.t('home.saints')}
              style={{ flex: 1, minWidth: 150 }}
              textStyle={{ fontSize: 15 }}
              iconLeft="book-open-page-variant"
              onPress={() => openSaintsForToday()}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedContainer>
  );
}