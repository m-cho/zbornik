import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import BackButton from '@/components/ui/BackButton';
import getHeaderSettings from '@/components/ui/HeaderSettings';
import i18n from '@/constants/i18n';
import useBox from '@/hooks/useBox';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  import('./global.web.css');
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLargeScreen } = useBox();

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
          getHeaderSettings(colorScheme, {}, { isLargeScreen })
        }
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="settings" options={{
          title: i18n.t('settings.title'),
          headerLeft: () => <BackButton />
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
