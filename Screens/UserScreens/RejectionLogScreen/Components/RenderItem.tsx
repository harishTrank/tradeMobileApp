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

      <Text style={[styles.itemText2, { paddingVertical: 2 }]}>
        {item.message}
      </Text>

      <View style={styles.itemSecondRow}>
        <View style={styles.itemSecondRowContainer}>
          <Feather name="user" size={16} color={theme.colors.greyText} />
          <Text style={[styles.itemText2, { marginLeft: 5 }]}>
            {item?.buy_sell_user__user_name}
          </Text>
        </View>

        <View style={styles.itemSecondRowContainer}>
          <Feather name="clock" size={16} color={theme.colors.greyText} />
          <Text style={[styles.itemText2, { marginLeft: 5 }]}>
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
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 13,
  },
  itemText2: {
    ...theme.font.fontMedium,
    color: theme.colors.greyText,
    fontSize: 12,
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
