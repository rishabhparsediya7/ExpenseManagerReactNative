import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@/urls";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error fetching token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    console.log("🚀 ~ Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
    } else if (
      error?.response?.data?.message === "Token is not valid" &&
      error.response.status === 403
    ) {
      console.log("Token expired.");
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
