import Icon from '@/components/ui/Icon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { Pressable } from "react-native";

export default function SettingsHeaderButton() {
  const router = useRouter();
  const color = useThemeColor({}, 'text');

  const onPress = () => {
    router.navigate('/settings');
  };

  return (
    <Pressable style={{ margin: 12 }} onPress={onPress}>
      <Icon name="cog-outline" size={24} color={color} />
    </Pressable>
  );
}