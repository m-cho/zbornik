import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Bibles } from "@/constants/Bibles";
import i18n from "@/constants/i18n";
import { useBible } from "@/hooks/useBible";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import SettingsOption from "./SettingsOption";

interface BibleSelectorProps {
  onBibleChange?: (bibleId: string) => void;
}

export default function BibleSelector({ onBibleChange }: BibleSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const { bibleId, getBible } = useBible();

  const handleBibleSelect = async (bibleId: keyof typeof Bibles) => {
    setLoading(true);
    try {
      await getBible(bibleId);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving bible selection:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedBible = Bibles[bibleId as keyof typeof Bibles];

  return (
    <>
      <SettingsOption
        title={i18n.t("settings.bibleTranslation")}
        description={selectedBible?.name || i18n.t("settings.selectBible")}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={[styles.modalContent, { backgroundColor, borderColor }]}
          >
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                {i18n.t("settings.selectBible")}
              </ThemedText>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                disabled={loading}
              >
                <ThemedText style={styles.closeButtonText}>✕</ThemedText>
              </Pressable>
            </ThemedView>

            <ScrollView
              style={styles.bibleList}
              contentContainerStyle={{ paddingBottom: 16 }}
            >
              {Object.entries(Bibles).map(([id, bible]) => (
                <Pressable
                  key={id}
                  onPress={() => handleBibleSelect(id as keyof typeof Bibles)}
                  style={({ pressed }) => [
                    styles.bibleOption,
                    { borderBottomColor: borderColor },
                    pressed && styles.pressed,
                    bibleId === id && styles.selectedOption,
                  ]}
                  disabled={loading}
                >
                  <ThemedView style={styles.bibleInfo}>
                    <ThemedText style={styles.bibleName}>
                      {bible.name}
                    </ThemedText>
                    <ThemedText style={styles.bibleDescription}>
                      {bible.description}
                    </ThemedText>
                  </ThemedView>
                  {bibleId === id && (
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    maxHeight: "80%",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  bibleList: {
    maxHeight: 400,
  },
  bibleOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bibleInfo: {
    flex: 1,
  },
  bibleName: {
    fontSize: 16,
    fontWeight: "500",
  },
  bibleDescription: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  selectedOption: {
    opacity: 0.8,
  },
});
