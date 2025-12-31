import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

export default function RightArrowOptionIcon() {
  return (
    <ThemedText style={styles.arrowText}>›</ThemedText>
  );
}

const styles = StyleSheet.create({
  arrowText: {
    fontSize: 18,
    fontWeight: '300',
  },
});
