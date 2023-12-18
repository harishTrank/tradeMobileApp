import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import LoginScreen from "./AuthScreen/LoginScreen";
import ForgotPasswordScreen from "./AuthScreen/ForgotPasswordScreen";
import RegistrationScreen from "./AuthScreen/RegistrationScreen";
import AccountSummaryScreen from "./AccountSummaryScreen";
import GenerateBillScreen from "./GenerateBillScreen";
import IntradayHistoryScreen from "./IntradayHistoryScreen";
import SettlementsReportScreen from "./SettlementsReportScreen";
import RejectionLogScreen from "./RejectionLogScreen";
import ScriptQuantityScreen from "./ScriptQuantityScreen";
import MarketTimingScreen from "./MarketTimingScreen";
import SetQuantityScreen from "./SetQuantityScreen";
import MessageScreen from "./MessageScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import NotificationSettingScreen from "./NotificationSettingScreen";
import LoginHistoryScreen from "./LoginHistoryScreen";
import ProfileScreen from "./ProfileScreen";
import CreateNewUsersScreen from "../OnlyAdminScreens/CreateNewUsersScreen";
import UserListScreen from "../OnlyAdminScreens/UserListScreen";
import SearchUserScreen from "../OnlyAdminScreens/SearchUserScreen";
import AddScriptsScreen from "./AddScriptsScreen";
import { useAtom } from "jotai";
import { userLoginGlobalFlag } from "../../JotaiStore";
import CoinDetailsScreen from "./CoinDetailsScreen";
import AddSymbolListScreen from "./AddSymbolListScreen";
import ChartViewScreen from "./ChartViewScreen";
import PositionSquareOffScreen from "./PositionSquareOffScreen";

const Stack = createStackNavigator<any>();

const UserScreens = () => {
  const [userLogFlag]: any = useAtom(userLoginGlobalFlag);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userLogFlag ? "TabNavigation" : "LoginScreen"}
      // initialRouteName={"UserListScreen"}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="AddScriptsScreen" component={AddScriptsScreen} />
      <Stack.Screen
        name="AddSymbolListScreen"
        component={AddSymbolListScreen}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen
        name="AccountSummaryScreen"
        component={AccountSummaryScreen}
      />
      <Stack.Screen name="GenerateBillScreen" component={GenerateBillScreen} />
      <Stack.Screen
        name="IntradayHistoryScreen"
        component={IntradayHistoryScreen}
      />
      <Stack.Screen
        name="SettlementsReportScreen"
        component={SettlementsReportScreen}
      />
      <Stack.Screen name="RejectionLogScreen" component={RejectionLogScreen} />
      <Stack.Screen
        name="ScriptQuantityScreen"
        component={ScriptQuantityScreen}
      />
      <Stack.Screen name="MarketTimingScreen" component={MarketTimingScreen} />
      <Stack.Screen name="SetQuantityScreen" component={SetQuantityScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="NotificationSettingScreen"
        component={NotificationSettingScreen}
      />
      <Stack.Screen name="LoginHistoryScreen" component={LoginHistoryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      {/* admin routes */}
      <Stack.Screen
        name="CreateNewUsersScreen"
        component={CreateNewUsersScreen}
      />
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen name="SearchUserScreen" component={SearchUserScreen} />
      <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
      <Stack.Screen name="ChartViewScreen" component={ChartViewScreen} />
    </Stack.Navigator>
  );
};

export default UserScreens;
