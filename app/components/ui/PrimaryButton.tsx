import { Colors } from "@/constants/Colors";
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
  return (
    <Pressable
      onPress={onPress}
      style={[{
        backgroundColor: '#578b57',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }, style]}
    >
      {iconLeft && <Icon name={iconLeft} size={16} color={Colors.light.backgroundLight} />}
      <ThemedText
        style={{
          color: Colors.light.backgroundLight,
          fontSize: 16,
          fontWeight: '500',
          textAlign: 'center',
          userSelect: 'none',
          ...((textStyle as object) || {}),
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}