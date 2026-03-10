import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type ChipProps = {
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "neutral";
  leading?: React.ReactNode; // optional leading content (icon)
};

export function Chip({
  label,
  style,
  textStyle,
  variant = "primary",
  leading,
}: ChipProps) {
  const borderColor =
    variant === "primary" ? Colors.light.primary : Colors.light.border;
  const borderColorDark =
    variant === "primary" ? Colors.dark.primary : Colors.dark.border;
  const defaultTextColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text",
  );
  const themedPrimaryText = useThemeColor(
    { light: Colors.light.secondary, dark: Colors.dark.secondary },
    "text",
  );
  // Subtle tint based on gold secondary color with low opacity for better contrast
  const tintBg = useThemeColor(
    { light: "rgba(196, 146, 74, 0.12)", dark: "rgba(196, 146, 74, 0.15)" },
    "background",
  );
  const neutralTintBg = useThemeColor(
    { light: "rgba(0,0,0,0.05)", dark: "rgba(255,255,255,0.05)" },
    "background",
  );

  return (
    <View
      style={[
        styles.base,
        {
          borderColor: useThemeColor(
            { light: borderColor, dark: borderColorDark },
            "border",
          ),
          backgroundColor: variant === "primary" ? tintBg : neutralTintBg,
        },
        style,
      ]}
    >
      {leading && <View style={styles.leading}>{leading}</View>}
      <Text
        style={[
          styles.text,
          {
            color: variant === "primary" ? themedPrimaryText : defaultTextColor,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    borderWidth: 1,
    maxWidth: 520,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 11.5,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  leading: {
    marginLeft: 2,
  },
});
