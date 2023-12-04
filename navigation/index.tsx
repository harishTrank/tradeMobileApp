import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Screens/SplashScreen";
import UserScreens from "../Screens/UserScreens";
import { navigationComponents } from "./Components";
import React from "react";
import theme from "../utils/theme";

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
