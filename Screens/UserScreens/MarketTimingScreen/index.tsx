import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { dropDownData2 } from "../UserUtils";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const MarketTimingScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Market Timings"} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={dropDownData2.exchange}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          style={styles.dropDownMargin}
          search={false}
          fieldKey={"name"}
        />
        <SmallBtnComponent title={"Search"} onPress={() => {}} />
      </View>
    </View>
  );
};

export default MarketTimingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownMargin: {
    marginVertical: 10,
  },
});
