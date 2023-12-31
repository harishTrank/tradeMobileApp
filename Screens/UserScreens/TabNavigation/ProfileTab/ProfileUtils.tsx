import React from "react";
import theme from "../../../../utils/theme";
import {
  MaterialCommunityIcons,
  Foundation,
  MaterialIcons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

export const boxData = {
  adminBox: [
    {
      icon: <AntDesign name="adduser" size={20} color={theme.colors.black} />,
      title: "Create New User",
      screenName: "CreateNewUsersScreen",
    },
    {
      icon: <FontAwesome name="users" size={20} color={theme.colors.black} />,
      title: "User List",
      screenName: "UserListScreen",
    },
    {
      icon: <FontAwesome name="users" size={20} color={theme.colors.black} />,
      title: "Search User",
      screenName: "SearchUserScreen",
    },
  ],
  first: [
    {
      icon: (
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Account Summary",
      screenName: "AccountSummaryScreen",
    },
    {
      icon: (
        <Foundation name="page-edit" size={20} color={theme.colors.black} />
      ),
      title: "Generate Bill",
      screenName: "GenerateBillScreen",
    },
    {
      icon: (
        <MaterialIcons name="history" size={20} color={theme.colors.black} />
      ),
      title: "Intraday History",
      screenName: "IntradayHistoryScreen",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="crosshairs-off"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Settlements Report",
      screenName: "SettlementsReportScreen",
    },
    {
      icon: (
        <Foundation name="page-delete" size={20} color={theme.colors.black} />
      ),
      title: "Rejection Log",
      screenName: "RejectionLogScreen",
    },
    {
      icon: <Entypo name="line-graph" size={20} color={theme.colors.black} />,
      title: "Script Quantity",
      screenName: "ScriptQuantityScreen",
    },
  ],
  second: [
    {
      icon: (
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Market Timings",
      screenName: "MarketTimingScreen",
    },
    {
      icon: (
        <Foundation name="page-edit" size={20} color={theme.colors.black} />
      ),
      title: "Set Quantity Values",
      screenName: "SetQuantityScreen",
    },
    {
      icon: (
        <MaterialIcons name="history" size={20} color={theme.colors.black} />
      ),
      title: "Message",
      screenName: "MessageScreen",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="crosshairs-off"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Change Password",
      screenName: "ChangePasswordScreen",
    },
    {
      icon: (
        <Foundation name="page-delete" size={20} color={theme.colors.black} />
      ),
      title: "Invite Friends",
    },
    {
      icon: <Entypo name="line-graph" size={20} color={theme.colors.black} />,
      title: "Notification Settings",
      screenName: "NotificationSettingScreen",
    },
    {
      icon: <Entypo name="line-graph" size={20} color={theme.colors.black} />,
      title: "Login History",
      screenName: "LoginHistoryScreen",
    },
    {
      icon: <Entypo name="line-graph" size={20} color={theme.colors.black} />,
      title: "Profile",
      screenName: "ProfileScreen",
    },
  ],
  third: [
    {
      icon: (
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Account Summary",
      screenName: "AccountSummaryScreen",
    },
    {
      icon: (
        <Foundation name="page-edit" size={20} color={theme.colors.black} />
      ),
      title: "Generate Bill",
      screenName: "GenerateBillScreen",
    },
    {
      icon: (
        <MaterialIcons name="history" size={20} color={theme.colors.black} />
      ),
      title: "Intraday History",
      screenName: "IntradayHistoryScreen",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="crosshairs-off"
          size={20}
          color={theme.colors.black}
        />
      ),
      title: "Settlements Report",
      screenName: "SettlementsReportScreen",
    },
    {
      icon: (
        <Foundation name="page-delete" size={20} color={theme.colors.black} />
      ),
      title: "Rejection Log",
      screenName: "RejectionLogScreen",
    },
    {
      icon: <Entypo name="line-graph" size={20} color={theme.colors.black} />,
      title: "Script Quantity",
      screenName: "ScriptQuantityScreen",
    },
  ],
};
