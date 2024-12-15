import { useAuth } from "@/app/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

type dataProps = {
  heading: string;
  iconName: string;
  iconColor: string;
};

type ListGroupProps = {
  data: dataProps[];
};

const ProfileItem = ({ item }: { item: dataProps }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log("🚀 ~ handleLogout ~ item:", item);
    if (item.heading === "Logout") {
      await logout(navigation);
    }
  };

  return (
    <Pressable onPress={handleLogout}>
      <View style={styles.profileItemOuterView}>
        <View
          style={[
            styles.profileItemInnerView,
            { backgroundColor: item.iconColor },
          ]}
        >
          <Ionicons name={item.iconName} color={"white"} size={16} />
        </View>
        <Text style={{ fontSize: 16 }}>{item.heading}</Text>
      </View>
    </Pressable>
  );
};

const ListGroup = ({ data }: ListGroupProps) => {
  return (
    <View style={styles.listGroupContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProfileItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={
          Platform.OS !== "android"
            ? ({ highlighted }) => (
                <View
                  style={[styles.separator, highlighted && { marginLeft: 0 }]}
                />
              )
            : null
        }
      />
    </View>
  );
};

export default ListGroup;

const styles = StyleSheet.create({
  separator: {
    borderWidth: 0.5,
    width: "89%",
    alignSelf: "flex-end",
    borderColor: "#cdcdcd",
  },
  listGroupContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#e8e6e6",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8, // Changed to a numeric value
  },
  profileItemInnerView: {
    borderRadius: 6,
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    top: 2,
    left: 4,
  },
  profileItemOuterView: {
    flex: 1,
    flexDirection: "row",
    columnGap: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
});
