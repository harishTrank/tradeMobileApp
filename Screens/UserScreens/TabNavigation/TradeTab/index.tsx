import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import CustomTabFund from "../../../ReUseComponents/CustomTabFund";
import theme from "../../../../utils/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import FilterModal from "./Component/FilterModal";
import { useTradeHistory } from "../../../../hooks/TradeCoin/query";
import dayjs from "dayjs";
import SearchComponent from "../../../ReUseComponents/SearchComponent";
import { Modalize } from "react-native-modalize";
import ViewModalize from "./Component/ViewModalize";
import FullScreenLoader from "../../../ReUseComponents/FullScreenLoader";
import { useAtom } from "jotai";
import { particularTradeTabCoin } from "../../../../JotaiStore";
import { getParticularCoin } from "../../../../store/Services/TradeCoin";
import { useQueryClient } from "@tanstack/react-query";

const { height }: any = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

const SearchInput = ({
  setDateRange,
  setCurrentPage,
  successTradeList,
  setExchangeKey,
  searchText,
  setSearchText,
  user_id,
}: any) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  return (
    <View style={styles.searchBox}>
      <FilterModal
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
        setDateRange={setDateRange}
        setCurrentPage={setCurrentPage}
        successTradeList={successTradeList}
        setExchangeKey={setExchangeKey}
        setSearchText={setSearchText}
        user_id={user_id}
      />
      <SearchComponent searchText={searchText} setSearchText={setSearchText} />
      <TouchableOpacity onPress={() => setOpenFilterModal(true)}>
        <MaterialIcons
          name="settings-input-component"
          size={20}
          color={theme.colors.greyText}
        />
      </TouchableOpacity>
    </View>
  );
};

