import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { FontAwesome } from "@expo/vector-icons";
import { dropDownData } from "../UserUtils";

const { width } = Dimensions.get("window");

const AccountSummaryScreen = ({ navigation }: any) => {
  const [currentDropdownValue, setCurrentDropdownValue]: any = useState("");
  const [toggleCheckBoxs, setToggleCheckBoxs] = useState({
    pAndL: true,
    brk: true,
    credit: false,
  });
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const [searchIconColorState, setSearchIconColorState]: any = useState(
    theme.colors.greyText
  );

  const setToggleHandler = (value: any) => {
    setToggleCheckBoxs((oldValue: any) => {
      return { ...oldValue, ...value };
    });
  };
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Account Summary"} />
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

        <View style={styles.checkBoxParentBox}>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.pAndL}
              setValue={(value: any) => setToggleHandler({ pAndL: value })}
            />
            <Text style={styles.checkBoxText}>P&L</Text>
          </View>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.brk}
              setValue={(value: any) => setToggleHandler({ brk: value })}
            />
            <Text style={styles.checkBoxText}>Brk</Text>
          </View>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.credit}
              setValue={(value: any) => setToggleHandler({ credit: value })}
            />
            <Text style={styles.checkBoxText}>Credit</Text>
          </View>
        </View>

        <View style={styles.buttonsBoxStyle}>
          <SmallBtnComponent
            title={"View"}
            onPress={() => {}}
            style={{ marginLeft: 10 }}
          />
          <SmallBtnComponent
            title={"Clear"}
            onPress={() => {}}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
            style={{ marginLeft: 10 }}
          />
        </View>

        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color={searchIconColorState} />
          <TextInput
            value={searchExchangeText}
            onChangeText={setSearchExchangeText}
            placeholder="Seach exchange or script"
            placeholderTextColor={theme.colors.greyText}
            style={styles.searchTextBox}
            onBlur={() => setSearchIconColorState(theme.colors.greyText)}
            onFocus={() => setSearchIconColorState(theme.colors.blue)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSummaryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
  },
  dropDownMargin: { marginTop: 10, marginBottom: 20 },
  checkBoxParentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkBoxChild: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkBoxText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.secondary,
    fontSize: 16,
    marginLeft: 10,
  },
  buttonsBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 13,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchTextBox: {
    ...theme.font.fontMedium,
    fontSize: 15,
    marginLeft: 10,
    width: width * 0.8,
  },
});
