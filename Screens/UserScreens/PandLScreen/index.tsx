import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import { useGetWeeklyAdmin } from "../../../hooks/TradeCoin/query";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width, height } = Dimensions.get("window");
const HeaderBox = ({ title, value }: any) => {
  return (
    <View style={styles.resultBox}>
      <Text style={styles.smallText}>{title}</Text>
      <Text style={styles.redText}>{value?.toFixed(2)}</Text>
    </View>
  );
};

const RowElement = ({ item }: any) => {
  return (
    <View style={styles.itemBox}>
      <Text style={styles.itemText}>{item?.user_summary__user_name}</Text>
      <Text
        style={[
          styles.itemText,
          { color: item?.total_amount > 0 ? "green" : theme.colors.danger },
        ]}
      >
        {Number(item?.total_amount)?.toFixed(2)}
      </Text>
      <Text style={styles.itemText}>0.00</Text>
      <Text
        style={[
          styles.itemText,
          { color: item?.total_amount > 0 ? "green" : theme.colors.danger },
        ]}
      >
        {Number(item?.total_amount)?.toFixed(2)}
      </Text>
    </View>
  );
};
const PandLScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [submitResponse, setSubmitResponse]: any = useState("");
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const getweeklyAdmin: any = useGetWeeklyAdmin({
    query: {
      user_name:
        submitResponse !== "" ? submitResponse : currentUser?.user_name,
    },
  });
  const searchBtnHandler = () => {
    setSubmitResponse(userDropDownVal);
  };
  const resetHandler = () => {
    setUserDropDownVal("");
    setSubmitResponse("");
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"P & L"} />
      <FullScreenLoader
        loading={getweeklyAdmin?.isLoading || getweeklyAdmin?.isFetching}
      />
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
      {getweeklyAdmin?.data && (
        <FlatList
          data={getweeklyAdmin?.data?.release_p_and_l || []}
          ListHeaderComponent={
            <View style={styles.mainTblBox}>
              <View style={styles.userNameBox}>
                <Text style={styles.smallText}>Username</Text>
                <Feather name="arrow-up" size={20} color="black" />
              </View>
              <HeaderBox title="Realised P&L" value={0} />
              <HeaderBox title="M2M P&L" value={0} />
              <HeaderBox title="Total" value={0} />
            </View>
          }
          keyExtractor={(item: any) => item.user_summary__id}
          renderItem={({ item }: any) => <RowElement item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyDataBox}>
              <Text style={styles.emptyText}>No Record found!</Text>
            </View>
          }
        />
      )}
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
    marginHorizontal: 10,
    marginTop: 10,
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
  tableDetals: {
    margin: 10,
  },
  itemBox: {
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
  },
  itemText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 13,
    flex: 1,
    textAlign: "center",
  },
  emptyDataBox: {
    height: height * 0.55,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: theme.colors.danger,
    ...theme.font.fontMedium,
    fontSize: 15,
  },
});

export default PandLScreen;
