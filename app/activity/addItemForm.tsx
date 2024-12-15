import axiosInstance from "@/api/axios";
import CalendarViewer from "@/components/CalendarViewer";
import { expense_type } from "@/constants/ExpenseTypes";
import { showToast } from "@/utils/showToast";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useExpense } from "../context/ExpenseContext";

const screenWidth = Dimensions.get("screen").width;
const AddItemForm = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const { addExpense, expenseCount } = useExpense();
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseType, setExpenseType] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const toast = useToast();

  const addExpenseItem = async () => {
    const email = await AsyncStorage.getItem("email");

    if (!date) {
      showToast(toast, "Date is not present", "error");
      return;
    }

    if (!Number(expenseAmount)) {
      showToast(toast, "Amount should be a number", "error");
      return;
    }

    setLoading(true);
    console.log(typeof date);
    try {
      const response = await axiosInstance.post(
        `/api/expense`,
        {
          date: date,
          name: expenseName,
          amount: expenseAmount,
          expenseType: selectedType,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status === 200) {
        showToast(toast, "Expense added successully", "success", "bottom");
        addExpense();
      } else {
        showToast(toast, "Could not add the expense", "error", "bottom");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
      setExpenseAmount(0);
      setExpenseName("");
      setExpenseType(null);
      setSelectedType("");
    }
  };
  const handleExpenseType = (type: string) => {
    if (type === "Add") {
      console.log("opening the modal");
      setSelectedType("");
      return;
    } else {
      console.log("Setting the type:", type);
      setSelectedType(type);
    }
  };

  const disabled = expenseAmount && expenseName && selectedType;

  const expenseTypes = [...expense_type, "Add"];

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
        <View style={styles.modalInputContainer}>
          {/* <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
              marginTop: 20,
            }}
          >
            <TypeWriter
              textArray={"What are you adding up today?"}
              textStyle={{ color: "black", fontSize: 24 }}
              loop={false}
            />
          </View> */}
          <CalendarViewer setDate={setDate} />
          <View style={styles.inputLabelView}>
            <Text style={styles.label}>Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Expense"
              value={expenseName}
              onChangeText={setExpenseName}
            />
          </View>
          <View style={styles.inputLabelView}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Amount"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
            />
          </View>
          <View style={styles.inputLabelView}>
            <Text style={styles.label}>In what way you spent</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
              {expenseTypes.map((type) => (
                <TouchableOpacity
                  onPress={() => handleExpenseType(type)}
                  key={type}
                  style={{
                    flexDirection: "row",
                    width: (screenWidth - 40) / 3,
                    backgroundColor:
                      selectedType === type ? "#8bcaad" : "#eeecec",
                    borderRadius: 8,
                    height: 48,
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: selectedType === type ? "#1d5e3f" : "#c9c9c9",
                  }}
                >
                  {type === "Add" && (
                    <Entypo
                      name="plus"
                      color={selectedType == type ? "#fff" : "#121212"}
                      size={20}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text
                    style={{
                      color: selectedType == type ? "#fff" : "#121212",
                      fontSize: 14,
                    }}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            disabled={!disabled}
            style={[
              styles.submitButton,
              { backgroundColor: !disabled ? "#484848" : "#060606" },
            ]}
            onPress={addExpenseItem}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontSize: 16,
              }}
            >
              {loading ? <ActivityIndicator /> : "Add Expense"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddItemForm;

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
    marginTop: 56,
    paddingHorizontal: 12,
    paddingVertical: 16,
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
    borderRadius: 8,
  },
  inputLabelView: {
    width: "100%",
  },
  submitButton: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: "flex-end",
  },
  sheetContent: {
    flex: 1,
  },
});
