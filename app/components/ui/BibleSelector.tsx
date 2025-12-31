import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Bibles } from "@/constants/Bibles";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";

interface BibleSelectorProps {
  onBibleChange?: (bibleId: string) => void;
}

export default function BibleSelector({ onBibleChange }: BibleSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  const { bibleId, getBible } = useBible();

  const handleBibleSelect = async (bibleId: keyof typeof Bibles) => {
    try {
      await getBible(bibleId)
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving bible selection:', error);
    }
  };

  const selectedBible = Bibles[bibleId as keyof typeof Bibles];

  return (
    <>
      <SettingsOption
        title={i18n.t('settings.bibleTranslation')}
        description={selectedBible?.name || i18n.t('settings.selectBible')}
        onPress={() => setModalVisible(true)}
      />
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={[styles.modalContent, { backgroundColor, borderColor }]}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                {i18n.t('settings.selectBible')}
              </ThemedText>
              <Pressable 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <ThemedText style={styles.closeButtonText}>✕</ThemedText>
              </Pressable>
            </ThemedView>
            
            <ThemedView style={styles.bibleList}>
              {Object.entries(Bibles).map(([id, bible]) => (
                <Pressable
                  key={id}
                  onPress={() => handleBibleSelect(id as keyof typeof Bibles)}
                  style={({ pressed }) => [
                    styles.bibleOption,
                    { borderBottomColor: borderColor },
                    pressed && styles.pressed,
                    bibleId === id && styles.selectedOption
                  ]}
                >
                  <ThemedView style={styles.bibleInfo}>
                    <ThemedText style={styles.bibleName}>{bible.name}</ThemedText>
                    <ThemedText style={styles.bibleDescription}>{bible.description}</ThemedText>
                  </ThemedView>
                  {bibleId === id && (
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
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
  bibleList: {
    maxHeight: 400,
  },
  bibleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bibleInfo: {
    flex: 1,
  },
  bibleName: {
    fontSize: 16,
    fontWeight: '500',
  },
  bibleDescription: {
    fontSize: 14,
    marginTop: 4,
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
