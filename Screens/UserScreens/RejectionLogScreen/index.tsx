import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { dropDownData, dropDownData2 } from "../UserUtils";

const { width } = Dimensions.get("window");

const RejectionLogScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const [currentDropdownValue, setCurrentDropdownValue]: any = useState("");
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Rejection Log History"} />
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
      </View>
      <DropDownComponent
        data={dropDownData}
        value={currentDropdownValue}
        setValue={setCurrentDropdownValue}
        placeholder={"Please select week of period"}
        search={false}
        style={styles.bigDropDown}
        fieldKey={"name"}
      />
      <View style={styles.btnStyleBox}>
        <SmallBtnComponent
          style={styles.buttonBtn}
          title={"Search"}
          onPress={() => {}}
        />
        <SmallBtnComponent
          style={{ ...styles.buttonBtn, ...{ marginLeft: 15 } }}
          title={"Reset"}
          onPress={() => {}}
          backgroundColor={theme.colors.lightGrey}
          textColor={theme.colors.secondary}
        />
      </View>
    </ScrollView>
  );
};

export default RejectionLogScreen;

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
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  buttonBtn: {
    width: width * 0.215,
  },
  bigDropDown: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
