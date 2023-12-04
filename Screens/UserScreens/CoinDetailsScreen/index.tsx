import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import { useAtom } from "jotai";
import { tradeSelectedCoinGlobal } from "../../../JotaiStore";

const RowComponent = ({ title, value }: any) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const CoinDetailsScreen = ({ navigation }: any) => {
  // const [selectedCoinData]: any = useAtom(tradeSelectedCoinGlobal);
  // console.log("selectedCoinData", selectedCoinData);
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Detail"} />

      {/* <View>
        <RowComponent title={"Expiry"} value={}/>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default CoinDetailsScreen;
