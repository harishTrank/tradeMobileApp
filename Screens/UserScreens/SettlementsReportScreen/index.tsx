import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { dropDownData } from "../UserUtils";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const { width } = Dimensions.get("window");

const SettlementsReportScreen = ({ navigation }: any) => {
  const [currentDropdownValue, setCurrentDropdownValue]: any = useState("");
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Settlement Report"} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={dropDownData}
          value={currentDropdownValue}
          setValue={setCurrentDropdownValue}
          placeholder={"Please select week of period"}
          style={styles.dropDownMargin}
          search={false}
          fieldKey={"name"}
        />

        <View style={styles.buttonsBoxStyle}>
          <SmallBtnComponent
            title={"Search"}
            onPress={() => {}}
            style={styles.btnStyle}
          />
          <SmallBtnComponent
            title={"Reset"}
            onPress={() => {}}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
            style={styles.btnStyle}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettlementsReportScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownMargin: { marginTop: 10 },
  buttonsBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 13,
  },
  btnStyle: {
    marginLeft: 10,
    width: width * 0.23,
  },
});
