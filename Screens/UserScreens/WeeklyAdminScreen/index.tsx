import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HearderBox = ({ text }: any) => {
  return (
    <View style={styles.headerCard}>
      <Text style={styles.headerText}>{text}</Text>
      <FontAwesome5 name="arrow-down" size={16} color="black" />
    </View>
  );
};

const WeeklyAdminScreen = ({ navigation }: any) => {
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const searchBtnHandler = () => {};
  const resetHandler = () => {};
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"% Weekly Admin"} />
      <View style={styles.btnStyleBox}>
        <View style={{ width: "45%", marginLeft: 10 }}>
          <UserListDropDown
            userDropDownVal={userDropDownVal}
            setUserDropDownVal={setUserDropDownVal}
          />
        </View>
        <>
          <SmallBtnComponent
            style={styles.buttonBtn}
            title={"Search"}
            onPress={searchBtnHandler}
          />
          <SmallBtnComponent
            style={{
              ...styles.buttonBtn,
              ...{ marginLeft: 5, marginRight: 15 },
            }}
            title={"Clear"}
            onPress={resetHandler}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </>
      </View>

      <FlatList
        data={[1, 2, 4]}
        ListHeaderComponent={
          <View style={styles.rowStyle}>
            <HearderBox text={"Realised P&L"} />
            <HearderBox text={"M2M P&L"} />
            <HearderBox text={"Total P&L"} />
          </View>
        }
        style={styles.flatlistStyle}
        keyExtractor={(item: any) => item}
        renderItem={({ item }: any) => {
          return (
            <View>
              <Text></Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBtn: {
    width: width * 0.215,
  },
  flatlistStyle: {
    margin: 10,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    ...theme.font.fontSemiBold,
    marginRight: 5,
  },
});

export default WeeklyAdminScreen;
