import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../../../utils/theme";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";

const { height } = Dimensions.get("window");

const RenderItem = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemFirstRow}>
        <Text style={styles.itemText}>
          {item?.coin_name ? `${item?.coin_name} ,` : ""}
          <Text
            style={[
              styles.itemText,
              { color: item.action === "BUY" ? "green" : "red" },
            ]}
          >
            {" "}
            {isNaN(item.quantity) ? "" : Math.abs(item.quantity)}{" "}
            {item.action || ""}
          </Text>
        </Text>
        <Text
          style={[
            styles.itemText,
            { color: item.action === "BUY" ? "green" : "red" },
          ]}
        >
          {item?.price}
        </Text>
      </View>

      <View style={styles.itemSecondRow}>
        <View style={styles.itemSecondRowContainer}>
          <Feather name="user" size={20} color="black" />
          <Text style={[styles.itemText, { marginLeft: 5 }]}>
            {item?.buy_sell_user__user_name}
          </Text>
        </View>

        <View style={styles.itemSecondRowContainer}>
          <Feather name="clock" size={20} color="black" />
          <Text style={[styles.itemText, { marginLeft: 5 }]}>
            {dayjs(item?.created_at).format("DD MMM YYYY hh:mm:ss A")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // list card item style
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  itemFirstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemSecondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemSecondRowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    // fontSize: 13,
  },
  emptyStyleContainer: {
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStyleText: {
    ...theme.font.fontMedium,
    color: theme.colors.secondary,
  },
});

export default RenderItem;
