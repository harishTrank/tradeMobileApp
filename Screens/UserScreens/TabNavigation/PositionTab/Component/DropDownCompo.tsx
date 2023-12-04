import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import theme from "../../../../../utils/theme";

const DropDownCompo = ({
  dropDownOpen,
  setDropDownOpen,
  totalBalance,
}: any) => {
  return (
    <View style={styles.mainDropContainer}>
      <TouchableOpacity
        style={styles.totalBox}
        onPress={() => setDropDownOpen(!dropDownOpen)}
      >
        <View style={styles.totalBox2}>
          {dropDownOpen ? (
            <Entypo
              name="chevron-up"
              size={25}
              color={totalBalance > 0 ? "green" : theme.colors.danger}
            />
          ) : (
            <Entypo
              name="chevron-down"
              size={25}
              color={totalBalance > 0 ? "green" : theme.colors.danger}
            />
          )}
          <Text
            style={[styles.headerText, totalBalance > 0 && { color: "green" }]}
          >
            Total
          </Text>
        </View>
        <Text
          style={[styles.headerText, totalBalance > 0 && { color: "green" }]}
        >
          {totalBalance.toFixed(2)}
        </Text>
      </TouchableOpacity>

      {dropDownOpen && (
        <View style={styles.tableBox}>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M P&L:</Text>
            <Text style={styles.basicText}>456</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Realised P&L:</Text>
            <Text style={styles.basicText}>1234</Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>Credit:</Text>
            <Text style={styles.basicText}>234</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.basicText}>Equity:</Text>
            <Text style={styles.basicText}>355</Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>Margin Used:</Text>
            <Text style={styles.basicText}>143</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Free margin:</Text>
            <Text style={styles.basicText}>322</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainDropContainer: {
    backgroundColor: theme.colors.white,
    margin: 10,
    borderRadius: 10,
    ...theme.elevationHeavy,
  },
  totalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  totalBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: 15,
    color: theme.colors.danger,
  },
  tableBox: {},
  row: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
});

export default DropDownCompo;
