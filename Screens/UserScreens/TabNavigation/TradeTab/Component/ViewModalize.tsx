import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItemCard } from "..";
import theme from "../../../../../utils/theme";
import { useAtom } from "jotai";
import { particularTradeTabCoin } from "../../../../../JotaiStore";
import dayjs from "dayjs";

const ViewModalize = () => {
  const [particularCoinHistory]: any = useAtom(particularTradeTabCoin);
  const item = {
    action: particularCoinHistory?.response?.action,
    quantity: particularCoinHistory?.response?.quantity,
    buy_sell_user__user_name: particularCoinHistory?.user,
    coin_name: particularCoinHistory?.response?.coin_name,
    created_at: particularCoinHistory?.response?.updated_at,
    trade_type: particularCoinHistory?.response?.trade_type,
  };

  return (
    <View>
      <ListItemCard item={item} />
      <View style={styles.tableBox}>
        <View style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}>
          <Text style={styles.basicText}>UserName:</Text>
          <Text style={styles.basicText}>{particularCoinHistory?.user}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.basicText}>OrderTime:</Text>
          <Text style={styles.basicText}>
            {dayjs(particularCoinHistory?.response?.updated_at).format(
              "DD MMM YYYY hh:mm:ss A"
            )}
          </Text>
        </View>
        <View style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}>
          <Text style={styles.basicText}>Symbol:</Text>
          <Text style={styles.basicText}>
            {particularCoinHistory?.response?.ex_change}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.basicText}>Order Type:</Text>
          <Text style={styles.basicText}>
            {particularCoinHistory?.response?.action}
          </Text>
        </View>

        <View style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}>
          <Text style={styles.basicText}>Price:</Text>
          <Text style={styles.basicText}>
            {particularCoinHistory?.response?.price}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.basicText}>Quantity:</Text>
          <Text style={styles.basicText}>
            {Math.abs(particularCoinHistory?.response?.quantity)}
          </Text>
        </View>

        <View style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}>
          <Text style={styles.basicText}>Ipaddress:</Text>
          <Text style={styles.basicText}>
            {particularCoinHistory?.response?.ip_address}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.basicText}>Order Method:</Text>
          <Text style={styles.basicText}>
            {(particularCoinHistory?.response?.order_method).toUpperCase()}
          </Text>
        </View>

        <View style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}>
          <Text style={styles.basicText}>TradeType:</Text>
          <Text style={styles.basicText}>
            {particularCoinHistory?.response?.trade_type}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBox: {
    padding: 10,
  },
  row: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
});

export default ViewModalize;
