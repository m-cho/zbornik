import { Redirect } from "expo-router";

export default function TabEntry() {
  // Required for static build
  return <Redirect href="/app/(tabs)/home" />;
}
