import { useFonts } from "expo-font";
import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (navigationRef) {
      // Hide splash screen only when navigation state is ready
      SplashScreen.hideAsync();
    }
  }, [navigationRef]);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Triodion-Regular": require("../assets/fonts/Triodion-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading fallback only for native.
    return <View />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
