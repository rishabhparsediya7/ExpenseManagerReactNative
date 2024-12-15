import React, { useCallback, useRef, useMemo } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BottomSheetModalForm() {
  // Bottom sheet ref
  const bottomSheetRef = useRef(null);

  // Snap points define how tall the sheet will be at different points
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);

  // Function to open the bottom sheet
  const openBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef?.current?.expand();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.sheetContent}
        >
          <Text style={styles.heading}>Enter Details</Text>

          {/* BottomSheetTextInput for Name */}
          <BottomSheetTextInput placeholder="Name" style={styles.input} />

          {/* BottomSheetTextInput for Email */}
          <BottomSheetTextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
          />

          {/* Submit Button */}
          <Button title="Submit" onPress={() => alert("Form Submitted!")} />
        </KeyboardAvoidingView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
