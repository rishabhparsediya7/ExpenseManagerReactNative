import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ItemInRupee = ({ amount }: { amount: number }) => {
  return (
    <View style={styles.expenseAmountContainer}>
      <View style={{ flex: 1 }}></View>
      <FontAwesome name="rupee" size={18} color="#529661" />
      <Text style={styles.expenseAmount}>{amount}</Text>
    </View>
  );
};

export default ItemInRupee;

const styles = StyleSheet.create({
  expenseAmount: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  expenseAmountContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    columnGap: 2,
  },
});
