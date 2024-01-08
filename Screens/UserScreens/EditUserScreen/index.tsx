import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import Toast from "react-native-toast-message";
import { useEditUserCase } from "../../../hooks/User/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import InputComponent from "../../OnlyAdminScreens/CreateNewUsersScreen/InputComponent";
import ExchangeRowComponent from "../../OnlyAdminScreens/CreateNewUsersScreen/ExchangeRowComponent";
import { useUserDetailsView } from "../../../hooks/User/query";

const { width } = Dimensions.get("window");

const inputFields = [
  { key: "name", name: "Name", required: true },
  { key: "userName", name: "Username", required: true },
  { key: "password", name: "Password", required: false, eye: true },
  { key: "cPassword", name: "Retype Password", required: false, eye: true },
  { key: "mobileNumber", name: "Mobile Number", required: false },
  { key: "city", name: "City", required: false },
  { key: "credit", name: "Credit", required: true },
  { key: "remark", name: "Remark", required: false },
];

const EditUserScreen = ({ navigation, route }: any) => {
  const userDetailsApi: any = useUserDetailsView({
    query: {
      user_id: route?.params?.user_id,
    },
  });
  const [userType, setUserType]: any = useState("Client");
  const [fullScreenLoader, setFullScreenLoader]: any = useState(false);
  const [userProfileData] = useAtom(currentUserData);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      userDetailsApi?.refetch();
    });
  }, [navigation]);

  const [personalDetails, setPersonalDetails]: any = useState({
    name: "",
    userName: "",
    password: "",
    cPassword: "",
    mobileNumber: "",
    city: "",
    credit: "",
    remark: "",
  });
  const [exchangeAllowance, setExchangeAllowance]: any = useState({
    mcx: { first: false, second: false, third: false },
    nse: { first: false, second: false, third: false },
    mini: { first: false, second: false, third: false },
  });

  const [addMaster, setAddMaster]: any = useState(false);
  const [changePassword, setChangePassword]: any = useState(true);
  const [tradeLimit, setTradeLimit]: any = useState({
    mcx: false,
    nse: false,
    mini: false,
  });

  const editUserApi: any = useEditUserCase();

  useEffect(() => {
    if (userDetailsApi?.data) {
      setPersonalDetails({
        name: `${userDetailsApi?.data?.data?.full_name || ""}`,
        userName: `${userDetailsApi?.data?.data?.user_name || ""}`,
        password: "",
        cPassword: "",
        mobileNumber: `${userDetailsApi?.data?.data?.phone_number || ""}`,
        city: `${userDetailsApi?.data?.data?.city || ""}`,
        credit: `${userDetailsApi?.data?.data?.credit || ""}`,
        remark: `${userDetailsApi?.data?.data?.remark || ""}`,
      });

      setTradeLimit({
        mcx: userDetailsApi?.data?.data?.mcx,
        nse: userDetailsApi?.data?.data?.nse,
        mini: userDetailsApi?.data?.data?.mini,
      });

      const mcxDetails: any = userDetailsApi?.data?.data?.la_lodu?.find(
        (findItem: any) => findItem?.symbol_name?.toUpperCase() === "MCX"
      );
      const nseDetails: any = userDetailsApi?.data?.data?.la_lodu?.find(
        (findItem: any) => findItem?.symbol_name?.toUpperCase() === "NSE"
      );
      const miniDetails: any = userDetailsApi?.data?.data?.la_lodu?.find(
        (findItem: any) => findItem?.symbol_name?.toUpperCase() === "MINI"
      );
      setExchangeAllowance({
        mcx: {
          first: mcxDetails.exchange,
          second: mcxDetails.turnover,
          third: mcxDetails.symbols,
        },
        nse: {
          first: nseDetails.exchange,
          second: nseDetails.turnover,
          third: nseDetails.symbols,
        },
        mini: {
          first: miniDetails.exchange,
          second: miniDetails.turnover,
          third: miniDetails.symbols,
        },
      });
    }
  }, [userDetailsApi?.data]);

  const createUserHandler = () => {
    if (personalDetails.name === "") {
      return Toast.show({
        type: "error",
        text1: "Name Field is required.",
      });
    } else if (personalDetails.userName === "") {
      return Toast.show({
        type: "error",
        text1: "User name Field is required.",
      });
    } else if (personalDetails.password !== personalDetails.cPassword) {
      return Toast.show({
        type: "error",
        text1: "Password or confirm password must match.",
      });
    } else if (
      !exchangeAllowance.mcx.first &&
      !exchangeAllowance.nse.first &&
      !exchangeAllowance.mini.first
    ) {
      return Toast.show({
        type: "error",
        text1: "Please Allow atleast one exchange.",
      });
    } else {
      setFullScreenLoader(true);
      editUserApi
        ?.mutateAsync({
          query: route?.params,
          body: {
            full_name: personalDetails.name,
            user_name: personalDetails.userName,
            phone_number: personalDetails.mobileNumber,
            city: personalDetails.city,
            credit: personalDetails.credit,
            remark: personalDetails.remark,
            mcx: tradeLimit.mcx,
            nse: tradeLimit.nse,
            mini: tradeLimit.mini,
            password: personalDetails.password,
            change_password: false,
            mcx_exchange: exchangeAllowance.mcx.first,
            mcx_symbol: exchangeAllowance.mcx.third,
            mcx_turnover: exchangeAllowance.mcx.second,
            nse_exchange: exchangeAllowance.nse.first,
            nse_symbol: exchangeAllowance.nse.third,
            nse_turnover: exchangeAllowance.nse.second,
            mini_exchange: exchangeAllowance.mini.first,
            mini_symbol: exchangeAllowance.mini.third,
            mini_turnover: exchangeAllowance.mini.second,
          },
        })
        .then((res: any) => {
          setFullScreenLoader(false);
          navigation.goBack();
          return Toast.show({
            type: "success",
            text1: res.message,
          });
        })
        .catch((err: any) => {
          setFullScreenLoader(false);
          return Toast.show({
            type: "error",
            text1: err.data?.message,
          });
        });
    }
  };

  return (
    <View
      style={[styles.screen, { paddingBottom: useSafeAreaInsets().bottom }]}
    >
      <FullScreenLoader loading={fullScreenLoader} />
      <BasicHeader navigation={navigation} title={"Update User"} />
      <ScrollView
        style={styles.scrollScreen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.secondHeader}>
          <Text style={styles.headingText}>User Type</Text>
          <DropDownComponent
            data={[{ name: "Client" }, { name: "Master" }]}
            value={userType}
            setValue={setUserType}
            style={styles.dropDown}
            fieldKey={"name"}
            disable={true}
          />
        </View>

        <View>
          <View style={styles.lightBox}>
            <Text style={styles.personalDetail}>Personal Details</Text>
            {inputFields.map((item: any) => (
              <InputComponent
                key={item.key}
                title={item.name}
                required={item.required}
                setPersonalDetails={setPersonalDetails}
                personalDetails={personalDetails}
                currentKey={item.key}
                eye={item?.eye}
              />
            ))}
          </View>

          <View style={styles.lightBox}>
            <Text style={styles.personalDetail}>Exchange Allow</Text>
            <View style={styles.tableBox}>
              <View style={[styles.tableRow, styles.headingExtra]}>
                <Text style={styles.tableText}>Exchange</Text>
                <Text style={styles.tableText}>{"Turnover\n(%)"}</Text>
                <Text style={styles.tableText}>{"Symbol\n(%)"}</Text>
              </View>

              {userProfileData?.exchange?.map((mapItem: any, index: any) => {
                return (
                  <ExchangeRowComponent
                    key={index}
                    exchangeAllowance={exchangeAllowance}
                    setExchangeAllowance={setExchangeAllowance}
                    type={mapItem.toLowerCase()}
                  />
                );
              })}
            </View>
          </View>

          <View style={styles.lightBox}>
            <Text style={styles.personalDetail}>
              High Low Between Trade Limit
            </Text>

            <View style={styles.tradeLimitBox}>
              {userProfileData?.exchange.map((itemValue: any) => (
                <View key={itemValue} style={styles.tradeLimitRow}>
                  <CheckBoxComponent
                    disabled={!exchangeAllowance[itemValue.toLowerCase()].first}
                    value={tradeLimit[itemValue.toLowerCase()]}
                    setValue={(value: any) => {
                      setTradeLimit((oldValue: any) => {
                        return {
                          ...oldValue,
                          [itemValue.toLowerCase()]: value,
                        };
                      });
                    }}
                  />
                  <Text style={styles.tradeLimitText}>{itemValue}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.lightBox}>
            <View style={styles.bottomRowBox}>
              <Text style={styles.rowBoxText}>Add Master</Text>
              <CheckBoxComponent
                disabled={true}
                value={addMaster}
                setValue={setAddMaster}
              />
            </View>
            <View style={styles.bottomRowBox}>
              <Text style={styles.rowBoxText}>
                Change password on first login
              </Text>
              <CheckBoxComponent
                value={changePassword}
                setValue={setChangePassword}
              />
            </View>
          </View>

          <SmallBtnComponent
            style={{ margin: 10 }}
            title={"CREATE"}
            onPress={createUserHandler}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollScreen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  secondHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  dropDown: {
    width: width * 0.45,
    borderColor: theme.colors.lightGrey,
  },
  headingText: {
    ...theme.font.fontMedium,
    fontSize: 16,
    color: theme.colors.black,
  },
  lightBox: {
    backgroundColor: theme.colors.lightGrey,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  personalDetail: {
    ...theme.font.fontMedium,
    color: theme.colors.secondary,
  },
  tableBox: {
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    marginTop: 5,
    flex: 1,
  },
  tableRow: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
  },
  headingExtra: {
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.secondaryLight,
    paddingBottom: 5,
  },
  tableText: {
    ...theme.font.fontRegular,
    color: theme.colors.secondary,
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  bottomRowBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  rowBoxText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.secondary,
    fontSize: 15,
  },
  tradeLimitBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tradeLimitRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.43,
    paddingVertical: 5,
  },
  tradeLimitText: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
    color: theme.colors.secondary,
    marginLeft: 10,
  },
});

export default EditUserScreen;
