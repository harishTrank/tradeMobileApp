import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import ToggleBtnComponent from "../../ReUseComponents/ToggleBtnComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const NotificationSettingScreen = ({ navigation }: any) => {
  const [notificationStatus, setNotificationStatus]: any = useState({
    marketOrder: false,
    pendingOrder: false,
    executePendingOrder: false,
    deletePendingOrder: false,
    tradingOrder: false,
  });

  const onHandleSubmit = (value: any) => {
    setNotificationStatus((oldValue: any) => {
      return { ...oldValue, ...value };
    });
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Notification Settings"} />

      <View style={styles.parentBox}>
        <View style={styles.rowBox}>
          <Text style={styles.toggleText}>Market Order</Text>
          <ToggleBtnComponent
            value={notificationStatus.marketOrder}
            onToggle={(value: any) => {
              onHandleSubmit({ marketOrder: value });
            }}
          />
        </View>

        <View style={styles.rowBox}>
          <Text style={styles.toggleText}>Pending Order</Text>
          <ToggleBtnComponent
            value={notificationStatus.pendingOrder}
            onToggle={(value: any) => {
              onHandleSubmit({ pendingOrder: value });
            }}
          />
        </View>

        <View style={styles.rowBox}>
          <Text style={styles.toggleText}>Execute Pending Order</Text>
          <ToggleBtnComponent
            value={notificationStatus.executePendingOrder}
            onToggle={(value: any) => {
              onHandleSubmit({ executePendingOrder: value });
            }}
          />
        </View>

        <View style={styles.rowBox}>
          <Text style={styles.toggleText}>Delete Pending Order</Text>
          <ToggleBtnComponent
            value={notificationStatus.deletePendingOrder}
            onToggle={(value: any) => {
              onHandleSubmit({ deletePendingOrder: value });
            }}
          />
        </View>

        <View style={styles.rowBox}>
          <Text style={styles.toggleText}>Trading Order</Text>
          <ToggleBtnComponent
            value={notificationStatus.tradingOrder}
            onToggle={(value: any) => {
              onHandleSubmit({ tradingOrder: value });
            }}
          />
        </View>
      </View>

      <SmallBtnComponent
        title={"Update"}
        onPress={() => {}}
        style={styles.buttonBox}
      />
    </View>
  );
};

export default NotificationSettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  parentBox: {
    padding: 10,
  },
  rowBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.border,
  },
  toggleText: {
    ...theme.font.fontMedium,
    color: theme.colors.secondary,
    fontSize: 16,
  },
  buttonBox: {
    margin: 10,
  },
});
