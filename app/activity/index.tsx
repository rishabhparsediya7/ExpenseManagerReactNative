import axiosInstance from "@/api/axios";
import ExpenseItem from "@/components/ExpenseItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { data } from "@/constants/MockData";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getUTCDate, getWholeWeekDates } from "@/utils/dateFormatter";
import { getWeek } from "@/utils/dateUtil";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useExpense } from "../context/ExpenseContext";
import EmptyComponent from "@/components/EmptyComponent";

export type expenseItem = {
  id: number;
  name: string;
  amount: number;
  expenseType: string;
};

const Activity = () => {
  const [email, setEmail] = useState("");
  const { expenseCount } = useExpense();
  const [selected, setSelected] = useState(
    getUTCDate(new Date().toLocaleDateString())
  );
  const [loading, setLoading] = useState(false);
  const backgroundColor = useThemeColor({ light: "", dark: "" }, "background");
  const [expenseList, setExpenseList] = useState([]);
  const navigation = useNavigation();
  const wD = getWeek();
  const [weekDates, setWeekDates] = useState(wD.weekDates);
  const [currentMonth, setCurrentMonth] = useState(wD.month);
  const currentDate = new Date().toLocaleDateString().split("/")[0];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/expense?email=${email}&date=${selected}`
      );
      if (response?.status == 200) {
        const data = response.data.data.expenseFilter;
        if (data) {
          setExpenseList(data);
        } else setExpenseList([]);
      } else {
        setExpenseList([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const selectedDate = getUTCDate(date.toLocaleDateString());
    setSelected(selectedDate);
    hideDatePicker();
  };

  useEffect(() => {
    const getValue = async (key: string) => {
      const value = await AsyncStorage.getItem(key);
      setEmail(String(value));
    };
    getValue("email");
  }, []);

  useEffect(() => {
    const wk = getWholeWeekDates(selected);
    console.log("🚀 ~ useEffect ~ wk:", wk);
    setWeekDates(wk.weekDates);
    setCurrentMonth(wk.month);
  }, [selected]);

  useEffect(() => {
    if (email) fetchData();
  }, [expenseCount, email, selected]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Expenses",
      headerBackTitleVisible: false,
    });
  }, [navigation]);
  return (
    <ThemedView style={[styles.activityContainer]}>
      <ThemedView
        style={{
          backgroundColor: "#f7f7f7",
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 16,
          rowGap: 8,
        }}
      >
        <ThemedView
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Entypo name="chevron-small-left" size={24} color="black" />
          <ThemedText>{currentMonth}</ThemedText>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </ThemedView>
        <ThemedView style={styles.calendarContainer}>
          {weekDates.length !== 0 &&
            weekDates.map((week) => (
              <ThemedView
                key={week.date}
                style={{
                  backgroundColor:
                    selected.split("T")[0].split("-")[2] ===
                    String(week.date).split("-")[0]
                      ? "orange"
                      : "#f7f7f7",
                  paddingHorizontal:
                    selected.split("T")[0].split("-")[2] ===
                    String(week.date).split("-")[0]
                      ? 10
                      : 0,
                  paddingVertical: 8,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <ThemedView
                  style={{
                    height: 4,
                    width: 4,
                    backgroundColor: "white",
                    borderRadius: 12,
                  }}
                ></ThemedView>
                <ThemedText style={{ fontSize: 12, fontWeight: "bold" }}>
                  {String(week.day).slice(0, 1)}
                </ThemedText>
                <ThemedText style={{ fontSize: 14 }}>
                  {String(week.date).split("-")[0]}
                </ThemedText>
              </ThemedView>
            ))}
        </ThemedView>
      </ThemedView>
      <Pressable onPress={showDatePicker} style={{ marginTop: 12 }}>
        <ThemedText
          style={{ alignSelf: "flex-end", color: "#0e98fb", fontSize: 16 }}
        >
          Show more dates
        </ThemedText>
      </Pressable>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.activityHeading}>
          Your Expenses
        </ThemedText>
      </ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{ backgroundColor }, styles.background]}
      >
        {loading ? (
          <ThemedView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </ThemedView>
        ) : (
          <FlashList
            data={expenseList}
            renderItem={({ item }: { item: expenseItem }) => (
              <ExpenseItem item={item} />
            )}
            estimatedItemSize={data.length}
            ListEmptyComponent={() => <EmptyComponent />}
            ItemSeparatorComponent={
              Platform.OS !== "android"
                ? ({ highlighted }) => (
                    <View
                      style={[
                        styles.separator,
                        highlighted && { marginLeft: 0 },
                      ]}
                    />
                  )
                : null
            }
          />
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() =>
          router.push(`/activity/addItemForm?selected=${selected}`)
        }
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 16 }}>
          Add Expense
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ThemedView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  background: {
    flex: 0.8,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  calendarContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  activityHeading: {
    fontSize: 32,
    marginBottom: 16,
  },
  modalButton: {
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    width: "100%",
  },
  modalInputContainer: {
    width: "100%",
    padding: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  inputLabelView: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
    alignItems: "flex-end",
  },
  sheetContent: {
    flex: 1,
  },
  separator: {
    borderWidth: 0.5,
    width: "100%",
    alignSelf: "flex-end",
    borderColor: "#cdcdcd",
  },
});
