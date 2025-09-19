import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, useNavigation, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import Icon from "./Icon";

export default function BackButton({ href }: { href?: Href }) {
  const router = useRouter();
  const navigation = useNavigation();
  const color = useThemeColor({}, 'text');

  // Extract parameters from the current navigation state
  const getCurrentParams = () => {
    const state = navigation.getState();
    const currentRoute = state?.routes[state.index];
    return currentRoute?.params || {};
  };

  const canUseBrowserBack = () => {
    if (Platform.OS !== 'web') return false;
    
    // Check if we have browser history
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      return true;
    }
    
    return false;
  };

  const onPress = () => {
    if (!href) {
      if (canUseBrowserBack()) {
        window.history.back();
        return;
      }

      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      } 

      return;
    }

    const params = getCurrentParams();

    let parsedHref = href as string;
    
    Object.entries(params).forEach(([key, value]) => {
      parsedHref = parsedHref.replaceAll(`[${key}]`, value as string);
    });

    if (parsedHref.endsWith('/index')) {
      parsedHref = parsedHref.slice(0, -'/index'.length);
    }

    if (parsedHref.includes('[') && parsedHref.includes(']')) {
      navigation.goBack();
      return;
    }
    router.navigate(parsedHref as Href);
  };

  return (
    <Pressable onPress={onPress} style={{ margin: 12 }}>
      <Icon name="arrow-back" size={24} color={color} />
    </Pressable>
  );
}