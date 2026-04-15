import Icon from "@/components/ui/Icon";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
/**
 * Zbornik Landing Page - React Native Web
 * Optimized for Web Preview Environment
 */

const APP_COLORS = {
  light: {
    secondary: "#C4924A",
    background: "#ECEAE4",
    backgroundLight: "#F5F3EE",
    text: "#1A2420",
    textSecondary: "#6B7060",
    border: "#D8D4CC",
    icon: "#4F6A62",
    // glow: "rgba(45, 72, 64, 0.03)",
    glow: "#F5F3EE",
  },
  dark: {
    secondary: "#C4924A",
    background: "#253D35",
    backgroundLight: "#2F4A42",
    text: "#F0EDE4",
    textSecondary: "#A8B5B0",
    border: "#3A5248",
    icon: "#8A9A94",
    // glow: "rgba(125, 191, 176, 0.03)",
    glow: "#2F4A42",
  },
};

const CONFIG = {
  appName: "Зборник",
  // androidPlayStoreUrl:
  //   "https://play.google.com/store/apps/details?id=net.zbornik.app",
  // pwaUrl: "https://zbornik.net/app",
  pwaUrl: "/app",
};

const TRANSLATIONS = {
  sr: {
    hero_title: "Зборник",
    hero_subtitle: "Православни молитвеник и Свето Писмо",
    hero_desc:
      "Молитве, Библија у православним преводима и литургијски календар.",
    hero_desc_more: "Бесплатно, без реклама, отвореног кода.",
    cta_android: "Преузми за Android",
    cta_pwa: "Отвори у прегледачу",
    cta_pwa_sub: "PWA верзија",
    feature_prayer: "Молитвеник",
    feature_prayer_desc: "Јутарње, вечерње и остале молитве на српском језику.",
    feature_bible: "Свето Писмо",
    feature_bible_desc: "Православни преводи: српски и црквенословенски.",
    feature_calendar: "Календар",
    // feature_calendar_desc: "Постови, празници и дневна зачала за читање.",
    feature_calendar_desc: "Постови, празници и дневна читања.",
    feature_offline: "Офлајн рад",
    feature_offline_desc: "Читајте молитве и Свето Писмо без интернет везе.",
    feature_theme: "Тамна и светла тема",
    feature_theme_desc: "Читај удобно дању и ноћу.",
    feature_free: "Потпуно бесплатно",
    feature_free_desc: "Без плаћања, без реклама, отворен код.",
    section_features: "ФУНКЦИЈЕ",
  },
  en: {
    hero_title: "Zbornik",
    hero_subtitle: "Orthodox Prayer Book & Holy Scripture",
    hero_desc: "Prayers, Orthodox Bible translations, and liturgical calendar.",
    hero_desc_more: "Free, no ads, open source.",
    cta_android: "Download for Android",
    cta_pwa: "Open in Browser",
    cta_pwa_sub: "PWA version",
    feature_prayer: "Prayer Book",
    feature_prayer_desc: "Morning, evening, and various prayers in Serbian.",
    feature_bible: "Holy Scripture",
    feature_bible_desc: "Orthodox translations: Serbian and Church Slavonic.",
    feature_calendar: "Calendar",
    feature_calendar_desc: "Fasts, feasts, and daily readings.",
    feature_offline: "Offline Ready",
    feature_offline_desc:
      "Access prayers and the Bible without an internet connection.",
    feature_theme: "Dark & Light Theme",
    feature_theme_desc: "Comfortable reading day and night.",
    feature_free: "Completely Free",
    feature_free_desc: "No payments, no ads, open source.",
    section_features: "FEATURES",
  },
};

const FeatureCard = ({
  icon,
  title,
  desc,
  colors,
}: {
  icon: string;
  title: string;
  desc: string;
  colors: (typeof APP_COLORS)["dark" | "light"];
}) => (
  <View
    style={[
      styles.card,
      { backgroundColor: colors.backgroundLight, borderColor: colors.border },
    ]}
  >
    <View
      style={{
        width: styles.cardIcon.fontSize,
        height: styles.cardIcon.fontSize,
        marginBottom: styles.cardIcon.marginBottom,
      }}
    >
      <Icon
        name={icon}
        color={colors.secondary}
        size={styles.cardIcon.fontSize}
      />
    </View>
    {/* <Text style={[styles.cardIcon, { color: colors.secondary }]}>{icon}</Text> */}
    <Text style={[styles.cardTitle, { color: colors.secondary }]}>{title}</Text>
    <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
      {desc}
    </Text>
  </View>
);

