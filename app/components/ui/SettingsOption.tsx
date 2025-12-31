import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import RightArrowOptionIcon from "./RightArrowOptionIcon";

interface SettingsOptionProps {
  title: string;
  leftIcon?: string;
  description?: string;
  onPress?: () => void;
  rightComponent?: ReactNode | 'none';
  disabled?: boolean;
}

export default function SettingsOption({ 
  title,
  leftIcon,
  description, 
  onPress, 
  rightComponent, 
  disabled = false 
}: SettingsOptionProps) {
  const borderColor = useThemeColor({}, 'border');
  const disabledColor = useThemeColor({}, 'textSecondary');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        { borderBottomColor: borderColor },
        pressed && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      <ThemedView style={styles.content}>
        {leftIcon && (
          <ThemedView style={{ marginRight: 10, marginTop: 2 }}>
            <Icon name={leftIcon} size={20} color={iconColor} />
          </ThemedView>
        )}
        <ThemedView style={styles.textContainer}>
          <ThemedText 
            style={[
              styles.title,
              disabled && { color: disabledColor }
            ]}
          >
            {title}
          </ThemedText>
          {description && (
            <ThemedText 
              style={[
                styles.description,
                disabled && { color: disabledColor }
              ]}
            >
              {description}
            </ThemedText>
          )}
        </ThemedView>
        {rightComponent === 'none' ? null : rightComponent ? (
          <ThemedView style={styles.rightContainer}>
            {rightComponent}
          </ThemedView>
        ) : (
          <ThemedView style={styles.rightContainer}>
            <RightArrowOptionIcon />
          </ThemedView>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 60,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7,
  },
  rightContainer: {
    marginLeft: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
});
