import React, { useState } from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { TextInput } from "react-native-paper";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";

const { width } = Dimensions.get("window");

const RowElement = ({ second, third }: any) => {
  return (
    <View style={styles.rowElementStyle}>
      <View style={[styles.box, { flex: 1 }]}>
        <CheckBoxComponent />
      </View>
      <View
        style={[
          styles.box,
          { flex: 6, alignItems: "flex-start", paddingLeft: 10 },
        ]}
      >
        <Text style={styles.defaultText}>{second}</Text>
      </View>
      <View style={[styles.box, { flex: 3 }]}>
        <Text style={styles.defaultText}>{third}</Text>
      </View>
    </View>
  );
};

const TradeMarginScreen = ({ navigation, route }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [typeBase, setTypeBase]: any = useState("Percentage");
  const [amountVal, setAmountVal]: any = useState("");

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title="Trade Margin Setting" />
      <FlatList
        data={[1, 2]}
        ListHeaderComponent={
          <>
            <View style={styles.firstRow}>
              <DropDownComponent
                data={route?.params?.exchange?.map((item: any) => {
                  return { name: item.toUpperCase() };
                })}
                value={exchangeValue}
                setValue={setExchangeValue}
                placeholder={"Exchange"}
                search={false}
                fieldKey={"name"}
                style={styles.dropDown}
              />
              <DropDownComponent
                data={[{ name: "Percentage" }, { name: "Amount" }]}
                value={typeBase}
                setValue={setTypeBase}
                search={false}
                fieldKey={"name"}
                style={styles.dropDown}
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
            <RowElement second="Script Name" third="Trade Margin" />
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
  thirdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  amountInput: {
    width: width * 0.47,
    height: 40,
    marginBottom: 10,
  },
  clearBtn: {
    width: width * 0.2,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  firstRow: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDown: {
    width: width * 0.46,
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
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 13,
  },
});

export default TradeMarginScreen;
