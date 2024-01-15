import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  FlatList,
} from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import {
  UseGetAllPosition,
  useUserCoinList,
} from "../../../hooks/TradeCoin/query";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import { FontAwesome } from "@expo/vector-icons";
import { usePositionHeaderApi } from "../../../hooks/User/query";
import {
  getFilterData,
  getFilterOff,
  subscribeToFilterData,
} from "../../../utils/socket/SocketService";
import { getAllCoinsPosition } from "../../../store/Services/TradeCoin";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width, height } = Dimensions.get("window");

const RenderItem = ({ item, socketResponse }: any) => {
  const profitLossHandler = () => {
    return (
      item?.total_quantity > 0
        ? (socketResponse?.BuyPrice - item?.avg_buy_price) *
          item?.total_quantity *
          (socketResponse?.QuotationLot > 0 ? socketResponse?.QuotationLot : 1)
        : (item?.avg_sell_price - socketResponse?.SellPrice) *
          Math.abs(item?.total_quantity) *
          (socketResponse?.QuotationLot > 0 ? socketResponse?.QuotationLot : 1)
    ).toFixed(2);
  };

  const finalProfitLoss: any = profitLossHandler();

  return (
    <View style={styles.itemBox}>
      <View style={styles.firstRow}>
        <Text style={styles.coinText}>{item?.coin_name || ""}</Text>
        <View style={styles.extraBox}>
          <Text
            style={[
              styles.defaultText,
              { color: finalProfitLoss > 0 ? "green" : theme.colors.danger },
            ]}
          >
            {finalProfitLoss || "0.00"}
          </Text>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={[styles.rowChild, { alignItems: "flex-start" }]}>
          <Text style={styles.defaultText}>Buy</Text>
          <Text
            style={[
              styles.defaultText,
              {
                color: item?.total_quantity > 0 ? "green" : theme.colors.danger,
              },
            ]}
          >
            {item?.total_quantity > 0 ? item?.total_quantity : 0}
          </Text>
          <Text style={styles.defaultText}>Buy Avg Rate</Text>
          <Text
            style={[
              styles.defaultText,
              {
                color: item?.total_quantity > 0 ? "green" : theme.colors.danger,
              },
            ]}
          >
            {item?.total_quantity > 0
              ? item?.avg_buy_price?.toFixed(2)
              : "0.00"}
          </Text>
        </View>

        <View style={styles.rowChild}>
          <Text style={styles.defaultText}>Sell</Text>
          <Text style={[styles.defaultText, { color: theme.colors.danger }]}>
            {item?.total_quantity < 0 ? Math.abs(item?.total_quantity) : 0}
          </Text>
          <Text style={styles.defaultText}>Sell Avg Rate</Text>
          <Text style={[styles.defaultText, { color: theme.colors.danger }]}>
            {item?.total_quantity < 0
              ? item?.avg_sell_price?.toFixed(2)
              : "0.00"}
          </Text>
        </View>

        <View style={[styles.rowChild, { alignItems: "flex-end" }]}>
          <Text style={styles.defaultText}>Open</Text>
          <Text
            style={[
              styles.defaultText,
              {
                color: item?.total_quantity > 0 ? "green" : theme.colors.danger,
              },
            ]}
          >
            {item?.total_quantity}
          </Text>
          <Text style={styles.defaultText}>Open Avg Rate</Text>
          <Text
            style={[
              styles.defaultText,
              {
                color: item?.total_quantity > 0 ? "green" : theme.colors.danger,
              },
            ]}
          >
            {item?.total_quantity > 0
              ? item?.avg_buy_price
              : item?.avg_sell_price}
          </Text>
        </View>
      </View>
    </View>
  );
};
const OpenPositionScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const userCoinListApi: any = useUserCoinList({});
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [searchText, setSearchText]: any = useState("");
  const [socketResponse, setSocketResponse]: any = useState([]);
  const [totalBalance, setTotalBalance]: any = useState(0);
  const [loading, setLoading]: any = useState(false);
  const [searchBtnHitState, setSearchBtnHitState]: any = useState({
    exchange: "",
    script: "",
    user_name: "",
  });

  // integration data manager...
  const positionHeaderApiCall: any = usePositionHeaderApi({
    query: {
      user_name: searchBtnHitState.user_name,
      exchange: searchBtnHitState.exchange,
      script: searchBtnHitState.script,
    },
  });
  const positionListApi: any = UseGetAllPosition({
    query: {
      user_name: searchBtnHitState.user_name,
      exchange: searchBtnHitState.exchange,
      script: searchBtnHitState.script,
    },
  });
  const updateTotalPrice = () => {
    const result = positionListApi.data?.response
      .map((item: any) => {
        const findSocketVal = socketResponse.find(
          (findObject: any) =>
            findObject?.InstrumentIdentifier === item?.identifer
        );
        return (
          item?.total_quantity > 0
            ? (findSocketVal?.BuyPrice - item?.avg_buy_price) *
              item?.total_quantity *
              findSocketVal?.QuotationLot
            : (item?.avg_sell_price - findSocketVal?.SellPrice) *
              Math.abs(item?.total_quantity) *
              findSocketVal?.QuotationLot
        ).toFixed(2);
      })
      .reduce((partialSum: any, a: any) => Number(partialSum) + Number(a), 0);
    setTotalBalance(isNaN(result) ? 0.0 : result);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [positionListApi.data?.response, socketResponse]);

  useEffect(() => {
    setTimeout(() => {
      subscribeToFilterData((data: any) => {
        setSocketResponse(data);
      });
    }, 1000);
  }, []);

  const refreshHandler = () => {
    setLoading(true);
    positionListApi?.refetch();
    positionHeaderApiCall?.refetch();
    getAllCoinsPosition({
      query: {
        user_name: searchBtnHitState.user_name,
        exchange: searchBtnHitState.exchange,
        script: searchBtnHitState.script,
      },
    })
      .then((res: any) => {
        setLoading(false);
        getFilterData({ identifier: res.response });
      })
      ?.catch((err: any) => setLoading(false));
  };
  useEffect(() => {
    return navigation.addListener("focus", () => {
      refreshHandler();
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("blur", () => {
      getFilterOff();
    });
  }, [navigation]);
  // -------------------------------

  const searchBtnHandler = () => {
    setSearchBtnHitState({
      exchange: exchangeValue,
      script: selectScript,
      user_name: userDropDownVal,
    });
  };
  const resetHandler = () => {
    setSearchBtnHitState({
      exchange: "",
      script: "",
      user_name: "",
    });
    setExchangeValue("");
    setSelectScript("");
    setUserDropDownVal("");
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Open Position"} />
      <FullScreenLoader loading={loading} />
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

      <View style={styles.mainBoxSearch}>
        <FontAwesome name="search" size={22} color={theme.colors.black} />
        <TextInput
          placeholder="Search exchange or script"
          style={styles.searchText}
          onChangeText={setSearchText}
          value={searchText}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.totalBox}>
        <Text style={[styles.defaultText, { color: theme.colors.black }]}>
          Total P & L :-
        </Text>
        <Text
          style={[
            styles.defaultText,
            { color: totalBalance > 0 ? "green" : theme.colors.danger },
          ]}
        >
          {totalBalance}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          positionListApi.data?.response?.filter((filterItem: any) =>
            filterItem?.coin_name
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase())
          ) || []
        }
        keyExtractor={(item: any) => item?.identifer}
        renderItem={({ item }: any) => (
          <RenderItem
            item={item}
            socketResponse={socketResponse.find(
              (findObject: any) =>
                findObject?.InstrumentIdentifier === item?.identifer
            )}
          />
        )}
        ListEmptyComponent={
          <>
            {!loading && (
              <View style={styles.emptyCardView}>
                <Text style={styles.emptyText}>No record Found!</Text>
              </View>
            )}
          </>
        }
      />
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
  mainBoxSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
    margin: 10,
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    width: width * 0.83,
  },
  totalBox: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.lightGrey,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  defaultText: {
    ...theme.font.fontMedium,
    fontSize: 12,
    color: theme.colors.greyText,
    marginVertical: 1,
  },
  itemBox: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coinText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  rowChild: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  extraBox: {
    backgroundColor: theme.colors.grey,
    padding: 2,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.65,
  },
  emptyText: {
    color: theme.colors.primary,
    ...theme.font.fontRegular,
  },
});

export default OpenPositionScreen;
