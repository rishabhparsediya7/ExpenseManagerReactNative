import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

const EmptyComponent = () => {
  return (
    <ThemedView style={styles.emptyComponentContainer}>
      <Image
        style={{ height: 100, width: 100 }}
        source={require("../assets/images/emptyScreenImage.png")}
      />
    </ThemedView>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  emptyComponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
