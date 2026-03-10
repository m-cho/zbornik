import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import getHeaderSettings from "@/components/ui/HeaderSettings";
import Icon from "@/components/ui/Icon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLargeScreen } = useBox();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].secondary,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].backgroundLight,
          borderTopColor: Colors[colorScheme ?? "light"].border,
          borderTopWidth: 1,
        },
        tabBarPosition: isLargeScreen ? "left" : "bottom",
        tabBarVariant: isLargeScreen ? "material" : "uikit",
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...getHeaderSettings(colorScheme, {}, { isLargeScreen }),
          title: i18n.t("home.title"),
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="home" color={color} />
          ),
          headerShown: true,
          headerTitle: i18n.t("home.headerTitle"),
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: i18n.t("bibleReader.title"),
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="book-bible" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer-book"
        options={{
          title: i18n.t("prayerBook.title"),
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="candle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charity"
        options={{
          title: i18n.t("charity.title"),
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="hand-heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: i18n.t("more.title"),
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="menu" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
