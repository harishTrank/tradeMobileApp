import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import theme from "../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { usePositionHeaderApi } from "../../../hooks/User/query";
import {
  UseGetAllPosition,
  useGetWeeklyAdmin,
} from "../../../hooks/TradeCoin/query";
import {
  getFilterData,
  getFilterOff,
  subscribeToFilterData,
} from "../../../utils/socket/SocketService";
import { getAllCoinsPosition } from "../../../store/Services/TradeCoin";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width, height } = Dimensions.get("window");

const ClientDropDownComp = ({
  dropDownOpen,
  setDropDownOpen,
  positionHeaderApiCall,
  totalBalance,
}: any) => {
  return (
    <View style={styles.mainDropContainer}>
      <TouchableOpacity
        style={styles.totalBox}
        onPress={() => setDropDownOpen(!dropDownOpen)}
      >
        <View style={styles.totalBox2}>
          {dropDownOpen ? (
            <Entypo
              name="chevron-up"
              size={25}
              color={
                totalBalance + positionHeaderApiCall?.data?.release_p_and_l > 0
                  ? "green"
                  : theme.colors.danger
              }
            />
          ) : (
            <Entypo
              name="chevron-down"
              size={25}
              color={
                totalBalance + positionHeaderApiCall?.data?.release_p_and_l > 0
                  ? "green"
                  : theme.colors.danger
              }
            />
          )}
          <Text
            style={[
              styles.headerText,
              totalBalance + positionHeaderApiCall?.data?.release_p_and_l >
                0 && {
                color: "green",
              },
            ]}
          >
            Total
          </Text>
        </View>
        <Text
          style={[
            styles.headerText,
            totalBalance + positionHeaderApiCall?.data?.release_p_and_l > 0 && {
              color: "green",
            },
          ]}
        >
          {(
            totalBalance + positionHeaderApiCall?.data?.release_p_and_l
          ).toFixed(2)}
        </Text>
      </TouchableOpacity>

      {dropDownOpen && (
        <View style={styles.tableBox}>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M P&L:</Text>
            <Text style={styles.basicText}>{totalBalance?.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Realised P&L:</Text>
            <Text style={styles.basicText}>
              {positionHeaderApiCall?.data?.release_p_and_l?.toFixed(2) || 0}
            </Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M % Net P&L:</Text>
            <Text style={styles.basicText}>{0}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const ClientPandLScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [searchFinalValue, setSearchFinalValue]: any = useState("");
  const [dropDownOpen, setDropDownOpen]: any = useState(false);
  const [totalBalance, setTotalBalance]: any = useState(0);
  const [socketResponse, setSocketResponse]: any = useState([]);
  const [m2mListUserWise, setM2MListUserWise]: any = useState([]);
  const [loading, setLoading]: any = useState(true);

  const getweeklyAdmin: any = useGetWeeklyAdmin({
    query: {
      user_name:
        searchFinalValue !== "" ? searchFinalValue : currentUser?.user_name,
    },
  });

  const positionHeaderApiCall: any = usePositionHeaderApi({
    query: { user_name: searchFinalValue !== "" ? searchFinalValue : "" },
  });
  const positionListApi: any = UseGetAllPosition({
    query: { user_name: searchFinalValue !== "" ? searchFinalValue : "" },
  });

  const refreshHandler = () => {
    positionListApi?.refetch();
    positionHeaderApiCall?.refetch();
    getAllCoinsPosition({
      query: { user_name: searchFinalValue !== "" ? searchFinalValue : "" },
    })
      .then((res: any) => {
        getFilterData({ identifier: res.response });
      })
      ?.catch((err: any) => console.log("err", err));
  };

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

  const searchBtnHandler = () => {
    setSearchFinalValue(userDropDownVal);
  };
  const resetHandler = () => {
    setSearchFinalValue("");
    setUserDropDownVal("");
  };

  useEffect(() => {
    setLoading(true);
    if (getweeklyAdmin?.data?.result) {
      setM2MListUserWise([]);
      getweeklyAdmin?.data?.result.map((mapItem: any) => {
        setM2MListUserWise((oldValue: any) => {
          const currentLiveData: any = socketResponse.find(
            (findObject: any) =>
              findObject?.InstrumentIdentifier === mapItem?.identifer
          );
          const currentP_L: any =
            mapItem?.total_quantity > 0
              ? (currentLiveData?.BuyPrice - mapItem?.avg_buy_price) *
                mapItem?.total_quantity *
                currentLiveData?.QuotationLot
              : (mapItem?.avg_sell_price - currentLiveData?.SellPrice) *
                Math.abs(mapItem?.total_quantity) *
                currentLiveData?.QuotationLot;
          return [
            ...(oldValue || []),
            {
              user_id: mapItem?.buy_sell_user__id,
              m2mTotal: currentP_L,
            },
          ];
        });
      });
      setLoading(false);
    }
  }, [getweeklyAdmin?.data?.result, socketResponse]);

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Client P & L"} />
      <FullScreenLoader loading={loading} />
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

      <ClientDropDownComp
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        totalBalance={totalBalance}
        positionHeaderApiCall={positionHeaderApiCall}
      />

      <FlatList
        data={getweeklyAdmin?.data?.release_p_and_l || []}
        keyExtractor={(item: any) => item.user_summary__id}
        renderItem={({ item }: any) => {
          const currentM2M: any = m2mListUserWise.filter(
            (f: any) => f?.user_id === item?.user_summary__id
          );
          const m2mFinal: any = Number(
            currentM2M && currentM2M.length !== 0
              ? currentM2M?.reduce(
                  (a: any, b: any) => a?.m2mTotal + b?.m2mTotal
                ) || 0
              : 0
          )?.toFixed(2);
          return (
            <View style={styles.itemBox}>
              <View>
                <Text style={styles.itemText}>
                  {item?.user_summary__user_name}
                </Text>
                <View style={styles.innerView}>
                  <Text style={styles.itemText}>
                    {item?.user_summary__user_type?.toUpperCase()}
                  </Text>
                  <Entypo
                    name="arrow-long-right"
                    size={20}
                    style={{ marginHorizontal: 5 }}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.itemText}>0%</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.itemText,
                  { color: m2mFinal > 0 ? "green" : theme.colors.danger },
                ]}
              >
                {m2mFinal}
              </Text>
              <Text
                style={[
                  styles.itemText,
                  { color: m2mFinal > 0 ? "green" : theme.colors.danger },
                ]}
              >
                {(Number(m2mFinal) + Number(item?.total_amount))?.toFixed(2)}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyDataBox}>
            <Text style={styles.emptyText}>No Record found!</Text>
          </View>
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
  mainDropContainer: {
    backgroundColor: theme.colors.white,
    margin: 10,
    borderRadius: 10,
    ...theme.elevationHeavy,
  },
  totalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  totalBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: 15,
    color: theme.colors.danger,
  },
  tableBox: {},
  row: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.lightGrey,
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.border,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    ...theme.font.fontMedium,
    fontSize: 13,
    color: theme.colors.black,
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

export default ClientPandLScreen;
