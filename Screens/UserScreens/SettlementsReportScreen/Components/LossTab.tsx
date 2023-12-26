import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../../utils/theme";
const RowBox = ({ first, second, third, fourth }: any) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowBox}>
        <Text style={styles.rowFirst}>{first}</Text>
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
const LossTab = ({ data }: any) => {
  const [lossTabOpen, setLossTabOpen]: any = useState(true);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.profitHead}
        onPress={() => setLossTabOpen(!lossTabOpen)}
      >
        <Text style={styles.profitText}>LOSS</Text>
        <FontAwesome name="caret-down" size={25} color={theme.colors.white} />
      </TouchableOpacity>
      {lossTabOpen && (
        <>
          <RowBox
            first={"User Name"}
            second={"P&L"}
            third={"Brk"}
            fourth={"Total"}
          />
          {/* <RowBox first={"My PL"} second={0} third={0} fourth={-350} />
          <RowBox first={"My Brokerage"} second={0} third={0} fourth={0} /> */}
          <RowBox
            first={"Total"}
            second={data?.[0]?.total_amount?.toFixed(2) || 0}
            third={data?.[1]?.total_amount?.toFixed(2) || 0}
            fourth={(
              (parseFloat(data?.[0]?.total_amount) || 0) +
              (parseFloat(data?.[1]?.total_amount) || 0)
            ).toFixed(2)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  profitHead: {
    padding: 7,
    backgroundColor: "red",
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
export default LossTab;
