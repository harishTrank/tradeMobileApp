import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import theme from "./utils/theme";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import {
  currentUserData,
  selectedCoinList,
  userLoginGlobalFlag,
} from "./JotaiStore";
import { userProfileView } from "./store/Services/User";
import { connectSocket } from "./utils/socket/SocketService";

registerTranslation("en", en);
export const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Change the primary color here
    accent: theme.colors.greyText, // Change the accent color here
    primaryContainer: theme.colors.primaryExtraLight,
    secondaryContainer: theme.colors.extraHard,
  },
};

export default function App() {
  const [, setUserLogFlag]: any = useAtom(userLoginGlobalFlag);
  const [, setTradeCoinData] = useAtom(selectedCoinList);

  const [currentUser, setCurrentUser]: any = useAtom(currentUserData);
  const loginFlagManager = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      setUserLogFlag(true);
    } else {
      setUserLogFlag(false);
    }

    const quantityData = await AsyncStorage.getItem("quantity");
    if (!quantityData) {
      const quantity = {
        a: 5,
        b: 10,
        c: 50,
        d: 100,
        e: 250,
        f: 500,
        g: 1000,
        h: 2500,
      };
      await AsyncStorage.setItem("quantity", JSON.stringify(quantity));
    }
  };

  useEffect(() => {
    userProfileView()
      .then((res: any) => {
        connectSocket();
        setTradeCoinData(res?.tradeCoinData);
        setCurrentUser(res?.data);
      })
      ?.catch((err: any) => console.log("err", err));
  }, []);

  useEffect(() => {
    loginFlagManager();
  }, [currentUser?.id]);
  // -------------------------------

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={customTheme}>
          <Navigation />
          <Toast position="top" />
        </PaperProvider>
      </QueryClientProvider>
    );
  }
}
// sdk.dir=C:\\Users\\haris\\AppData\\Local\\Android\\sdk
// local.properties
