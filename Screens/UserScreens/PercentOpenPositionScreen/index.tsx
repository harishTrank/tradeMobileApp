import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import { useUserCoinList } from "../../../hooks/TradeCoin/query";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";

const { width } = Dimensions.get("window");

const PercentOpenPositionScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const userCoinListApi: any = useUserCoinList({});
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const searchBtnHandler = () => {};
  const resetHandler = () => {};
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"% Open Position"} />

      <View style={styles.mainBox}>
        <DropDownComponent
          data={currentUser?.exchange?.map((item: any) => {
            return { name: item };
          })}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          search={false}
          style={styles.dropDownStyle}
          fieldKey={"name"}
        />
        <DropDownComponent
          data={
            userCoinListApi?.data?.response.filter((filterObj: any) => {
              return filterObj.coin_name.includes(exchangeValue);
            }) || []
          }
          value={selectScript}
          setValue={setSelectScript}
          placeholder={"Select Script"}
          search={true}
          style={styles.dropDownStyle}
          fieldKey={"coin_name"}
        />
      </View>

      <View style={styles.btnStyleBox}>
        <>
          {currentUser?.user_type === "Master" && (
            <View style={{ width: "45%", marginLeft: 10 }}>
              <UserListDropDown
                userDropDownVal={userDropDownVal}
                setUserDropDownVal={setUserDropDownVal}
              />
            </View>
          )}
        </>
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
            title={"Reset"}
            onPress={resetHandler}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dropDownStyle: {
    width: width * 0.46,
  },
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBtn: {
    width: width * 0.215,
  },
});

export default PercentOpenPositionScreen;
