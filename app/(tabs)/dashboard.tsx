import { WeekChart, MyLineChart, MyPieChart } from "@/components/Chart";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getWeek } from "@/utils/dateUtil";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const formatDate = (date: string) => {
  const tDates = date.split("-");
  return `${tDates[2]}-${tDates[1]}-${tDates[0]}`;
};

const Dashboard = () => {
  const [label, setLabel] = useState("week");
  const wD = getWeek();
  const [weekDates, setWeekDates] = useState(wD.weekDates);
  const selectGraph = (label: string) => {
    setLabel(label);
  };

  const labels = [
    {
      label: "week",
      component: <WeekChart />,
    },
    {
      label: "month",
      component: <MyLineChart />,
    },
    {
      label: "year",
      component: <WeekChart />,
    },
    {
      label: "day",
      component: <MyPieChart />,
    },
  ];

  const RenderedChart = labels.find((l) => l.label === label)?.component;
  return (
    <ThemedView
      style={{
        flex: 1,
        paddingVertical: 40,
      }}
    >
      <ThemedView style={{ paddingHorizontal: 4 }}>
        <FlashList
          data={labels}
          horizontal
          estimatedItemSize={80}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectGraph(item.label)}
              style={[
                styles.buttons,
                { backgroundColor: item.label === label ? "green" : "black" },
              ]}
            >
              <ThemedText style={{ color: "white" }}>{item.label}</ThemedText>
            </Pressable>
          )}
        />
      </ThemedView>
      <ThemedView
        style={{
          flex: 1,
          padding: 8,
        }}
      >
        {RenderedChart}
      </ThemedView>
    </ThemedView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "black",
    borderRadius: 28,
    paddingHorizontal: 32,
    height: 40,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
