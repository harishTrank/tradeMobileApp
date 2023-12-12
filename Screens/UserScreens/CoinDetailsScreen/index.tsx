import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";

const RowComponent = ({ title, value, grey }: any) => {
  return (
    <View
      style={[styles.row, grey && { backgroundColor: theme.colors.lightGrey }]}
    >
      <Text style={styles.basicText}>{title}</Text>
      <Text style={styles.basicText}>{value}</Text>
    </View>
  );
};

const CoinDetailsScreen = ({ navigation, route }: any) => {
  const { selectedCoinData } = route.params;
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Detail"} />

      <View>
        <RowComponent
          title={"Script:"}
          value={
            selectedCoinData.Exchange === "MCX"
              ? selectedCoinData.InstrumentIdentifier.split("_")[1]
              : selectedCoinData.InstrumentIdentifier
          }
        />
        <RowComponent
          title={"Expiry:"}
          grey
          value={
            selectedCoinData.Exchange === "MCX"
              ? selectedCoinData.InstrumentIdentifier.split("_")?.[2]
              : "--"
          }
        />
        <RowComponent
          title={"LotSize:"}
          value={selectedCoinData.QuotationLot}
        />
        <RowComponent title={"Trade Attribute:"} grey value={"Fully"} />
        <RowComponent title={"Allow Trade:"} value={"Yes"} />
        <RowComponent title={"Max Qty:"} grey value={"0.0"} />
        <RowComponent title={"BreakupQty:"} value={"0.0"} />
        <RowComponent title={"MaxLot:"} grey value={"5.0"} />
        <RowComponent title={"BreakUpLot:"} value={"5.0"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  row: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
});

export default CoinDetailsScreen;
