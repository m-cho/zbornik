import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import SettingsOption from "@/components/ui/SettingsOption";
import i18n from "@/constants/i18n";
import { useRouter } from 'expo-router';
import { StyleSheet } from "react-native";

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ThemedContainer>
      <ThemedScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.content}>
          <SettingsOption
            leftIcon="cog-outline"
            title={i18n.t('settings.title')}
            onPress={() => {
              router.push('/settings');
            }}
          />
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