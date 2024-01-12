import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
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
import { usePositionHeaderApi } from "../../../hooks/User/query";
import {
  getFilterData,
  getFilterOff,
  subscribeToFilterData,
} from "../../../utils/socket/SocketService";
import { getAllCoinsPosition } from "../../../store/Services/TradeCoin";
import RanderComponent from "../TabNavigation/PositionTab/Component/RanderComponent";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const UserWiseNetPositionScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectScript, setSelectScript]: any = useState("");
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [socketResponse, setSocketResponse]: any = useState([]);
  const [totalBalance, setTotalBalance]: any = useState(0);
  const [loading, setLoading]: any = useState(false);
  const [searchText, setSearchText]: any = useState("");

  const userCoinListApi: any = useUserCoinList({});
  const [searchBtnHitState, setSearchBtnHitState]: any = useState({
    exchange: "",
    script: "",
    user_name: "",
  });

  // data manager cases...
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

  // ---------------------
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
      <BasicHeader navigation={navigation} title={"User Wise Netposition"} />

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

      <View style={styles.totalBox}>
        <Text
          style={[
            styles.totalText,
            { color: totalBalance > 0 ? "green" : theme.colors.danger },
          ]}
        >
          Total
        </Text>
        <Text
          style={[
            styles.totalText,
            { color: totalBalance > 0 ? "green" : theme.colors.danger },
          ]}
        >
          {totalBalance}
        </Text>
      </View>

      <View style={styles.mainBoxSearch}>
        <TextInput
          placeholder="Search exchange or script"
          style={styles.searchText}
          onChangeText={setSearchText}
          value={searchText}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={refreshHandler}>
          <MaterialIcons name="refresh" size={20} color="black" />
        </TouchableOpacity>
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
          <RanderComponent
            socketResponse={socketResponse.find(
              (findObject: any) =>
                findObject?.InstrumentIdentifier === item?.identifer
            )}
            item={item}
          />
        )}
        ListEmptyComponent={
          <>
            {!loading && (
              <View style={styles.emptyCardView}>
                <Text style={styles.emptyText}>No data Found!</Text>
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
  totalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  totalText: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  emptyCardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.65,
  },
  emptyText: {
    color: theme.colors.black,
    ...theme.font.fontRegular,
  },
  mainBoxSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    borderBlockColor: theme.colors.border,
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    width: width * 0.83,
  },
});

export default UserWiseNetPositionScreen;
