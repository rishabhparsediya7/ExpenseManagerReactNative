import { StyleSheet, View } from "react-native";
import ItemInRupee from "./ItemInRupee";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import VectorIcon from "./VectorIcon";

const ExpenseItem = ({ item }: { item: expenseItem }) => {
  return (
    <ThemedView style={styles.row}>
      <View style={styles.icon}>
        <VectorIcon expenseType={item.expenseType} />
      </View>
      <View style={styles.expenseCol}>
        <ThemedText numberOfLines={2} style={styles.expenseName}>
          {item.name}
        </ThemedText>
        <View style={styles.expenseAmntCont}>
          <ItemInRupee amount={item.amount} />
        </View>
      </View>
    </ThemedView>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  row: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  icon: { flex: 0.2 },
  expenseCol: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  expenseName: {
    flex: 0.7,
    fontSize: 16,
  },
  expenseAmntCont: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 10,
  },
});
