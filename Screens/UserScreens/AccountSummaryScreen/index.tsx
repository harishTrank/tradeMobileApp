import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { DatePickerModal } from "react-native-paper-dates";
import {
  useAccountSummary,
  useAccountSummaryCredit,
} from "../../../hooks/User/query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import RenderItem from "./Components/RenderItem";
import UserListDropDown from "./Components/UserListDropDown";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";

const { width, height } = Dimensions.get("window");

const AccountSummaryScreen = ({ navigation }: any) => {
  const [toggleCheckBoxs, setToggleCheckBoxs] = useState({
    pAndL: true,
    brk: true,
    credit: false,
  });
  const [toggleCheckBoxsFinal, setToggleCheckBoxsFinal] = useState({
    pAndL: true,
    brk: true,
    credit: false,
  });
  const [viewBtnSetData, setviewBtnSetData]: any = useState({
    from_date: "",
    to_date: "",
    coin_name: "",
    pAndL: true,
    brk: true,
    user_name: "",
  });

  const [currentPage, setCurrentPage]: any = useState(1);
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const [searchIconColorState, setSearchIconColorState]: any = useState(
    theme.colors.greyText
  );
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [currentUserDetails]: any = useAtom(currentUserData);

  const accountSummaryApi: any = useAccountSummary({
    query: {
      page: currentPage,
      from_date:
        viewBtnSetData.startDate && viewBtnSetData.startDate !== ""
          ? dayjs(viewBtnSetData.startDate).format("YYYY-MM-DD")
          : "",
      to_date:
        viewBtnSetData.endDate && viewBtnSetData.endDate !== ""
          ? dayjs(viewBtnSetData.endDate).format("YYYY-MM-DD")
          : "",
      coin_name: searchExchangeText,
      p_and_l: viewBtnSetData.pAndL,
      brk: viewBtnSetData.brk,
      user_name: viewBtnSetData.user_name,
    },
  });

  const accountSummaryCredit: any = useAccountSummaryCredit({
    query: {
      page: currentPage,
      from_date:
        viewBtnSetData.startDate && viewBtnSetData.startDate !== ""
          ? dayjs(viewBtnSetData.startDate).format("YYYY-MM-DD")
          : "",
      to_date:
        viewBtnSetData.endDate && viewBtnSetData.endDate !== ""
          ? dayjs(viewBtnSetData.endDate).format("YYYY-MM-DD")
          : "",
      coin_name: searchExchangeText,
      user_name: viewBtnSetData.user_name,
    },
  });

  const [accountSummaryList, setAccountSummaryList]: any = useState([]);
  const [loading, setLoading]: any = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setviewBtnSetData((oldValue: any) => {
        return { ...oldValue, coin_name: searchExchangeText };
      });
      if (toggleCheckBoxsFinal.credit) {
        accountSummaryCredit.refetch();
      } else {
        accountSummaryApi.refetch();
      }
    }, 700);
  }, [searchExchangeText]);

  useEffect(() => {
    if (
      !accountSummaryApi?.isFetching &&
      !accountSummaryApi.isLoading &&
      accountSummaryApi?.data?.results &&
      !toggleCheckBoxsFinal.credit
    ) {
      if (currentPage === 1) {
        setAccountSummaryList(accountSummaryApi.data.results);
      } else {
        setAccountSummaryList((oldValue: any) => {
          return [...oldValue, ...accountSummaryApi.data.results].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id)
          );
        });
      }
      setLoading(false);
    } else if (
      !accountSummaryCredit?.isFetching &&
      !accountSummaryCredit.isLoading &&
      accountSummaryCredit?.data?.results &&
      toggleCheckBoxsFinal.credit
    ) {
      if (currentPage === 1) {
        setAccountSummaryList(accountSummaryCredit.data.results);
      } else {
        setAccountSummaryList((oldValue: any) => {
          return [...oldValue, ...accountSummaryCredit.data.results].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id)
          );
        });
      }
    }
  }, [
    accountSummaryApi?.data?.results,
    accountSummaryCredit?.data?.results,
    currentPage,
    accountSummaryApi?.isFetching,
    accountSummaryCredit?.isFetching,
  ]);

  const onEndReached = () => {
    if (
      accountSummaryApi?.data?.total &&
      currentPage < accountSummaryApi?.data?.total &&
      !toggleCheckBoxsFinal.credit
    ) {
      setCurrentPage(currentPage + 1);
    } else if (
      accountSummaryCredit?.data?.total &&
      currentPage < accountSummaryCredit?.data?.total &&
      toggleCheckBoxsFinal.credit
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchBtnHandler = () => {
    setLoading(true);
    setCurrentPage(1);
    setToggleCheckBoxsFinal(toggleCheckBoxs);
    setviewBtnSetData({
      from_date: range.startDate || "",
      to_date: range.endDate || "",
      coin_name: searchExchangeText || "",
      pAndL: toggleCheckBoxs?.pAndL,
      brk: toggleCheckBoxs?.brk,
      user_name: userDropDownVal,
    });
    setLoading(false);
  };

  const resetHandler = () => {
    setviewBtnSetData({
      startDate: "",
      endDate: "",
      coin_name: "",
      ex_change: "",
      user_name: "",
    });
    setRange({
      startDate: undefined,
      endDate: undefined,
    });
    setSearchExchangeText("");
    setUserDropDownVal("");
  };

  const setToggleHandler = (value: any, key: any) => {
    setToggleCheckBoxs((oldValue: any) => {
      if (key === "credit") {
        return {
          ...oldValue,
          credit: value,
          brk: !value,
          pAndL: !value,
        };
      } else {
        return {
          ...oldValue,
          [key]: value,
          credit: false,
        };
      }
    });
  };

  // date picker case working
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: any) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
  // ------------------------------

  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loading} />
      <BasicHeader navigation={navigation} title={"Account Summary"} />
      <View style={styles.dateBox}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.datePersonalBox}
        >
          <MaterialIcons
            name="date-range"
            size={24}
            color={theme.colors.secondary}
          />
          <Text style={styles.dateText}>
            {range?.startDate
              ? dayjs(`${range?.startDate}`).format("DD/MM/YYYY")
              : "From Date"}
          </Text>
        </TouchableOpacity>

        <DatePickerModal
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          validRange={{ endDate: new Date() }}
        />

        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.datePersonalBox}
        >
          <MaterialIcons
            name="date-range"
            size={24}
            color={theme.colors.secondary}
          />
          <Text style={styles.dateText}>
            {range?.endDate
              ? dayjs(`${range?.endDate}`).format("DD/MM/YYYY")
              : "To Date"}
          </Text>
        </TouchableOpacity>
      </View>

      {currentUserDetails?.user_type === "Master" && (
        <View style={{ margin: 10 }}>
          <UserListDropDown
            userDropDownVal={userDropDownVal}
            setUserDropDownVal={setUserDropDownVal}
          />
        </View>
      )}
      <View style={styles.mainBox}>
        <View style={styles.checkBoxParentBox}>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.pAndL}
              setValue={(value: any) => setToggleHandler(value, "pAndL")}
            />
            <Text style={styles.checkBoxText}>P&L</Text>
          </View>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.brk}
              setValue={(value: any) => setToggleHandler(value, "brk")}
            />
            <Text style={styles.checkBoxText}>Brk</Text>
          </View>
          <View style={styles.checkBoxChild}>
            <CheckBoxComponent
              value={toggleCheckBoxs.credit}
              setValue={(value: any) => setToggleHandler(value, "credit")}
            />
            <Text style={styles.checkBoxText}>Credit</Text>
          </View>
        </View>

        <View style={styles.buttonsBoxStyle}>
          <SmallBtnComponent
            title={"View"}
            onPress={searchBtnHandler}
            style={{ marginLeft: 10 }}
          />
          <SmallBtnComponent
            title={"Clear"}
            onPress={resetHandler}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
            style={{ marginLeft: 10 }}
          />
        </View>

        {!toggleCheckBoxsFinal.credit && (
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={20} color={searchIconColorState} />
            <TextInput
              value={searchExchangeText}
              onChangeText={setSearchExchangeText}
              placeholder="Seach exchange or script"
              placeholderTextColor={theme.colors.greyText}
              style={styles.searchTextBox}
              onBlur={() => setSearchIconColorState(theme.colors.greyText)}
              onFocus={() => setSearchIconColorState(theme.colors.blue)}
            />
          </View>
        )}
      </View>
      <FlatList
        style={{
          marginBottom: useSafeAreaInsets().bottom,
        }}
        showsVerticalScrollIndicator={false}
        data={accountSummaryList}
        keyExtractor={(index: any) => `${index.id}`}
        renderItem={({ item }: any) => (
          <RenderItem item={item} credit={toggleCheckBoxsFinal.credit} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={
          <>
            {accountSummaryApi?.isLoading ||
              (accountSummaryApi?.isFetching && (
                <ActivityIndicator
                  color={theme.colors.primary}
                  size={"large"}
                />
              ))}
          </>
        }
        ListEmptyComponent={
          <>
            {!accountSummaryApi?.isLoading && (
              <View style={styles.emptyView}>
                <Text style={styles.emptyText}>No record found!</Text>
              </View>
            )}
          </>
        }
      />
    </View>
  );
};

export default AccountSummaryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
  },
  dropDownMargin: { marginTop: 10, marginBottom: 20 },
  checkBoxParentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 5,
  },
  checkBoxChild: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkBoxText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.secondary,
    fontSize: 16,
    marginLeft: 10,
  },
  buttonsBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 13,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchTextBox: {
    ...theme.font.fontMedium,
    fontSize: 15,
    marginLeft: 10,
    width: width * 0.8,
  },
  dateBox: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
    justifyContent: "space-between",
  },
  datePersonalBox: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    width: width * 0.46,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
  emptyView: {
    height: height * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    ...theme.font.fontMedium,
    fontSize: 15,
    color: theme.colors.primary,
  },
});
