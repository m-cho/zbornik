import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "react-native";

export type ThemedSearchInputProps = TextInputProps & {
  lightBackgroundColor?: string,
  darkBackgroundColor?: string,

  lightBorderColor?: string,
  darkBorderColor?: string,

  lightTextColor?: string,
  darkTextColor?: string,
}

export function ThemedSearchInput({
  style,

  lightBackgroundColor,
  darkBackgroundColor,

  lightBorderColor,
  darkBorderColor,

  lightTextColor,
  darkTextColor,
  ...otherProps
}: ThemedSearchInputProps) {
  const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'border');
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'text');

  return (
    <TextInput
      style={[{
        backgroundColor,
        color: textColor,
        borderWidth: 1,
        borderColor,
        borderStyle: 'solid',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }, style]}
      placeholderTextColor={textColor + '88'}
      {...otherProps}
    />
  );
}