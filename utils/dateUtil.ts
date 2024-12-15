import moment from "moment-timezone";
import { months } from "@/constants/Date";

export function getWeek() {
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  let date = new Date();
  const start = date.getDate() - date.getDay();
  let dateArray = [];
  for (var i = 1; i <= 7; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), start + i);
    let dateString = String(
      newDate.getDate().toString().padStart(2, "0") +
        "-" +
        (newDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        newDate.getFullYear().toString()
    );
    const dateObj = {
      day: weekdays[i - 1],
      date: dateString,
    };
    dateArray.push(dateObj);
  }
  const obj = {
    month: months[date.getMonth()],
    weekDates: dateArray,
  };
  return obj;
}

export function getWeekDatesIST() {
  const startOfWeek = moment().tz("Asia/Kolkata").startOf("isoWeek");
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.clone().add(i, "days").format("DD-MM-YYYY"));
  }

  return weekDates;
}

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getCurrentMonthDates = () => {
  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  return { firstDay, lastDay };
};

export function getWeekDatesRangeIST() {
  const startOfWeek = moment()
    .tz("Asia/Kolkata")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");

  const lastOfWeek = moment()
    .tz("Asia/Kolkata")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");

  return { startOfWeek, lastOfWeek };
}
