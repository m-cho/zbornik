import useBox from "@/hooks/useBox";
import { ThemedView } from "./ThemedView";

export default function ThemedContainer({ children }: { children: React.ReactNode }) {
  const { containerMaxWidth } = useBox();
  return (
    <ThemedView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <ThemedView style={{ flex: 1, maxWidth: containerMaxWidth }}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}