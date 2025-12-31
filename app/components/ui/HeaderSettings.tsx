import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";

type ScreenOptions = {
  isLargeScreen: boolean;
}

export default function getHeaderSettings(colorScheme: ColorSchemeName, options: Record<string, any>, screenOptions: ScreenOptions): any {
  const { isLargeScreen } = screenOptions;
  
  return {
    headerShown: true,
    headerTitleAlign: isLargeScreen ? "center" : "left",
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