import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Screens/SplashScreen";
import UserScreens from "../Screens/UserScreens";
import { navigationComponents } from "./Components";
import React, { useEffect } from "react";
import theme from "../utils/theme";
import { userProfileView } from "../store/Services/User";
import { connectSocket } from "../utils/socket/SocketService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import {
  currentUserData,
  selectedCoinList,
  userLoginGlobalFlag,
} from "../JotaiStore";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator<any>();

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  // const av = new Animated.Value(0);
  // av.addListener(() => {
  //   return;
  // });
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
    userProfileView({})
      .then((res: any) => {
        connectSocket();
        setTradeCoinData(res?.tradeCoinData);
        setCurrentUser(res?.data);
      })
      ?.catch(async (err: any) => {
        if (err?.data?.message) {
          Toast.show({
            type: "error",
            text1: err.data.message,
          });
        }
        setUserLogFlag(false);
        await AsyncStorage.removeItem("accessToken");
      });
  }, []);

  useEffect(() => {
    loginFlagManager();
  }, [currentUser?.id]);
  return (
    <Stack.Navigator screenOptions={navigationComponents.cardStyle}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserScreens"
        component={UserScreens}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
