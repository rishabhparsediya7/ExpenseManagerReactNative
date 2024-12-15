import ListGroup from "@/components/ListGroup";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getValue = async (key: string) => {
      const value = await AsyncStorage.getItem(key);
      setEmail(String(value));
    };
    getValue("email");
  }, []);

  const utilsData = [
    { iconName: "settings-outline", heading: "Settings", iconColor: "gray" },
    { iconName: "cash-outline", heading: "Expenses", iconColor: "orange" },
    { iconName: "heart", heading: "Your Favorites", iconColor: "red" },
    { iconName: "log-out", heading: "Logout", iconColor: "green" },
  ];

  const profileData = [
    {
      iconName: "call",
      heading: "+91-7987567233",
      iconColor: "#006de2",
    },
    {
      iconName: "mail",
      heading: email,
      iconColor: "#ff9008",
    },
  ];

  const savedAddresses = [
    {
      iconName: "home-outline",
      heading: "Saved Address",
      iconColor: "#9f6b7b",
    },
  ];
  return (
    <ScrollView
      style={{ flex: 1, position: "relative", backgroundColor: "#ffffff" }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        style={{ flex: 1 }}
        headerImage={
          <Image
            style={{
              height: "100%",
              width: "100%",
            }}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            resizeMode="cover"
          />
        }
      ></ParallaxScrollView>
      <Image
        style={styles.profilePic}
        source={require("../../assets/images/logo.png")}
        resizeMode="cover"
      />
      <View style={styles.personalInformationContainer}>
        <View style={styles.personalInformationRow}>
          <Text
            style={[
              styles.personalInformationText,
              { fontSize: 28, fontWeight: "bold", color: "gray" },
            ]}
          >
            Rishabh Parsediya
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, rowGap: 28 }}>
        <ListGroup data={profileData} />
        <ListGroup data={utilsData} />
        <ListGroup data={savedAddresses} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  personalInformationRow: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    columnGap: 12,
  },
  personalInformationText: {
    color: "grey",
  },
  personalInformationContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  profilePic: {
    flex: 1,
    position: "absolute",
    top: 156,
    left: 20,
    borderRadius: 200,
    height: 80,
    width: 80,
  },
});