export const ListItemCard = ({
  item,
  viewModalizeRef = null,
  setSelectTradeId,
  setTabHandler,
}: any) => {
  const particularObjectPress = () => {
    setSelectTradeId(item?.id);
    setTabHandler((oldValue: any) => !oldValue);
  };
  return (
    <TouchableOpacity
      onPress={particularObjectPress}
      style={styles.itemContainer}
      disabled={!viewModalizeRef}
    >
      <View style={styles.itemFirstRow}>
        <Text style={styles.itemText}>
          {item?.coin_name ? `${item?.coin_name} ,` : ""}
          <Text
            style={[
              styles.itemText,
              { color: item.action === "BUY" ? "green" : "red" },
            ]}
          >
            {" "}
            {isNaN(item.quantity) ? "" : Math.abs(item.quantity)}{" "}
            {item.action || ""}
            {`  ${item.trade_type?.toUpperCase()}`}
          </Text>
        </Text>
        <Text
          style={[
            styles.itemText,
            { color: item.action === "BUY" ? "green" : "red" },
          ]}
        >
          {item?.price}
        </Text>
      </View>

      <View style={styles.itemSecondRow}>
        <View style={styles.itemSecondRowContainer}>
          <Feather name="user" size={20} color="black" />
          <Text style={[styles.itemText, { marginLeft: 5 }]}>
            {item?.buy_sell_user__user_name}
          </Text>
        </View>

        <View style={styles.itemSecondRowContainer}>
          <Feather name="clock" size={20} color="black" />
          <Text style={[styles.itemText, { marginLeft: 5 }]}>
            {dayjs(item?.created_at).format("DD MMM YYYY hh:mm:ss A")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TradeCustomTab = ({
  navigation,
  pendingTab,
  viewModalizeRef,
  user_id,
}: any) => {
  const [currentPage, setCurrentPage]: any = useState(1);
  const [successList, setSuccessList]: any = useState([]);
  const [exchangeKey, setExchangeKey]: any = useState("");
  const [searchText, setSearchText]: any = useState("");
  const [loading, setLoading]: any = useState(false);
  const [selectTradeId, setSelectTradeId]: any = useState(0);
  const [, setParticularCoinHistory]: any = useAtom(particularTradeTabCoin);
  const queryClient: any = useQueryClient();
  const [tabHandler, setTabHandler]: any = useState(false);

  useEffect(() => {
    if (selectTradeId !== 0) {
      setParticularCoinHistory({});
      setLoading(true);
      getParticularCoin({
        pathParams: {
          id: selectTradeId,
        },
      })
        .then((res: any) => {
          setLoading(false);
          setParticularCoinHistory(res);
          viewModalizeRef.current?.open();
        })
        .catch(() => setLoading(false));
    }
  }, [selectTradeId, tabHandler]);

  const [dateRange, setDateRange]: any = useState({
    startDate: "",
    endDate: "",
  });

  const successTradeList: any = useTradeHistory({
    query: {
      page: currentPage,
      from_date:
        dateRange.startDate !== ""
          ? dayjs(dateRange.startDate).format("YYYY-MM-DD")
          : "",
      to_date:
        dateRange.endDate !== ""
          ? dayjs(dateRange.endDate).format("YYYY-MM-DD")
          : "",
      ex_change: exchangeKey,
      coin_name: searchText,
      is_pending: pendingTab,
      user_id: user_id ? user_id : "",
    },
  });

  useEffect(() => {
    return navigation.addListener("focus", () => {
      queryClient.removeQueries(["tradeHistory"]);
      setCurrentPage(1);
      successTradeList.refetch();
    });
  }, [navigation]);

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
    dateRange,
    exchangeKey,
    searchText,
  ]);

  const onEndReached = () => {
    if (
      successTradeList?.data?.total &&
      currentPage < successTradeList?.data?.total
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <FullScreenLoader loading={loading} />
      <SearchInput
        setDateRange={setDateRange}
        setCurrentPage={setCurrentPage}
        successTradeList={successTradeList}
        setExchangeKey={setExchangeKey}
        searchText={searchText}
        setSearchText={setSearchText}
        user_id={user_id}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={successList}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: any) => (
          <ListItemCard
            setSelectTradeId={setSelectTradeId}
            viewModalizeRef={viewModalizeRef}
            item={item}
            setTabHandler={setTabHandler}
          />
        )}
        ListEmptyComponent={
          <>
            {!loading && (
              <View style={styles.emptyStyleContainer}>
                <Text style={styles.emptyStyleText}>No data Found!</Text>
              </View>
            )}
          </>
        }
        onEndReached={onEndReached}
        ListFooterComponent={
          <>
            {successTradeList?.isLoading && (
              <ActivityIndicator color={theme.colors.primary} size={"large"} />
            )}
          </>
        }
      />
    </View>
  );
};

const TradeTab = ({ navigation }: any) => {
  const viewModalizeRef = useRef<Modalize>(null);

  const RenderSuccessCase = (props: any) => {
    return (
      <TradeCustomTab
        {...props}
        pendingTab={false}
        viewModalizeRef={viewModalizeRef}
      />
    );
  };
  const RenderPendingCase = (props: any) => {
    return (
      <TradeCustomTab
        {...props}
        pendingTab={true}
        viewModalizeRef={viewModalizeRef}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <CustomTabFund navigation={navigation} title={"Trade"} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.lightGrey,
          },
          tabBarLabelStyle: {
            ...theme.font.fontMedium,
          },
          tabBarActiveTintColor: theme.colors.secondary,
        }}
      >
        <Tab.Screen name="Success" component={RenderSuccessCase} />
        <Tab.Screen name="Pending" component={RenderPendingCase} />
      </Tab.Navigator>

      <Modalize ref={viewModalizeRef} modalHeight={height * 0.5}>
        <ViewModalize />
      </Modalize>
    </View>
  );
};

export default TradeTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  // list card item style
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  itemFirstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemSecondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemSecondRowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  itemText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 13,
  },
  emptyStyleContainer: {
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStyleText: {
    ...theme.font.fontMedium,
    color: theme.colors.secondary,
  },
});
