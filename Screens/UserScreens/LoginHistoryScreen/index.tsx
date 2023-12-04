import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TextInput } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { dropDownData } from "../UserUtils";
import { FontAwesome } from "@expo/vector-icons";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const { width } = Dimensions.get("window");

const LoginHistoryScreen = ({ navigation }: any) => {
  const [selectedWeek, setSelectedWeek]: any = useState("");
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const [searchIconColorState, setSearchIconColorState]: any = useState(
    theme.colors.greyText
  );

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Login History"} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={dropDownData}
          value={selectedWeek}
          setValue={setSelectedWeek}
          placeholder={"Please select week of period"}
          search={false}
          style={styles.dropDownMargin}
          fieldKey={"name"}
        />

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
      </View>
    </View>
  );
};

export default LoginHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
  },
  dropDownMargin: { marginTop: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
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
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonBtn: {
    width: width * 0.4,
  },
});
