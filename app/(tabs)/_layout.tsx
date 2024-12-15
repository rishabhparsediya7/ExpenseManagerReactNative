import { ListIcon } from "@/components/ListIcon";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    async function getKey() {
      const email = await AsyncStorage.getItem("email");
      const token = await AsyncStorage.getItem("token");
      if (email === null || token === null) {
        router.push("/login");
      }
    }
    getKey();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerLeft: () => (
          <ThemedView
            style={{
              borderRadius: 50,
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Image
              style={{ height: 48, width: 48, borderRadius: 50 }}
              source={require("../../assets/images/avatar.jpeg")}
            />
          </ThemedView>
        ),
        headerRight: () => (
          <ThemedView
            style={{
              borderRadius: 50,
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <ListIcon name="notifications" size={28} color={"orange"} />
          </ThemedView>
        ),
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      {/* <Slot /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "speedometer" : "speedometer-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
