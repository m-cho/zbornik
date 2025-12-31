import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Chip } from "@/components/ui/Chip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { useLiturgicalCalendar } from "@/hooks/useLiturgicalCalendar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { openWebPage } = useBox();

  const today = useMemo(() => {
    // Date override only in dev mode
    if (__DEV__) {
      const pDate = typeof params.date === 'string' ? params.date : undefined;
      if (pDate) {
        const d = new Date(pDate);
        if (!isNaN(d.getTime())) return d;
      }
    }
    return new Date();
  }, [params.date]);
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

  const liturgicalInfo = useLiturgicalCalendar(today);

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
      <ThemedScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: "center", alignItems: "center", paddingVertical: 20 }}
      >
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
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
              style={{ marginBottom: 6, fontSize: 13, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 }}
            >
              {i18n.t('home.todayIs')}
            </ThemedText>
            <ThemedText
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
              style={{ marginBottom: 12, fontSize: 16, lineHeight: 22, fontWeight: '400' }}
            >
              {formattedDate}
            </ThemedText>
            
            {liturgicalInfo.weekName && (
              <ThemedText
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                style={{ fontSize: 16, lineHeight: 22, fontWeight: '500', marginBottom: 8 }}
              >
                {liturgicalInfo.weekName}
              </ThemedText>
            )}
            
            {liturgicalInfo.specialDay && (
              <Chip
                label={liturgicalInfo.specialDay}
                variant="primary"
                style={{ marginTop: 4, marginBottom: 8, alignSelf: 'flex-start' }}
              />
            )}
            
            <ThemedView
              lightColor={Colors.light.backgroundLight}
              darkColor={Colors.dark.backgroundLight}
              style={{ marginTop: 8, gap: 8 }}
            >
              {liturgicalInfo.isFasting && liturgicalInfo.fastingPeriod && (
                <ThemedView
                  lightColor={Colors.light.backgroundLight}
                  darkColor={Colors.dark.backgroundLight}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <ThemedText style={{ fontSize: 14 }}>🍃</ThemedText>
                  <ThemedText
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                    style={{ fontSize: 13.5, fontWeight: '600' }}
                  >
                    {liturgicalInfo.fastingPeriod}
                  </ThemedText>
                </ThemedView>
              )}
              
              {liturgicalInfo.currentPeriod && (
                <ThemedText
                  lightColor={Colors.light.textSecondary}
                  darkColor={Colors.dark.textSecondary}
                  style={{ fontSize: 13, lineHeight: 19, fontStyle: 'italic' }}
                >
                  {liturgicalInfo.currentPeriod}
                </ThemedText>
              )}
              
              {liturgicalInfo.upcomingFeast && (
                <ThemedText
                  lightColor={Colors.light.textSecondary}
                  darkColor={Colors.dark.textSecondary}
                  style={{ fontSize: 12.5, lineHeight: 18 }}
                >
                  {i18n.t('liturgical.upcomingFeast')}: {liturgicalInfo.upcomingFeast.name} ({liturgicalInfo.upcomingFeast.date.toLocaleDateString(locale, { day: 'numeric', month: 'long' })})
                </ThemedText>
              )}
            </ThemedView>
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
      </ThemedScrollView>
    </ThemedContainer>
  );
}