import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import { scriptQuantity } from "../../../store/Services/User";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const RowElements = ({
  first,
  second,
  third,
  fourth,
  fifth,
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
    </View>
  );
};

const ScriptQuantityScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [currentResponse, setCurrentResponse]: any = useState([]);
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [loading, setLoading]: any = useState(false);

  const SubmitBtnHandler = () => {
    if (exchangeValue !== "") {
      setLoading(true);
      scriptQuantity({
        query: {
          searchInput: exchangeValue,
          user_id: userDropDownVal,
        },
      })
        .then((res: any) => {
          setCurrentResponse(res.response);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Script Quantity"} />
      <FullScreenLoader loading={loading} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={currentUser?.exchange?.map((item: any) => {
            return { name: item };
          })}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          style={styles.dropDownMargin}
          search={false}
          fieldKey={"name"}
        />
        {currentUser?.user_type === "Master" && (
          <View style={{ marginBottom: 10 }}>
            <UserListDropDown
              userDropDownVal={userDropDownVal}
              setUserDropDownVal={setUserDropDownVal}
            />
          </View>
        )}

        <SmallBtnComponent title={"View"} onPress={SubmitBtnHandler} />
      </View>
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
          {currentResponse && currentResponse.length > 0 && (
            <RowElements
              first={"Symbol"}
              second={"Breakup qty"}
              third={"Max qty"}
              fourth={"Breakup Lot"}
              fifth={"Max Lot"}
            />
          )}
          {currentResponse.map((item: any) => (
            <RowElements
              key={item.id}
              first={item.identifier}
              second={item.breakup_qty}
              third={item.max_qty}
              fourth={item.breakup_lot}
              fifth={item.max_lot}
              exchangeValue={exchangeValue}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ScriptQuantityScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownMargin: {
    marginTop: 10,
  },
  rowStyle: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
  boxStyle: {
    width: 100,
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
