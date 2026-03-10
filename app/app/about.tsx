import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SettingsOption from "@/components/ui/SettingsOption";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { StyleSheet } from "react-native";

export default function AboutTheAppScreen() {
  const { appVersion, githubRepoBaseUrl, openWebPage } = useBox();

  return (
    <ThemedContainer>
      <ThemedScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.section}>
            <ThemedView style={styles.settingsGroup}>
              <SettingsOption
                title={i18n.t('about.sourceCode')}
                leftIcon="source-code"
                rightComponent={<ThemedText style={styles.arrowText}>›</ThemedText>}
                onPress={() => openWebPage(githubRepoBaseUrl)}
              />
                <SettingsOption
                  title="Prijavi problem"
                  leftIcon="bug-report"
                  rightComponent={<ThemedText style={styles.arrowText}>›</ThemedText>}
                  onPress={() => openWebPage(`${githubRepoBaseUrl}/issues`)}
                />
              <SettingsOption
                title={i18n.t('about.license')}
                description="GNU General Public License v3.0"
                leftIcon="license"
                rightComponent={<ThemedText style={styles.arrowText}>›</ThemedText>}
                onPress={() => openWebPage(`${githubRepoBaseUrl}/blob/main/LICENSE`)}
              />
              <SettingsOption
                title={i18n.t('about.terms')}
                leftIcon="terms"
                rightComponent={<ThemedText style={styles.arrowText}>›</ThemedText>}
                onPress={() => openWebPage(`${githubRepoBaseUrl}/blob/main/TERMS`)}
              />
              <SettingsOption
                title={i18n.t('about.privacy')}
                leftIcon="privacy"
                rightComponent={<ThemedText style={styles.arrowText}>›</ThemedText>}
                onPress={() => openWebPage(`${githubRepoBaseUrl}/blob/main/PRIVACY`)}
              />
              <SettingsOption
                title={i18n.t('about.version')}
                leftIcon="version"
                rightComponent={(
                  <ThemedText style={styles.arrowText}>{appVersion}</ThemedText>
                )}
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
  arrowText: {
    fontSize: 18,
    fontWeight: '300',
  },
});