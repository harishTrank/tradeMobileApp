import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "../../../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";

const { height } = Dimensions.get("window");

const RanderComponent = ({
  item,
  modalizeRef,
  socketResponse,
  setTradeCoinSelected,
  user_id,
}: any) => {
  const modalizerOpen = () => {
    setTradeCoinSelected(socketResponse);
    modalizeRef.current?.open();
  };

  const profitLossHandler = () => {
    return (
      item?.total_quantity > 0
        ? (socketResponse?.BuyPrice - item?.avg_buy_price) *
          item?.total_quantity *
          socketResponse?.QuotationLot
        : (item?.avg_sell_price - socketResponse?.SellPrice) *
          Math.abs(item?.total_quantity) *
          socketResponse?.QuotationLot
    ).toFixed(2);
  };

  const finalProfitLoss: any = profitLossHandler();
  return (
    <TouchableOpacity
      disabled={user_id ? true : false}
      style={styles.itemContainer}
      onPress={modalizerOpen}
    >
      <View style={styles.itemFirstRow}>
        <Text style={styles.itemText}>
          {item?.coin_name} ,{" "}
          <Text
            style={[
              styles.itemText,
              { color: item?.total_quantity > 0 ? "green" : "red" },
            ]}
          >
            {" "}
            {item?.total_quantity > 0
              ? `${item?.total_quantity} BUY`
              : `${Math.abs(item?.total_quantity)} SELL`}
          </Text>
        </Text>
        {isNaN(finalProfitLoss) ? (
          <ActivityIndicator size={"small"} color={theme.colors.primaryDark} />
        ) : (
          <Text
            style={[
              styles.itemText,
              { color: Number(finalProfitLoss) > 0 ? "green" : "red" },
            ]}
          >
            {finalProfitLoss}
          </Text>
        )}
      </View>

      <View style={styles.itemSecondRow}>
        <Text style={styles.smallText}>
          {item?.total_quantity > 0
            ? item?.avg_buy_price?.toFixed(2)
            : item?.avg_sell_price?.toFixed(2)}
        </Text>
        <Entypo
          name="arrow-long-right"
          size={20}
          color="black"
          style={styles.arrowIcon}
        />
        <Text style={styles.smallText}>
          {item?.total_quantity > 0
            ? socketResponse?.BuyPrice?.toFixed(2)
            : socketResponse?.SellPrice?.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
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
  },
  itemSecondRowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
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
});

export default RanderComponent;
