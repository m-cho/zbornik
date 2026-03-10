import { Animated, ScrollView, type ScrollViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedScrollViewProps = ScrollViewProps & {
  animated?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({ animated, style, lightColor, darkColor, ...otherProps }: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const allProps = { style: [{ backgroundColor }, style], ...otherProps };

  if (animated) {
    return <Animated.ScrollView {...allProps} />;
  }

  return <ScrollView {...allProps} />;
}
