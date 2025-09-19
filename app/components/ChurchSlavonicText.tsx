import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, TextProps } from 'react-native';

export type ChurchSlavonicTextProps = TextProps & {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
};

export function ChurchSlavonicText({ style, children, lightColor, darkColor, ...props }: ChurchSlavonicTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  const churchSlavonicStyle = {
    color,
    // Use the properly loaded Triodion font for Church Slavonic characters
    fontFamily: 'Triodion-Regular',
    fontSize: 18,
    lineHeight: 26,
    // Add letter spacing for better readability of Church Slavonic text
    letterSpacing: 0.3,
  };

  return (
    <Text style={[churchSlavonicStyle, style]} {...props}>
      {children}
    </Text>
  );
}
