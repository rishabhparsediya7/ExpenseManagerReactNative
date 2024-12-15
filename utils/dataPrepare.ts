import { getWeekDatesIST } from "./dateUtil";

export const prepareData = async (
  data: [],
  label: string,
  endDate?: string
) => {
  const weekDates = getWeekDatesIST();
  let index = 0;
  const resultData: number[] = [];

  if (label == "week") {
    const result: number[] = [];
    weekDates.map((weekDate) => {
      const sum = data.reduce((acc, s) => {
        const date = s?.date?.split("T")[0].split("-").reverse().join("-");
        if (date == weekDate) {
          return acc + Number(s?.totalAmount);
        }
        return acc;
      }, 0);
      result.push(sum);
    });
    return result;
  }
  if (label == "month") {
    const monthArray = Array.from(
      { length: Number(endDate?.split("-")[2]) },
      (_, i) => String(i + 1).padStart(2, "0")
    );
    monthArray.forEach((date) => {
      const dateExist = data.some((d) => d.date.split("-")[2] === date);
      if (dateExist) {
        resultData.push(data[index]?.totalAmount);
        index++;
      } else {
        resultData.push(0);
      }
    });
  }
  return resultData;
};
