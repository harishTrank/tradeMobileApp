import React, { useState } from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { TextInput } from "react-native-paper";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";

const { width } = Dimensions.get("window");

const SelectOptionComponent = ({
  title,
  currentSelection,
  setCurrentSelection,
}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnSelect,
        currentSelection === title && {
          borderColor: theme.colors.primary,
        },
      ]}
      onPress={() => setCurrentSelection(title)}
    >
      <Text
        style={[
          styles.btnText,
          currentSelection === title && {
            color: theme.colors.primary,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const RowElement = ({ second, third }: any) => {
  return (
    <View style={styles.rowElementStyle}>
      <View style={[styles.box, { flex: 1 }]}>
        <CheckBoxComponent />
      </View>
      <View
        style={[
          styles.box,
          { flex: 7, alignItems: "flex-start", paddingLeft: 10 },
        ]}
      >
        <Text style={styles.defaultText}>{second}</Text>
      </View>
      <View style={[styles.box, { flex: 2 }]}>
        <Text style={styles.defaultText}>{third}</Text>
      </View>
    </View>
  );
};

const BrkSettingScreen = ({ navigation, route }: any) => {
  const [currentSelection, setCurrentSelection]: any =
    useState("TURNOVER WISE");
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [amountVal, setAmountVal]: any = useState("");
  return (
    <View style={styles.screen}>
      <BasicHeader title="Brk Setting" navigation={navigation} />
      <FlatList
        data={[1, 2]}
        ListHeaderComponent={
          <>
            <View style={styles.headerMainBox}>
              <View style={styles.btnSelection}>
                <SelectOptionComponent
                  setCurrentSelection={setCurrentSelection}
                  currentSelection={currentSelection}
                  title="TURNOVER WISE"
                />
                <SelectOptionComponent
                  title="LOT WISE"
                  setCurrentSelection={setCurrentSelection}
                  currentSelection={currentSelection}
                />
              </View>
              <View style={styles.secondRow}>
                <DropDownComponent
                  data={route?.params?.exchange?.map((item: any) => {
                    return { name: item.toUpperCase() };
                  })}
                  value={exchangeValue}
                  setValue={setExchangeValue}
                  placeholder={"Exchange"}
                  style={styles.dropDownMargin}
                  search={false}
                  fieldKey={"name"}
                />
                <SmallBtnComponent
                  title="Clear"
                  onPress={() => console.log("clear")}
                  style={styles.clearBtn}
                  textColor={theme.colors.black}
                  fontStyle={theme.font.fontMedium}
                />
              </View>

              <View style={styles.thirdRow}>
                <TextInput
                  label="Amount"
                  theme={{ roundness: 5 }}
                  value={amountVal}
                  mode="outlined"
                  onChangeText={setAmountVal}
                  style={styles.amountInput}
                  keyboardType="numeric"
                />
                <SmallBtnComponent
                  title="Apply"
                  onPress={() => console.log("Apply")}
                  fontStyle={theme.font.fontMedium}
                  style={[
                    styles.clearBtn,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <SmallBtnComponent
                  title="Update"
                  onPress={() => console.log("Update")}
                  style={styles.clearBtn}
                  fontStyle={theme.font.fontMedium}
                  textColor={theme.colors.black}
                />
              </View>
            </View>
            <RowElement second="Script Name" third="Brk" />
          </>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item}
        renderItem={({ item }: any) => (
          <RowElement second="AARTIIND" third="10.0" />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerMainBox: {
    margin: 5,
    marginVertical: 10,
  },
  btnSelection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  btnSelect: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: theme.colors.black,
  },
  btnText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownMargin: {
    width: width * 0.47,
    margin: 5,
    marginTop: 10,
    marginRight: 10,
  },
  clearBtn: {
    width: width * 0.2,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginTop: 5,
  },
  thirdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  amountInput: {
    width: width * 0.47,
    height: 40,
  },
  rowElementStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  box: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
});

export default BrkSettingScreen;
