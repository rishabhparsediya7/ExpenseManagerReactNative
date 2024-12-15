import {
  Button,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";

export function CallToAction({
  primaryLabel,
  primaryAction,
  secondaryLabel,
  secondaryAction,
}: {
  primaryLabel: string;
  secondaryLabel?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
}) {

  const theme = useColorScheme();
  return (
    <ThemedView style={styles.ctaContainer}>
      {secondaryLabel && secondaryAction && (
        <ThemedTouchableOpacity
          style={[
            {
              borderColor: theme === "light" ? "white" : "black",
              backgroundColor: theme === "light" ? "black" : "white",
            },
            styles.secondaryContainer,
          ]}
          onPress={secondaryAction}
        >
          <ThemedText style={{ color: theme === "light" ? "white" : "black" }}>
            {secondaryLabel}
          </ThemedText>
        </ThemedTouchableOpacity>
      )}
      <ThemedTouchableOpacity
        style={[
          {
            borderColor: theme === "light" ? "black" : "white",
            backgroundColor: theme === "light" ? "white" : "black",
          },
          styles.primaryContainer,
        ]}
        onPress={primaryAction}
      >
        <ThemedText
          style={{
            color: theme === "light" ? "black" : "white",
          }}
        >
          {primaryLabel}
        </ThemedText>
      </ThemedTouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ctaContainer: {
    flex: 1,
    borderColor: "white",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
  },
  secondaryContainer: {},
  primaryContainer: {
    borderWidth: 1,
  },
});
