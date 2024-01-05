import React from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import theme from "../../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const RowElements = ({
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  exchangeValue,
}: any) => {
  return (
    <View style={styles.rowStyle}>
      <View style={[styles.boxStyle, { width: 120 }]}>
        <Text style={styles.boxText}>
          {first === "Symbol"
            ? first
            : exchangeValue === "NSE"
            ? first
            : first.split("_")[1]}
        </Text>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.boxText,
            second > 0 && { color: "green" },
            second < 0 && { color: "red" },
          ]}
        >
          {second}
        </Text>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.boxText,
            third > 0 && { color: "green" },
            third < 0 && { color: "red" },
          ]}
        >
          {third}
        </Text>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.boxText,
            fourth > 0 && { color: "green" },
            fourth < 0 && { color: "red" },
          ]}
        >
          {fourth}
        </Text>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.boxText,
            fifth > 0 && { color: "green" },
            fifth < 0 && { color: "red" },
          ]}
        >
          {fifth}
        </Text>
      </View>
      <View style={styles.boxStyle}>
        <Text
          style={[
            styles.boxText,
            sixth > 0 && { color: "green" },
            sixth < 0 && { color: "red" },
          ]}
        >
          {sixth}
        </Text>
      </View>
    </View>
  );
};

const ViewGroupQuantityScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <BasicHeader
        navigation={navigation}
        title="Group Quantity Settings Details"
      />

      <ScrollView
        style={styles.scrollStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: useSafeAreaInsets().bottom,
          }}
        >
          <RowElements
            first={"Symbol"}
            second={"Lot Size"}
            third={"Breakup QTY"}
            fourth={"Max QTY"}
            fifth={"Breakup LOT"}
            sixth={"LOT Max"}
          />
          <RowElements
            key={"AARTIIND"}
            first={"AARTIIND"}
            second={1000}
            third={0}
            fourth={0}
            fifth={0}
            sixth={0}
            exchangeValue={"NSE"}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  rowStyle: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  boxStyle: {
    width: 110,
    height: 40,
    padding: 10,
    borderWidth: 0.5,
    borderColor: theme.colors.lightBackground,
  },
  boxText: {
    ...theme.font.fontRegular,
    fontSize: 13,
    color: theme.colors.black,
  },
  scrollStyle: {
    marginTop: 20,
  },
});

export default ViewGroupQuantityScreen;
