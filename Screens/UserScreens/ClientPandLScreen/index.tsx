import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import theme from "../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const { width } = Dimensions.get("window");

const ClientDropDownComp = ({ dropDownOpen, setDropDownOpen }: any) => {
  return (
    <View style={styles.mainDropContainer}>
      <TouchableOpacity
        style={styles.totalBox}
        onPress={() => setDropDownOpen(!dropDownOpen)}
      >
        <View style={styles.totalBox2}>
          {dropDownOpen ? (
            <Entypo name="chevron-up" size={25} color={theme.colors.danger} />
          ) : (
            <Entypo name="chevron-down" size={25} color={theme.colors.danger} />
          )}
          <Text style={styles.headerText}>Total</Text>
        </View>
        <Text style={styles.headerText}>0</Text>
      </TouchableOpacity>

      {dropDownOpen && (
        <View style={styles.tableBox}>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M P&L:</Text>
            <Text style={styles.basicText}>{0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Realised P&L:</Text>
            <Text style={styles.basicText}>{0}</Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M % Net P&L:</Text>
            <Text style={styles.basicText}>{0}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const ClientPandLScreen = ({ navigation }: any) => {
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [dropDownOpen, setDropDownOpen]: any = useState(false);

  const searchBtnHandler = () => {};
  const resetHandler = () => {};
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Client P & L"} />
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

      <ClientDropDownComp
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
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
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
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

export default ClientPandLScreen;
