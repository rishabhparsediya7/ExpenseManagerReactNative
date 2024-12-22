import axiosInstance from "@/api/axios";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getCurrentMonthDates, getWeekDatesRangeIST } from "@/utils/dateUtil";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import moment from "moment-timezone";
import { useCallback, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const { firstDay, lastDay } = getCurrentMonthDates();
  const { startOfWeek, lastOfWeek } = getWeekDatesRangeIST();
  const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const nextDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");

  const [spendings, setSpendings] = useState(null);

  const dateRanges = [
    { startDate: firstDay, endDate: lastDay },
    {
      startDate: startOfWeek,
      endDate: lastOfWeek,
    },
    {
      startDate: currentDate,
      endDate: nextDate,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const email = await AsyncStorage.getItem("email");
        try {
          setLoading(true);
          const response = await axiosInstance.get(
            `/api/expense/totalSpends?email=${email}&dateRanges=${encodeURIComponent(
              JSON.stringify(dateRanges)
            )}`
          );
          if (response?.status === 200) {
            const data = response?.data?.totals;
            console.log("🚀 ~ fetchData ~ data:", data);
            setSpendings(data);
          } else {
            console.log("....");
          }
        } catch (error) {
          console.log("🚀 ~ fetchData ~ error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        console.log("Screen lost focus, cleanup here if needed");
      };
    }, [])
  );

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      >
        <ThemedView
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        ></ThemedView>
        <ThemedView
          style={{
            flex: 1,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../assets/images/bghome.jpg")}
            style={styles.image}
          />
        </ThemedView>
        <ThemedView
          style={{
            justifyContent: "center",
            alignItems: "center",
            rowGap: 12,
          }}
        >
          <ThemedText style={{ fontWeight: "200" }}>
            This month spend
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 32,
              padding: 8,
              fontWeight: "800",
            }}
          >
            Rs. {spendings?.range_1}
          </ThemedText>
        </ThemedView>
        {/* Container that show all spendings */}
        <ThemedView style={{ flex: 1 }}>
          <ThemedView style={styles.boxContainer}>
            <ThemedView style={[styles.box, { backgroundColor: "#a2d2ff" }]}>
              <ThemedText style={styles.boxtext}>Monthly</ThemedText>
              <ThemedText style={styles.boxNumber}>
                Rs. {spendings?.range_1}
              </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.box, { backgroundColor: "#ffc8dd" }]}>
              <ThemedText style={styles.boxtext}>Daily</ThemedText>
              <ThemedText style={styles.boxNumber}>
                Rs. {spendings?.range_3}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.boxContainer}>
            <ThemedView style={[styles.box, { backgroundColor: "#dda15e" }]}>
              <ThemedText style={styles.boxtext}>Weekly</ThemedText>
              <ThemedText style={styles.boxNumber}>
                Rs. {spendings?.range_2}
              </ThemedText>
            </ThemedView>
            <ThemedView style={[styles.box, { backgroundColor: "#669bbc" }]}>
              <ThemedText style={styles.boxtext}>Maximum</ThemedText>
              <ThemedText style={styles.boxNumber}>Rs. 200</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        {/* buttons to show and add  */}
        <ThemedView
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 4,
          }}
        >
          <ThemedView style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#242424",
                borderRadius: 12,
                borderTopRightRadius: 20,
                padding: 14,
                alignItems: "center",
                width: 320,
              }}
              onPress={() => router.push("/activity")}
            >
              <ThemedText style={{ color: "#ffffff", letterSpacing: 1 }}>
                Show all expenses
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
          <TouchableOpacity
            style={{
              backgroundColor: "#242424",
              borderRadius: 50,
              width: 56,
              height: 56,
              borderWidth: 5,
              borderColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -3,
            }}
            onPress={() => router.push(`/activity/addItemForm`)}
          >
            <Entypo name="plus" size={26} color={"#ffffff"} />
          </TouchableOpacity>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  headingContainer: {
    backgroundColor: "transparent",
    rowGap: 8,
    marginTop: 90,
    marginRight: 20,
  },
  boxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    gap: 8,
    marginBottom: 8,
  },
  box: {
    flex: 0.5,
    backgroundColor: "#efefef",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  boxtext: {
    color: "#242424",
    fontSize: 18,
  },
  boxNumber: {
    fontSize: 20,
  },
});
