import React, { useState } from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { View, StyleSheet } from "react-native";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";

const TradeMarginScreen = ({ navigation, route }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title="Trade Margin Setting" />

      <View>
        <DropDownComponent
          data={route?.params?.exchange?.map((item: any) => {
            return { name: item.toUpperCase() };
          })}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          search={false}
          fieldKey={"name"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default TradeMarginScreen;
