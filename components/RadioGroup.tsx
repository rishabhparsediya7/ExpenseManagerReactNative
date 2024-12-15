import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { radioButtons } from "@/constants/MockData";

export default function CustomRadioGroup() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      {radioButtons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => setSelectedOption(button.id)}
        >
          <View style={styles.radioCircle}>
            {selectedOption === button.value && (
              <View style={styles.selectedRb} />
            )}
          </View>
          <Text style={styles.radioText}>{button.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
    color: "black",
    height: 20,
    borderWidth: 1,
  },
});
