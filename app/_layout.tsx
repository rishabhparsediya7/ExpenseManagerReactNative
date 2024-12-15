import { AuthProvider } from "@/app/context/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Buffer } from "buffer";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";
import { ExpenseProvider } from "./context/ExpenseContext";

SplashScreen.preventAutoHideAsync();

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(decodedPayload) as DecodedToken;
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
};

const useTokenExpirationCheck = () => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setIsExpired(true);
          return;
        }
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
          setIsExpired(true);
          return;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        setIsExpired(decoded.exp < currentTime);
      } catch (error) {
        console.log("Error checking token expiration:", error);
        setIsExpired(true);
      }
    };
    checkToken();
  }, []);

  return isExpired;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isExpired = useTokenExpirationCheck();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      if (isExpired) {
        await AsyncStorage.clear();
      }
    })();
  }, [isExpired]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ToastProvider animationDuration={450} warningColor="#2e5568">
            <AuthProvider>
              <ExpenseProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="verifyOtpScreen" />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </ExpenseProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
