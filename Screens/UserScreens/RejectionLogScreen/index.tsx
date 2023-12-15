import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RenderItem from "./Components/RenderItem";
import {
  useTradeHistory,
  useUserCoinList,
} from "../../../hooks/TradeCoin/query";
import { currentUserData } from "../../../JotaiStore";
import { useAtom } from "jotai";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

const RejectionLogScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const [searchText, setSearchText]: any = useState("");
  const [successList, setSuccessList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [currentUser]: any = useAtom(currentUserData);
  const userCoinListApi: any = useUserCoinList();
  const [loading, setLoading]: any = useState(true);
  const [viewBtnSetData, setviewBtnSetData]: any = useState({
    startDate: "",
    endDate: "",
    coin_name: "",
    ex_change: "",
  });

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

  const successTradeList: any = useTradeHistory({
    query: {
      page: currentPage,
      from_date:
        viewBtnSetData.startDate !== ""
          ? dayjs(viewBtnSetData.startDate).format("YYYY-MM-DD")
          : "",
      to_date:
        viewBtnSetData.endDate !== ""
          ? dayjs(viewBtnSetData.endDate).format("YYYY-MM-DD")
          : "",
      ex_change: viewBtnSetData.ex_change,
      coin_name: viewBtnSetData.coin_name,
      is_cancel: true,
    },
  });

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setCurrentPage(1);
      successTradeList.refetch();
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setviewBtnSetData((oldValue: any) => {
        return { ...oldValue, coin_name: searchText };
      });
      successTradeList.refetch();
    }, 700);
  }, [searchText]);

  useEffect(() => {
    if (
      !successTradeList?.isFetching &&
      !successTradeList.isLoading &&
      successTradeList?.data?.results
    ) {
      if (currentPage === 1) {
        setSuccessList(successTradeList.data.results);
      } else {
        setSuccessList((oldValue: any) => {
          return [...oldValue, ...successTradeList.data.results].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id)
          );
        });
      }
      setLoading(false);
    }
  }, [
    successTradeList?.data?.results,
    currentPage,
    successTradeList?.isFetching,
    searchText,
    exchangeValue,
  ]);

  const onEndReached = () => {
    if (
      successTradeList?.data?.total &&
      currentPage < successTradeList?.data?.total
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchBtnHandler = () => {
    setLoading(true);
    setviewBtnSetData({
      startDate: range.startDate || "",
      endDate: range.endDate || "",
      coin_name: selectScript || "",
      ex_change: exchangeValue || "",
    });
    successTradeList.refetch();
    setLoading(false);
  };

  const resetHandler = () => {
    setviewBtnSetData({
      startDate: "",
      endDate: "",
      coin_name: "",
      ex_change: "",
    });
    setRange({
      startDate: undefined,
      endDate: undefined,
    });
    setExchangeValue("");
    setSelectScript("");
    successTradeList.refetch();
  };

  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loading} />
      <BasicHeader navigation={navigation} title={"Rejection Log History"} />
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

      <View style={styles.btnStyleBox}>
        <SmallBtnComponent
          style={styles.buttonBtn}
          title={"Search"}
          onPress={searchBtnHandler}
        />
        <SmallBtnComponent
          style={{ ...styles.buttonBtn, ...{ marginLeft: 15 } }}
          title={"Reset"}
          onPress={resetHandler}
          backgroundColor={theme.colors.lightGrey}
          textColor={theme.colors.secondary}
        />
      </View>

      <View style={styles.searchBox}>
        <View style={styles.searchChildBox}>
          <Ionicons name="search" size={24} color={theme.colors.greyText} />
          <TextInput
            placeholder="Search & Add"
            style={{
              ...styles.searchText,
              paddingLeft: 10,
              maxWidth: width * 0.8,
            }}
            autoCorrect={false}
            autoCapitalize="none"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <FlatList
        style={{
          paddingBottom: useSafeAreaInsets().bottom + 10,
        }}
        showsVerticalScrollIndicator={false}
        data={successList}
        keyExtractor={(index: any) => index.id}
        renderItem={({ item }: any) => <RenderItem item={item} />}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default RejectionLogScreen;

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
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  buttonBtn: {
    width: width * 0.215,
  },
  bigDropDown: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "transparent",
  },
  searchChildBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
  dateBox: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
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
    marginBottom: 10,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
});
