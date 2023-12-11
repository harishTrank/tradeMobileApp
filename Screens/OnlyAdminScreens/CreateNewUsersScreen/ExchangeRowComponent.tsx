import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";

const { width } = Dimensions.get("window");

const ExchangeRowComponent = ({
  exchangeAllowance,
  // dropDownValue,
  // setDropDownValue,
  type,
  setExchangeAllowance,
}: any) => {
  const exchangeAllowanceHandler = (key: any, type: any) => {
    setExchangeAllowance((oldValue: any) => {
      return type === "first"
        ? {
            ...oldValue,
            [key]: {
              [type]: !oldValue[key][type],
              second: !oldValue[key][type],
              third: !oldValue[key][type],
            },
          }
        : type === "second"
        ? {
            ...oldValue,
            [key]: {
              ...oldValue[key],
              second: !oldValue[key].second,
            },
          }
        : {
            ...oldValue,
            [key]: {
              ...oldValue[key],
              third: !oldValue[key].third,
            },
          };
    });
  };
  return (
    <View style={styles.tableRow}>
      <View style={[styles.center, { flexDirection: "row" }]}>
        <CheckBoxComponent
          value={exchangeAllowance[type].first}
          setValue={() => exchangeAllowanceHandler(type, "first")}
        />
        <Text style={styles.exchangeRowText}>{type.toUpperCase()}</Text>
      </View>
      <View style={styles.centerSecond}>
        <CheckBoxComponent
          value={exchangeAllowance[type].second}
          setValue={() => exchangeAllowanceHandler(type, "second")}
          disabled={!exchangeAllowance[type].first}
        />
      </View>
      <View style={styles.centerSecond}>
        <CheckBoxComponent
          value={exchangeAllowance[type].third}
          setValue={() => exchangeAllowanceHandler(type, "third")}
          disabled={!exchangeAllowance[type].first}
        />
      </View>
      {/* 
      <DropDownComponent
        data={[{ name: "test" }, { name: "test1" }]}
        value={dropDownValue}
        setValue={setDropDownValue}
        style={styles.tableDropDown}
        placeholder={"Test"}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 13,
  },
  headingExtra: {
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.secondary,
    paddingBottom: 5,
  },
  tableText: {
    ...theme.font.fontRegular,
    color: theme.colors.secondary,
    fontSize: 12,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.22,
  },
  centerSecond: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
  },
  exchangeRowText: {
    marginLeft: 5,
    color: theme.colors.secondary,
    ...theme.font.fontMedium,
  },
  tableDropDown: {
    width: width * 0.35,
    borderColor: theme.colors.primary,
    backgroundColor: "#FFF",
  },
});

export default ExchangeRowComponent;
