import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NavigationProp, StackActions } from "@react-navigation/native";

interface UserType {
  email: string;
  isLoggedIn: boolean;
}
interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  logout: (navigation: NavigationProp<any>) => Promise<void>; // Change here to accept navigation
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
  loading: true,
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async (navigation: NavigationProp<any>) => {
    // Specify type for navigation
    console.log("Logging out");
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("email");
      navigation.dispatch(StackActions.replace("login")); // Ensure "Login" matches the route name
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
