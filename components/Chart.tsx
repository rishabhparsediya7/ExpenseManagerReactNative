import axiosInstance from "@/api/axios";
import { prepareData } from "@/utils/dataPrepare";
import { getCurrentMonthDates, getWeek } from "@/utils/dateUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const formatDate = (date: string) => {
  const tDates = date.split("-");
  return `${tDates[2]}-${tDates[1]}-${tDates[0]}`;
};

export const prepareDataGraph = (labels: string[], dataset: number[]) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataset,
      },
    ],
  };
  return data;
};

const chartConfig = {
  backgroundColor: "#efebe8",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `#242424`,
  labelColor: (opacity = 1) => `#242424`,
  fillShadowGradient: "skyblue",
  fillShadowGradientOpacity: 1,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#eae8e6",
  },
};

export const WeekChart = () => {
  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const [graphData, setGraphData] = useState<number[]>([]);
  const lastDay = moment().endOf("isoWeek").format("YYYY-MM-DD");
  const firstDay = moment().startOf("isoWeek").format("YYYY-MM-DD");
  console.log("🚀 ~ WeekChart ~ firstDay:", firstDay);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const email = await AsyncStorage.getItem("email");
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/expense/graph?email=${email}&sDate=${firstDay}&eDate=${lastDay}`
      );
      if (response?.status === 200) {
        const data = response.data.data;
        const result = await prepareData(data, "week", lastDay);
        setGraphData(result);
      } else {
        console.log("....");
      }
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (graphData.length == 0) fetchData();
  }, [graphData.length]);

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: 200,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      {graphData.length > 0 && (
        <BarChart
          data={prepareDataGraph(weekdays, graphData)}
          withInnerLines={false}
          fromZero={true}
          width={screenWidth - 20}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
        />
      )}
    </View>
  );
};

export const MyLineChart = () => {
  const { firstDay, lastDay } = getCurrentMonthDates();
  const [graphData, setGraphData] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const monthArray = Array.from(
    {
      length: Number(lastDay.split("-")[2]),
    },
    (_, i) => String(i + 1).padStart(2, "0")
  );
  const fetchData = async () => {
    const email = await AsyncStorage.getItem("email");
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/expense/graph?email=${email}&sDate=${firstDay}&eDate=${lastDay}`
      );
      if (response?.status === 200) {
        const data = response.data.data;
        console.log("🚀 ~ fetchData ~ data:", data);
        const result = await prepareData(data, "month", lastDay);
        console.log("🚀 ~ fetchData ~ result:", result);
        setGraphData(result);
      } else {
        console.log("....");
      }
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      Array.from({ length: 30 }, (_, i) => i + 1).filter((m) => m % 4 === 0)
    );
    fetchData();
  }, []);
  return (
    <View>
      {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: 200,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      {graphData.length > 0 && (
        <LineChart
          data={prepareDataGraph(monthArray, graphData)}
          withInnerLines={false}
          fromZero={true}
          width={screenWidth - 20}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={5}
          hidePointsAtIndex={Array.from({ length: 30 }, (_, i) => i + 1).filter(
            (m) => m % 4 !== 0
          )}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
          bezier
          onDataPointClick={(e) => console.log(e)}
        />
      )}
    </View>
  );
};

export const MyPieChart = () => {
  const { firstDay, lastDay } = getCurrentMonthDates();
  const [graphData, setGraphData] = useState<
    { name: string; amount: number }[]
  >([]);
  const fetchData = async () => {
    const email = await AsyncStorage.getItem("email");
    try {
      const response = await axiosInstance.get(
        `/api/expense/pie-chart?email=${email}&sDate=${firstDay}&eDate=${lastDay}`
      );
      if (response?.status === 200) {
        const data = response.data.data;
        const pieData = data.map((d, index) => {
          return {
            name: d.expenseType,
            amount: Number(d.totalAmount),
          };
        });
        setGraphData(pieData);
      } else {
        console.log("....");
      }
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PieChart
      data={graphData}
      width={screenWidth}
      height={280}
      chartConfig={chartConfig}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[8, 8]}
      absolute
    />
  );
};

export const YearChart = () => {
  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const [graphData, setGraphData] = useState<number[]>([]);
  const wD = getWeek();
  const weekDates = wD.weekDates;
  var sDate: string, eDate: string;

  sDate = formatDate(weekDates[0].date);
  eDate = formatDate(weekDates[weekDates.length - 1].date);

  const fetchData = async () => {
    const email = await AsyncStorage.getItem("email");
    try {
      const response = await axiosInstance.get(
        `/api/expense/graph?email=${email}&sDate=${sDate}&eDate=${eDate}`
      );
      if (response?.status === 200) {
        const data = response.data.data;
        const expense = data[0].expenses;
        console.log("🚀 ~ fetchData ~ expense:", expense);
        console.log(eDate);
        const result = await prepareData(expense, "week", eDate);
        console.log("🚀 ~ fetchData ~ result:", result);
        setGraphData(result);
      } else {
        console.log("....");
      }
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
    } finally {
      console.log("finally");
      console.log(graphData.length);
    }
  };

  useEffect(() => {
    if (graphData.length == 0) fetchData();
  }, [graphData.length]);

  return (
    <View>
      {graphData.length > 0 && (
        <BarChart
          data={prepareDataGraph(weekdays, graphData)}
          withInnerLines={false}
          fromZero={true}
          width={screenWidth - 20}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 12,
          }}
        />
      )}
    </View>
  );
};
