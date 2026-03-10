import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, LinkProps } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import Icon from "./ui/Icon";

export type PrayersGroupProps = {
  title: string;
  items: { label: string; href: LinkProps['href'] }[];
};

export default function PrayersGroup({ title, items }: PrayersGroupProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  return (
    <ThemedView
      lightColor={Colors.light.backgroundLight}
      darkColor={Colors.dark.backgroundLight}
      style={{ padding: 20, borderRadius: 20, width: '90%', marginBottom: 24 }}
    >
      <ThemedText
        style={{ fontWeight: '600', fontSize: 16, marginBottom: 8 }}
        lightColor={Colors.light.textSecondary}
        darkColor={Colors.dark.textSecondary}
      >
        {title}
      </ThemedText>

      {items.map((item, index) => (
        <Link key={item.label} href={item.href} style={{ display: 'flex', flex: 1, paddingVertical: 8, marginBottom: index === items.length - 1 ? 0 : 8 }} asChild>
          <View>
            <ThemedText
              style={{ fontWeight: '500', fontSize: 16, paddingRight: 24 }}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              {item.label}
            </ThemedText>
            <View style={{ position: 'absolute', right: -8, top: 10 }}>
              <Icon name="chevron-right" size={24} color={textColor} />
            </View>
          </View>
        </Link>
      ))}
    </ThemedView>
  );
}