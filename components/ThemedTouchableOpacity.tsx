import {
  Text,
  type TextProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export type ThemedThemedTouchableOpacityProps = TextProps & {
  themeProps?: { light?: string; dark?: string };
};

export function ThemedTouchableOpacity({
  style,
  ...rest
}: ThemedThemedTouchableOpacityProps) {
  return <TouchableOpacity style={[styles.sizing, style]} {...rest} />;
}

const styles = StyleSheet.create({
  sizing: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
