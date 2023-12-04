import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { dropDownData2 } from "../UserUtils";

const ScriptQuantityScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Script Quantity"} />
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
        <SmallBtnComponent title={"View"} onPress={() => {}} />
      </View>
    </View>
  );
};

export default ScriptQuantityScreen;

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
