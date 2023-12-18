import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import dayjs from "dayjs";
import { DatePickerModal } from "react-native-paper-dates";
import { useLoginHistory } from "../../../hooks/Auth/query";
import LoginItem from "./Components/LoginItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width } = Dimensions.get("window");

const LoginHistoryScreen = ({ navigation }: any) => {
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const [searchIconColorState, setSearchIconColorState]: any = useState(
    theme.colors.greyText
  );
  const [loading, setLoading]: any = useState(false);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [successList, setSuccessList]: any = useState([]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [apiKeys, setApiKeys]: any = useState({
    startDate: undefined,
    endDate: undefined,
    searchInput: "",
  });

  const loginHistoryApi: any = useLoginHistory({
    query: {
      page: currentPage,
      from_date:
        apiKeys.startDate && apiKeys.startDate !== ""
          ? dayjs(apiKeys.startDate).format("YYYY-MM-DD")
          : "",
      to_date:
        apiKeys.startDate && apiKeys.endDate !== ""
          ? dayjs(apiKeys.endDate).format("YYYY-MM-DD")
          : "",
      searchInput: apiKeys.searchInput,
    },
  });

  useEffect(() => {
    if (
      !loginHistoryApi?.isFetching &&
      !loginHistoryApi.isLoading &&
      loginHistoryApi?.data?.results
    ) {
      if (currentPage === 1) {
        setSuccessList(loginHistoryApi.data.results);
      } else {
        setSuccessList((oldValue: any) => {
          return [...oldValue, ...loginHistoryApi.data.results].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id)
          );
        });
      }
      setLoading(false);
    }
  }, [
    loginHistoryApi?.data?.results,
    currentPage,
    loginHistoryApi?.isFetching,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setApiKeys((oldValue: any) => {
        return { ...oldValue, searchInput: searchExchangeText };
      });
      loginHistoryApi.refetch();
    }, 700);
  }, [searchExchangeText]);

  const onEndReached = () => {
    if (
      loginHistoryApi?.data?.total &&
      currentPage < loginHistoryApi?.data?.total
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  // date picker case working
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

  const searchBtnHandler = () => {
    setApiKeys({
      startDate: range.startDate,
      endDate: range.endDate,
    });
    loginHistoryApi.refetch();
  };

  const resetBtnHandler = () => {
    setApiKeys({
      startDate: undefined,
      endDate: undefined,
    });
    loginHistoryApi.refetch();
  };

  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loading} />
      <BasicHeader navigation={navigation} title={"Login History"} />
      <View style={styles.mainBox}>
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

        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color={searchIconColorState} />
          <TextInput
            value={searchExchangeText}
            onChangeText={setSearchExchangeText}
            placeholder="Search"
            placeholderTextColor={theme.colors.greyText}
            style={styles.searchTextBox}
            onBlur={() => setSearchIconColorState(theme.colors.greyText)}
            onFocus={() => setSearchIconColorState(theme.colors.blue)}
          />
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
            onPress={resetBtnHandler}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </View>
      </View>

      <FlatList
        style={{
          marginBottom: useSafeAreaInsets().bottom,
        }}
        showsVerticalScrollIndicator={false}
        data={successList}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: any) => {
          return <LoginItem item={item} />;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={
          <>
            {loginHistoryApi?.isLoading && (
              <ActivityIndicator color={theme.colors.primary} size={"large"} />
            )}
          </>
        }
      />
    </View>
  );
};

export default LoginHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
  },
  dropDownMargin: { marginTop: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
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
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonBtn: {
    width: width * 0.4,
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
    width: width * 0.43,
    marginBottom: 10,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
});
