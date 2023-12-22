import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../../utils/theme";
const RowBox = ({ first, second, third, fourth }: any) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowBox}>
        <Text style={[styles.rowFirst, first === "Admin" && { color: "red" }]}>
          {first}
        </Text>
      </View>
      <View style={styles.rowBox}>
        <Text style={styles.rowText}>{second}</Text>
      </View>
      <View style={styles.rowBox}>
        <Text style={styles.rowText}>{third}</Text>
      </View>
      <View style={styles.rowBox}>
        <Text style={[styles.rowText, { textAlign: "right" }]}>{fourth}</Text>
      </View>
    </View>
  );
};
const ProfitTab = () => {
  const [profitTabOpen, setProfitTabOpen]: any = useState(true);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.profitHead}
        onPress={() => setProfitTabOpen(!profitTabOpen)}
      >
        <Text style={styles.profitText}>PROFIT</Text>
        <FontAwesome name="caret-down" size={25} color={theme.colors.white} />
      </TouchableOpacity>
      {profitTabOpen && (
        <>
          <RowBox
            first={"User Name"}
            second={"P&L"}
            third={"Brk"}
            fourth={"Total"}
          />
          <RowBox first={"Admin"} second={350} third={0} fourth={350} />
          <RowBox first={"Total"} second={350} third={0} fourth={350} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
  },
  profitHead: {
    padding: 7,
    backgroundColor: "#469924",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profitText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.white,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
  },
  rowFirst: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 13,
  },
  rowBox: {
    borderWidth: 0.5,
    borderColor: theme.colors.greyText,
    padding: 5,
    flex: 1,
  },
  rowText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 13,
    textAlign: "center",
  },
});
export default ProfitTab;
