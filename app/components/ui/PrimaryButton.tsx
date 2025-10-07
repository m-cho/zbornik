import { Colors } from "@/constants/Colors";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

export type PrimaryButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export function PrimaryButton({
  title,
  style,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[{
        backgroundColor: '#578b57',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 0,
      }, style]}
    >
      <ThemedText
        style={{
          color: Colors.light.backgroundLight,
          fontSize: 16,
          fontWeight: '500',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}