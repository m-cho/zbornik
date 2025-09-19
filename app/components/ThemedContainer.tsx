import { ThemedView } from "./ThemedView";

export default function ThemedContainer({ children }: { children: React.ReactNode }) {
  return (
    <ThemedView style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <ThemedView style={{ flex: 1, maxWidth: 640 }}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}