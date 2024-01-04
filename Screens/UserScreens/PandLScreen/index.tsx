import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const HeaderBox = ({ title, value }: any) => {
  return (
    <View style={styles.resultBox}>
      <Text style={styles.smallText}>{title}</Text>
      <Text style={styles.redText}>{value?.toFixed(2)}</Text>
    </View>
  );
};
const PandLScreen = ({ navigation }: any) => {
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const searchBtnHandler = () => {};
  const resetHandler = () => {};
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"P & L"} />
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

      <View style={styles.mainTblBox}>
        <View style={styles.userNameBox}>
          <Text style={styles.smallText}>Username</Text>
          <Feather name="arrow-up" size={20} color="black" />
        </View>
        <HeaderBox title="Realised P&L" value={0} />
        <HeaderBox title="M2M P&L" value={0} />
        <HeaderBox title="Total" value={0} />
      </View>
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
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  mainTblBox: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
  },
  userNameBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
  resultBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  smallText: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
  },
  redText: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
    color: theme.colors.danger,
  },
});

export default PandLScreen;
