import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';
import { Platform, useWindowDimensions } from "react-native";

export default function useBox() {
  const { width: screenWidth } = useWindowDimensions();

  const isLargeScreen = screenWidth >= 768; // tablet/desktop breakpoint

  const githubRepoBaseUrl = 'https://github.com/m-cho/zbornik';

  const appVersion = '1.0.0';

  const containerMaxWidth = useMemo(() => {
    if (screenWidth > 1200) {
      return 900;
    } else if (screenWidth >= 700) {
      return 640;
    }
    return undefined;
  }, [screenWidth]);

  const openWebPage = async (url: string) => {
    console.log('Opening URL:', url);

    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      await WebBrowser.openBrowserAsync(url);
    }
  }

  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return {
    isLargeScreen,
    containerMaxWidth,
    githubRepoBaseUrl,
    appVersion,
    openWebPage,
    shuffle,
  }
}