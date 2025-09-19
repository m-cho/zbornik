import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import Icon from "./Icon";

export default function BibleSettingsButton() {
  const color = useThemeColor({}, 'text');

  return (
    <Link href="/bible-settings" style={{
      margin: 12,
    }}>
      <Icon name="cog-outline" size={24} color={color} />
    </Link>
  )
}