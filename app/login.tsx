import axiosInstance from "@/api/axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { showToast } from "@/utils/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const login = () => {
  const [email, onChangeEmail] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    const response = await axiosInstance.post("/auth/send-otp", {
      toEmail: email,
    });
    console.log("🚀 ~ sendOtp ~ response:", response.status, response.data);
    if (response.status === 200) {
      return true;
    }
    return false;
  };

  const handleSignin = async () => {
    if (!email) {
      showToast(toast, "Email is missing!", "warning");
      return;
    }
    await AsyncStorage.setItem("email", String(email).toLowerCase());
    try {
      setLoading(true);
      const otpSent = await sendOtp();
      if (otpSent) {
        router.push("/verifyOtpScreen");
      } else {
        showToast(toast, "Can't send OTP!", "error");
      }
    } catch (error) {
      showToast(toast, "Could not send the OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <ThemedView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderColor: "black",
          paddingHorizontal: 8,
          width: "100%",
          paddingVertical: 80,
        }}
      >
        <ThemedView style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/navlogo.png")}
          />
        </ThemedView>
        <ThemedView style={styles.headingContainer}>
          <ThemedText type="title" style={[styles.text]}>
            Home Manager
          </ThemedText>
          <ThemedText
            type="title"
            style={[
              styles.text,
              {
                fontSize: 16,
                fontWeight: "200",
                textAlign: "center",
                marginTop: 8,
                lineHeight: 20,
                paddingHorizontal: 20,
              },
            ]}
          >
            The place where you can see, track and visualise your expenses
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.signinView}>
          <ThemedView style={styles.inputBackground}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={onChangeEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              value={email}
              placeholderTextColor="#565555"
            />
            <Pressable
              style={styles.signinPressable}
              onPress={() => handleSignin()}
            >
              <ThemedText style={{ color: "white" }}>
                {loading ? <ActivityIndicator /> : `Sign in with Email`}
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedView
            style={{
              borderWidth: 1,
              marginBottom: 16,
              borderRadius: 16,
              paddingHorizontal: 16,
              borderColor: "#dfdbdb",
            }}
          />
          <ThemedView style={styles.signinbuttonsContainer}>
            <Pressable
              onPress={() => handleSignin()}
              style={styles.signinbuttons}
            >
              <ThemedText style={{ color: "white" }}>
                Sign in with Google
              </ThemedText>
              <Image
                style={styles.signinimage}
                source={require("../assets/images/googlelogo.png")}
              />
            </Pressable>
            <Pressable style={styles.signinbuttons}>
              <ThemedText style={{ color: "white" }}>
                Sign in with Apple
              </ThemedText>
              <Image
                style={styles.signinimage}
                source={require("../assets/images/applelogo.png")}
              />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  text: {
    color: "black",
  },
  signinbuttons: {
    backgroundColor: "black",
    width: "100%",
    borderRadius: 16,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
  },
  signinimage: {
    height: 20,
    width: 20,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    color: "black",
    fontSize: 16,
    borderRadius: 16,
    borderColor: "#565555",
  },
  signinPressable: {
    backgroundColor: "black",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderColor: "black",
  },
  inputBackground: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingBottom: 20,
    width: "100%",
    rowGap: 8,
  },
  signinbuttonsContainer: {
    backgroundColor: "transparent",
    rowGap: 8,
    width: "100%",
  },
  signinView: {
    backgroundColor: "transparent",
    flex: 0.5,
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  headingContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  forgetPassword: {
    alignItems: "flex-end",
  },
  forgetPasswordText: {
    fontSize: 16,
    color: "#404063",
    fontWeight: "bold",
  },
});
export default login;
