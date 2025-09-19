import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BibleSelector from "@/components/ui/BibleSelector";
import SettingsOption from "@/components/ui/SettingsOption";
import i18n from "@/constants/i18n";
import { StyleSheet } from "react-native";

export default function BibleSettingsScreen() {
  return (
    <ThemedContainer>
      <ThemedScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.content}>
          {/* Settings Group: Appearance */}
          {/* @TODO */}
          {/* <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{i18n.t('bibleSettings.appearance')}</ThemedText>
            <ThemedView style={styles.settingsGroup}>
              <ThemeSelector />
            </ThemedView>
          </ThemedView> */}

          {/* Settings Group: Bible */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{i18n.t('bibleSettings.bible')}</ThemedText>
            <ThemedView style={styles.settingsGroup}>
              <BibleSelector />
            </ThemedView>
          </ThemedView>

          {/* Settings Group: About */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{i18n.t('bibleSettings.about')}</ThemedText>
            <ThemedView style={styles.settingsGroup}>
              <SettingsOption
                title={i18n.t('bibleSettings.version')}
                description="1.0.0"
                disabled
              />
              <SettingsOption
                title={i18n.t('bibleSettings.appInfo')}
                description={i18n.t('bibleSettings.appInfoDescription')}
                disabled
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginHorizontal: 16,
    opacity: 0.8,
  },
  settingsGroup: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
});