export default function App() {
  const scheme = useColorScheme();
  const [lang, setLang] = useState<"sr" | "en">("sr");
  const colors = (APP_COLORS as any)?.[scheme as any] || APP_COLORS.light;
  const t = TRANSLATIONS[lang];

  // Language detection
  // useEffect(() => {
  //   if (Platform.OS === "web") {
  //     const detected = navigator.language.startsWith("sr") ? "sr" : "en";
  //     setLang(detected);
  //     document.title =
  //       TRANSLATIONS[detected].hero_title +
  //       " — " +
  //       TRANSLATIONS[detected].hero_subtitle;
  //   }
  // }, []);

  const openUrl = (url: string) => {
    if (Platform.OS === "web") {
      // Replaces current page instead of opening new tab
      window.location.href = url;
    } else {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't load page", err),
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        {/* Nav */}
        <View style={[styles.nav, { backgroundColor: colors.background }]}>
          <Text style={[styles.logo, { color: colors.secondary }]}>
            ☦ ЗБОРНИК
          </Text>
          <View style={styles.langSwitch}>
            <Pressable onPress={() => setLang("sr")}>
              <Text
                style={[
                  styles.langText,
                  {
                    color:
                      lang === "sr" ? colors.secondary : colors.textSecondary,
                  },
                ]}
              >
                SR
              </Text>
            </Pressable>
            <Pressable onPress={() => setLang("en")}>
              <Text
                style={[
                  styles.langText,
                  {
                    color:
                      lang === "en" ? colors.secondary : colors.textSecondary,
                  },
                ]}
              >
                EN
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.glow }]}>
          <Text style={[styles.heroCross, { color: colors.secondary }]}>☦</Text>
          <Text style={[styles.heroTitle, { color: colors.secondary }]}>
            {t.hero_title}
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.text }]}>
            {t.hero_subtitle}
          </Text>
          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
            {t.hero_desc}
          </Text>
          <Text style={[styles.heroDescMore, { color: colors.textSecondary }]}>
            {t.hero_desc_more}
          </Text>

          <View style={styles.ctaRow}>
            {/* <Pressable
              style={[styles.btnPrimary, { backgroundColor: colors.secondary }]}
              onPress={() => openUrl(CONFIG.androidPlayStoreUrl)}
            >
              <Text style={styles.btnPrimaryText}>{t.cta_android}</Text>
            </Pressable> */}
            <Pressable
              style={[styles.btnPrimary, { backgroundColor: colors.secondary }]}
              onPress={() => openUrl(CONFIG.pwaUrl)}
            >
              <Text style={styles.btnPrimaryText}>{t.cta_pwa}</Text>
            </Pressable>

            {/* <Pressable
              style={[styles.btnSecondary, { borderColor: colors.secondary }]}
              onPress={() => openUrl(CONFIG.pwaUrl)}
            >
              <Text
                style={[styles.btnSecondaryText, { color: colors.secondary }]}
              >
                {t.cta_pwa}
              </Text>
            </Pressable> */}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Text
              style={[styles.sectionTitle, { color: colors.textSecondary }]}
            >
              {t.section_features}
            </Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.grid}>
            <FeatureCard
              icon="candle"
              title={t.feature_prayer}
              desc={t.feature_prayer_desc}
              colors={colors}
            />
            <FeatureCard
              icon="book-bible"
              title={t.feature_bible}
              desc={t.feature_bible_desc}
              colors={colors}
            />
            <FeatureCard
              icon="calendar"
              title={t.feature_calendar}
              desc={t.feature_calendar_desc}
              colors={colors}
            />
            <FeatureCard
              icon="offline"
              title={t.feature_offline}
              desc={t.feature_offline_desc}
              colors={colors}
            />
            <FeatureCard
              icon="moon"
              title={t.feature_theme}
              desc={t.feature_theme_desc}
              colors={colors}
            />
            <FeatureCard
              icon="heart"
              title={t.feature_free}
              desc={t.feature_free_desc}
              colors={colors}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <View style={styles.footerLinks}>
            <Pressable
              onPress={() => openUrl("https://github.com/m-cho/zbornik")}
              style={styles.footerLink}
            >
              <Text
                style={[styles.footerLinkText, { color: colors.secondary }]}
              >
                GitHub
              </Text>
            </Pressable>
            <Text style={{ color: colors.textSecondary, opacity: 0.3 }}>•</Text>
            <Pressable
              onPress={() =>
                openUrl("https://github.com/m-cho/zbornik/blob/main/LICENSE")
              }
              style={styles.footerLink}
            >
              <Text
                style={[styles.footerText, { color: colors.textSecondary }]}
              >
                GNU GPL v3
              </Text>
            </Pressable>
          </View>
          <Text style={[styles.copyright, { color: colors.textSecondary }]}>
            © 2026 Зборник
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    maxWidth: 1000,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
  },
  langSwitch: {
    flexDirection: "row",
    gap: 16,
  },
  langText: {
    fontWeight: "700",
    fontSize: 14,
  },
  hero: {
    width: "100%",
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroCross: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: Platform.OS === "web" ? 72 : 48,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: Platform.OS === "web" ? "serif" : "serif",
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
    maxWidth: 600,
    fontFamily: Platform.OS === "web" ? "serif" : "serif",
  },
  heroDesc: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 600,
    marginBottom: 12,
  },
  heroDescMore: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 500,
    marginBottom: 40,
  },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  btnPrimary: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 14,
    minWidth: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  btnSecondary: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    minWidth: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    fontWeight: "700",
    fontSize: 16,
  },
  btnSubText: {
    fontSize: 10,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  section: {
    width: "100%",
    maxWidth: 1000,
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 48,
    gap: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    width: "100%",
  },
  card: {
    padding: 32,
    borderRadius: 20,
    borderWidth: 1,
    width: Platform.OS === "web" ? "45%" : "100%",
    minWidth: 280,
    maxWidth: 460,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 15,
    lineHeight: 24,
  },
  footer: {
    width: "100%",
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: "center",
    borderTopWidth: 1,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  footerLink: {
    padding: 4,
  },
  footerLinkText: {
    fontSize: 14,
    fontWeight: "700",
  },
  footerText: {
    fontSize: 14,
  },
  copyright: {
    fontSize: 12,
    opacity: 0.6,
  },
});
