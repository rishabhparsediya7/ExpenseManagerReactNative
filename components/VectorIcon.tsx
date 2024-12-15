import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

const expenseTypeIcons = {
  Food: <FontAwesome name="cutlery" size={24} color="white" />,
  Travel: <FontAwesome name="plane" size={24} color="white" />,
  Entertainment: (
    <Ionicons name="game-controller-outline" size={24} color="white" />
  ),
  Utilities: <FontAwesome5 name="swatchbook" size={24} color="white" />,
  Other: <Ionicons name="bulb-outline" size={24} color="white" />,
};

type ExpenseType = keyof typeof expenseTypeIcons;

const VectorIcon = ({ expenseType }: { expenseType: ExpenseType }) => {
  const imageSource = expenseTypeIcons[expenseType];
  return <ThemedView style={styles.container}>{imageSource}</ThemedView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default VectorIcon;
