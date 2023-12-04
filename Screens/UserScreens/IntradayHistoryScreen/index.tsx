import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { dropDownData2 } from "../UserUtils";

const { width } = Dimensions.get("window");

const IntradayHistoryScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const [timingValue, setTimingValue]: any = useState("minute");

  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Intraday History"} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={dropDownData2.exchange}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          search={false}
          style={styles.dropDownStyle}
          fieldKey={"name"}
        />
        <DropDownComponent
          data={dropDownData2.selectScript}
          value={selectScript}
          setValue={setSelectScript}
          placeholder={"Select Script"}
          search={true}
          style={styles.dropDownStyle}
          fieldKey={"name"}
        />
        <DropDownComponent
          data={dropDownData2.timing}
          value={timingValue}
          setValue={setTimingValue}
          placeholder={"Select timing"}
          search={false}
          style={styles.dropDownStyle}
          fieldKey={"name"}
        />

        <View style={styles.btnStyleBox}>
          <SmallBtnComponent
            style={styles.buttonBtn}
            title={"Search"}
            onPress={() => {}}
          />
          <SmallBtnComponent
            style={styles.buttonBtn}
            title={"Reset"}
            onPress={() => {}}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default IntradayHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 10,
  },
  dropDownStyle: {
    width: width * 0.46,
  },
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.46,
  },
  buttonBtn: {
    width: width * 0.215,
  },
});
