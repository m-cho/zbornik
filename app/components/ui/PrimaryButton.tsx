import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import Icon from "./Icon";

export type PrimaryButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconLeft?: string;
  onPress: () => void;
};

export function PrimaryButton({
  title,
  style,
  textStyle,
  iconLeft,
  onPress,
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme();
  const goldColor = Colors[colorScheme ?? "light"].secondary;
  const textOnGold = "#2A1F0A"; // warm dark brown, readable on gold in both themes

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: goldColor,
          opacity: pressed ? 0.82 : 1,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          marginHorizontal: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
    >
      {iconLeft && <Icon name={iconLeft} size={16} color={textOnGold} />}
      <ThemedText
        style={{
          color: textOnGold,
          fontSize: 16,
          fontWeight: "600",
          textAlign: "center",
          userSelect: "none",
          ...((textStyle as object) || {}),
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}
