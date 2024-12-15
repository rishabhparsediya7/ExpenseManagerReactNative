import axiosInstance from "@/api/axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { showToast } from "@/utils/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "./context/AuthContext";

const VerifyOtpScreen = () => {
  const otpLength = 6;
  const [time, setTime] = useState(30);
  const router = useRouter();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [finalOtp, setFinalOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChangeOTP = (index: number, e: any) => {
    const value = e;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    const newValue = value.substring(0, 1);
    newOtp[index] = newValue;
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === otpLength) {
      setDisabledSubmit(!disabledSubmit);
      setFinalOtp(combinedOtp);
    }
    if (value && index < otpLength - 1 && inputRefs.current[index + 1]) {
      inputRefs?.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: any) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleVerifyOTP = async () => {
    console.log("final otp", finalOtp);
    if (!finalOtp) {
      showToast(toast, "OTP is missing!", "warning");
    }
    const email = await AsyncStorage.getItem("email");
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      if (response.status !== 200) {
        showToast(toast, "OTP is incorrect!", "warning");
        return;
      }
      console.log(response.data.token);
      if (response.data.token) {
        await AsyncStorage.setItem("token", response?.data?.token);
      }
      router.push("/(tabs)");
    } catch (error) {
      console.log("🚀 ~ handleVerifyOTP ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    let intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  };

  const sendOtpAgain = () => {
    console.log("send otp again");
  };
  useEffect(() => {
    startTimer();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ThemedView style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/images/navlogo.png")}
            />
          </ThemedView>
          <ThemedView style={styles.headingContainer}>
            <ThemedText style={styles.heading}>Home Manager</ThemedText>
          </ThemedView>
          <ThemedView style={styles.headingContainer}>
            <ThemedText style={styles.description}>
              Enter the OTP you received on the mail parsediyarishabh@gmail.com
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.boxContainer}>
            {otp.map((digit, index) => {
              return (
                <TextInput
                  key={index}
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(e) => handleChangeOTP(index, e)}
                  ref={(el) => {
                    if (inputRefs && inputRefs.current) {
                      inputRefs.current[index] = el;
                    }
                  }}
                  onKeyPress={(e) => handleKeyDown(index, e)}
                  placeholder="Enter email or username"
                  value={digit}
                  placeholderTextColor="white"
                />
              );
            })}
          </ThemedView>
          <ThemedView style={styles.verifyButtonContainer}>
            <Pressable
              style={styles.verifyOtpBtn}
              onPress={() => handleVerifyOTP()}
            >
              <ThemedText
                style={{
                  color: "white",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? <ActivityIndicator /> : `Submit`}
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedView
            style={[styles.verifyButtonContainer, { alignItems: "flex-end" }]}
          >
            <ThemedText>
              Resend the OTP in {time} second{time >= 10 ? "s" : ""}.
            </ThemedText>
            <Pressable onPress={() => sendOtpAgain()}>
              <ThemedText style={{ color: "blue" }}>Resend OTP</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
  },
  heading: {
    alignSelf: "center",
    padding: 40,
    paddingTop: 80,
    fontSize: 40,
  },
  description: {
    textAlign: "center",
  },
  box: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 14,
    alignItems: "center",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  verifyButtonContainer: {
    paddingHorizontal: 32,
    width: "100%",
  },
  verifyOtpBtn: {
    backgroundColor: "black",
    borderRadius: 16,
    padding: 12,
  },
});
