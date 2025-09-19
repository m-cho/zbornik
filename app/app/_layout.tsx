import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import BackButton from '@/components/ui/BackButton';
import getHeaderSettings from '@/components/ui/HeaderSettings';
import i18n from '@/constants/i18n';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  import('./global.web.css');
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Triodion-Regular': require('../assets/fonts/Triodion-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={
          getHeaderSettings(colorScheme, {})
        }
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="bible-settings" options={{
          presentation: 'modal',
          title: i18n.t('bibleSettings.title'),
          headerLeft: () => <BackButton />
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
