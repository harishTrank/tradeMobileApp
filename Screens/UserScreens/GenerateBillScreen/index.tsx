import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { dropDownData } from "../UserUtils";

const typeList = [{ name: "Default" }, { name: "Advance" }];

const GenerateBillScreen = ({ navigation }: any) => {
  const [weekSelection, setWeekSelection]: any = useState("");
  const [typeSelection, setTypeSelection]: any = useState("Default");

  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Generate Bill"} />

      <View style={styles.innerBox}>
        <DropDownComponent
          data={dropDownData}
          value={weekSelection}
          setValue={setWeekSelection}
          placeholder={"Please select week of period"}
          style={styles.dropDownMargin}
          search={false}
          fieldKey={"name"}
        />
        <DropDownComponent
          data={typeList}
          value={typeSelection}
          setValue={setTypeSelection}
          placeholder={"Select Type"}
          search={false}
          fieldKey={"name"}
        />
        <SmallBtnComponent
          style={{ marginVertical: 10 }}
          title={"View"}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default GenerateBillScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  dropDownMargin: { marginTop: 10 },
  innerBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});
