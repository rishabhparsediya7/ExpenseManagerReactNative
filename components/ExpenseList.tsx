import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { FlashList } from "@shopify/flash-list";
import ExpenseItem from "./ExpenseItem";
import { expenseObject } from "@/constants/types";

const ExpenseList = ({ date }: { date: string }) => {
  const [expenseList, setExpenseList] = useState<expenseObject>();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  async function fetchData() {
    try {
      const response = await fetch(
        `${BASE_URL}/api/expense?email=parsediyarishabh@gmail.com&date=${date}`
      );
      if (response.status == 200) {
        const data = await response.json();
        setExpenseList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [date]);
  return (
    <ThemedView style={{ paddingHorizontal: 4 }}>
      <FlashList
        data={expenseList}
        renderItem={({ item }: { item: expenseItem }) => (
          <ExpenseItem item={item} />
        )}
        estimatedItemSize={expenseList?.length}
      />
    </ThemedView>
  );
};

export default ExpenseList;
