import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions } from "react-native";

export default function getHeaderSettings(colorScheme: ColorSchemeName, options: Record<string, any>): any {
  const screenWidth = Dimensions.get('window').width;
  const isLargeScreen = screenWidth >= 768; // tablet/desktop breakpoint
  
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