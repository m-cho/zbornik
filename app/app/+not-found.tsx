import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: i18n.t("notFound.title") }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ marginBottom: 15 }}>
          {i18n.t("notFound.title")}
        </ThemedText>
        <ThemedText>{i18n.t("notFound.description")}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText
            type="link"
            darkColor={Colors.dark.secondary}
            lightColor={Colors.light.secondary}
          >
            {i18n.t("notFound.goHome")}
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
