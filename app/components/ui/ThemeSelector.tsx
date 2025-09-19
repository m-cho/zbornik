import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Appearance, Modal, Pressable, StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";

const themeOptions = [
  { id: 'system', label: 'System', description: 'Use device setting' },
  { id: 'light', label: 'Light', description: 'Light theme' },
  { id: 'dark', label: 'Dark', description: 'Dark theme' },
];

export default function ThemeSelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | null>(null);
  const [isSystemTheme, setSystemTheme] = useState(true);
  const borderColor = useThemeColor({}, 'border');

  const currentThemeDescription = isSystemTheme
    ? `System (${Appearance.getColorScheme()})`
    : colorScheme === 'dark'
    ? 'Dark theme'
    : 'Light theme';

  const handleThemeSelect = (themeId: string) => {
    if (themeId === 'system') {
      setSystemTheme(true);
      Appearance.setColorScheme(null);
    } else {
      setColorScheme(themeId as 'light' | 'dark');
      Appearance.setColorScheme(themeId as 'light' | 'dark');
    }
    setModalVisible(false);
  };

  const getCurrentSelection = () => {
    if (isSystemTheme) return 'system';
    return colorScheme || 'light';
  };

  return (
    <>
      <SettingsOption
        title="Theme"
        description={currentThemeDescription}
        onPress={() => setModalVisible(true)}
        rightComponent={
          <ThemedText style={styles.arrowText}>›</ThemedText>
        }
      />
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={[styles.modalContent]}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Select Theme</ThemedText>
              <Pressable 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <ThemedText style={styles.closeButtonText}>✕</ThemedText>
              </Pressable>
            </ThemedView>
            
            <ThemedView style={styles.themeList}>
              {themeOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => handleThemeSelect(option.id)}
                  style={({ pressed }) => [
                    styles.themeOption,
                    { borderBottomColor: borderColor },
                    pressed && styles.pressed,
                    getCurrentSelection() === option.id && styles.selectedOption
                  ]}
                >
                  <ThemedView style={styles.themeInfo}>
                    <ThemedText style={styles.themeName}>{option.label}</ThemedText>
                    <ThemedText style={styles.themeDescription}>{option.description}</ThemedText>
                  </ThemedView>
                  {getCurrentSelection() === option.id && (
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                  )}
                </Pressable>
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  arrowText: {
    fontSize: 18,
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  themeList: {
    paddingBottom: 8,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeDescription: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  selectedOption: {
    opacity: 0.8,
  },
});
