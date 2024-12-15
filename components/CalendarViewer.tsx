import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemedText } from "./ThemedText";
import { Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getUTCDate, getWholeWeekDates } from "@/utils/dateFormatter";
import { getWeek } from "@/utils/dateUtil";

const CalendarViewer = ({
  setDate,
}: {
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selected, setSelected] = useState(
    getUTCDate(new Date().toLocaleDateString())
  );
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date: Date) => {
    const selectedDate = getUTCDate(date.toLocaleDateString());
    setSelected(selectedDate);
    setDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const wD = getWeek();
  const [weekDates, setWeekDates] = useState(wD.weekDates);
  const [currentMonth, setCurrentMonth] = useState(wD.month);
  const currentDate = new Date().toLocaleDateString().split("/")[0];

  useEffect(() => {
    const wk = getWholeWeekDates(selected);
    setWeekDates(wk.weekDates);
  }, [selected]);

  return (
    <ThemedView>
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});

export default CalendarViewer;
