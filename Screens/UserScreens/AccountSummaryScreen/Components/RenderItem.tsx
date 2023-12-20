import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../../../utils/theme";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Entypo } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const RenderItem = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemFirstRow}>
        <Text style={styles.itemText}>
          {`${item?.particular},`}
          <Text
            style={[
              styles.itemText,
              { color: item.buy_sell_type === "BUY" ? "green" : "red" },
            ]}
          >
            {" "}
            {`${item.quantity} ${item.buy_sell_type}`}
          </Text>
        </Text>
        <Text
          style={[
            styles.itemText,
            { color: Number(item.amount) > 0 ? "green" : "red" },
          ]}
        >
          {Number(item?.amount).toFixed(2)}
        </Text>
      </View>

      <View style={styles.middleBox}>
        <View style={styles.itemNewRow}>
          <Text style={styles.smallText}>{item?.price}</Text>
          <Entypo
            name="arrow-long-right"
            size={20}
            color="black"
            style={styles.arrowIcon}
          />
          <Text
            style={[
              styles.smallText,
              { color: item.buy_sell_type === "BUY" ? "green" : "red" },
            ]}
          >
            {item?.average}
          </Text>
        </View>

        <Text style={styles.smallText}>CL: {item.closing}</Text>
      </View>

      <View style={styles.itemSecondRow}>
        <View style={styles.itemSecondRowContainer}>
          <Feather name="user" size={16} color={theme.colors.greyText} />
          <Text style={[styles.itemText2, { marginLeft: 5 }]}>
            {`${item?.user_summary__user_name} - ${item?.summary_flg}`}
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
  smallText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    fontSize: 12,
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  itemNewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
  },
});

export default RenderItem;
