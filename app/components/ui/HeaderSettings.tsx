import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";

export default function getHeaderSettings(colorScheme: ColorSchemeName, options: Record<string, any>): any {
  return {
    headerShown: true,
    headerTitleAlign: "left",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    headerTintColor: Colors[colorScheme ?? 'light'].text,
    headerBackVisible: false,
    ...options,
  };
};