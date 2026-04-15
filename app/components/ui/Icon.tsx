import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

export default function Icon({ name, size, color }: IconProps) {
  return (
    {
      home: <Ionicons name="home" size={size} color={color} />,
      "cog-outline": (
        <Ionicons name="settings-outline" size={size} color={color} />
      ),
      "arrow-back": <Ionicons name="arrow-back" size={size} color={color} />,

      "book-bible": (
        <FontAwesome6 name="book-bible" size={size} color={color} />
      ),
      "book-open-page-variant": (
        <MaterialIcons
          name="book-open-page-variant"
          size={size}
          color={color}
        />
      ),
      calendar: <Ionicons name="calendar-outline" size={size} color={color} />,
      offline: (
        <Ionicons name="cloud-offline-outline" size={size} color={color} />
      ),

      version: <MaterialIcons name="update" size={size} color={color} />,
      license: <MaterialIcons name="license" size={size} color={color} />,
      privacy: (
        <MaterialIcons
          name="shield-account-outline"
          size={size}
          color={color}
        />
      ),
      terms: (
        <MaterialIcons
          name="file-document-check-outline"
          size={size}
          color={color}
        />
      ),
      "source-code": (
        <MaterialIcons name="code-braces" size={size} color={color} />
      ),
      "bug-report": (
        <MaterialIcons name="bug-outline" size={size} color={color} />
      ),
      menu: <MaterialIcons name="menu" size={size} color={color} />,
      candle: <MaterialIcons name="candle" size={size} color={color} />,
      "chevron-right": (
        <MaterialIcons name="chevron-right" size={size} color={color} />
      ),
      "hand-heart": (
        <MaterialIcons name="hand-heart" size={size} color={color} />
      ),
      charity: <MaterialIcons name="charity" size={size} color={color} />,
      info: (
        <MaterialIcons name="information-variant" size={size} color={color} />
      ),
      church: <MaterialIcons name="church" size={size} color={color} />,
      media: <MaterialIcons name="podcast" size={size} color={color} />,
      "dependency-licenses": (
        <MaterialIcons
          name="bookmark-multiple-outline"
          size={size}
          color={color}
        />
      ),

      "sunny-outline": (
        <Ionicons name="sunny-outline" size={size} color={color} />
      ),
      "moon-outline": (
        <Ionicons name="moon-outline" size={size} color={color} />
      ),
      moon: <Ionicons name="moon" size={size} color={color} />,

      heart: <Ionicons name="heart" size={size} color={color} />,
    }[name] ?? <MaterialIcons name="help-circle" size={size} color={color} />
  );
}
