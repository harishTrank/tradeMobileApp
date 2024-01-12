import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomTabFund from "../../../ReUseComponents/CustomTabFund";
import theme from "../../../../utils/theme";
import DropDownCompo from "./Component/DropDownCompo";
import RanderComponent from "./Component/RanderComponent";
import { Modalize } from "react-native-modalize";
import ModalizeData from "../QuotesTab/Components/ModalizeData";
import MessageModalizer from "../../../ReUseComponents/MessageModalizer";
import { UseGetAllPosition } from "../../../../hooks/TradeCoin/query";
import {
  getFilterData,
  getFilterOff,
  subscribeToFilterData,
} from "../../../../utils/socket/SocketService";
import { getAllCoinsPosition } from "../../../../store/Services/TradeCoin";
import { useAtom } from "jotai";
import {
  currentUserData,
  tradeSelectedCoinGlobal,
} from "../../../../JotaiStore";
import FullScreenLoader from "../../../ReUseComponents/FullScreenLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExtraOptionRow from "./Component/ExtraOptionRow";
import { useBuySellTradeCoin } from "../../../../hooks/TradeCoin/mutation";
import * as Network from "expo-network";
import Toast from "react-native-toast-message";
import ModalLizeComp from "./Component/ModalLizeComp";
import SquareOffAllModal from "./Component/SquareOffAllModal";
import { usePositionHeaderApi } from "../../../../hooks/User/query";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const PositionTab = ({ navigation, user_id }: any) => {
  const [dropDownOpen, setDropDownOpen]: any = useState(false);
  const [totalBalance, setTotalBalance]: any = useState(0);
  const [searchText, setSearchText]: any = useState("");

  // message modalizer ----------------------------
  const [quantityState, setQuantityState]: any = useState({});
  const [loading, setLoading]: any = useState(false);
  const [errorFlag, setErrorFlag]: any = useState(false);
  const [modalizeMessage, setModalizeMessage]: any = useState("");
  const [insufficientFlag, setInsufficientFlag]: any = useState(false);
  const messageModalize = useRef<Modalize>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [currentUserDetails]: any = useAtom(currentUserData);
  const [, setTradeCoinSelected]: any = useAtom(tradeSelectedCoinGlobal);
  const positionHeaderApiCall: any = usePositionHeaderApi({
    query: { user_id: user_id ? user_id : "" },
  });
  // ----------------------------------------------

  // position api and socket logic
  const positionListApi: any = UseGetAllPosition({
    query: {
      user_id: user_id ? user_id : "",
    },
  });
  const [socketResponse, setSocketResponse]: any = useState([]);
  // socket manage case -------------------------

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
  const focusRefetchContant = async () => {
    const quantityData: any = await AsyncStorage.getItem("quantity");
    setQuantityState(JSON.parse(quantityData));
  };
  // refresh handler -----
  const refreshHandler = () => {
    setLoading(true);
    focusRefetchContant();
    positionListApi?.refetch();
    positionHeaderApiCall?.refetch();
    getAllCoinsPosition({
      query: { user_id: user_id ? user_id : "" },
    })
      .then((res: any) => {
        setLoading(false);
        getFilterData({ identifier: res.response });
      })
      ?.catch((err: any) => setLoading(false));
  };
  // ----------------------

  // square off -------------------------
  const [visible, setVisible]: any = useState(false);
  const [squareOffScreen, setSquareOffScreen]: any = useState(false);
  const buySellApiCall: any = useBuySellTradeCoin();
  const buySellHandler = async (completeList: any) => {
    setLoading(true);
    const currentMobileIP = await Network.getIpAddressAsync();
    completeList?.map((item: any) => {
      const socketItem = socketResponse.find(
        (findObject: any) =>
          findObject?.InstrumentIdentifier === item?.identifer
      );
      const body = {
        identifer: item?.identifer,
        trade_type: "Market",
        coin_name: item?.coin_name,
        ex_change: socketItem?.Exchange,
        action: item?.total_quantity < 0 ? "BUY" : "SELL",
        quantity: Math.abs(item?.total_quantity),
        price:
          item?.total_quantity > 0 ? socketItem.SellPrice : socketItem.BuyPrice,
        is_pending: false,
        ip_address: currentMobileIP,
        order_method: Platform.OS,
        lot_size: socketItem.QuotationLot,
      };

      buySellApiCall
        ?.mutateAsync({
          body,
        })
        .then((res: any) => {
          positionListApi?.refetch();
          Toast.show({
            type: "success",
            text1: "Complete selected position.",
          });
        })
        .catch(() => {});
    });
    setTotalBalance(0.0);
    setLoading(false);
  };
  // ------------------------------------

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
  // ------------------------------------------------
  //----------------------------------------------
  return (
    <View style={styles.screen}>
      {!user_id && <CustomTabFund navigation={navigation} title={"Position"} />}

      <FullScreenLoader loading={loading} />

      <ModalLizeComp
        visible={visible}
        setVisible={setVisible}
        setSquareOffScreen={setSquareOffScreen}
      />

      {squareOffScreen && (
        <SquareOffAllModal
          squareOffScreen={squareOffScreen}
          setSquareOffScreen={setSquareOffScreen}
          data={positionListApi.data?.response}
          socketResponse={socketResponse}
          buySellHandler={buySellHandler}
        />
      )}

      <DropDownCompo
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        totalBalance={totalBalance}
        positionHeaderApiCall={positionHeaderApiCall}
      />

      {!user_id && currentUserDetails.user_type !== "Master" ? (
        <ExtraOptionRow
          setSearchText={setSearchText}
          searchText={searchText}
          refreshHandler={refreshHandler}
          setVisible={setVisible}
          length={positionListApi.data?.response?.length}
        />
      ) : (
        <View style={styles.mainBoxSearch}>
          <TextInput
            placeholder="Search"
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
      )}

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
            modalizeRef={modalizeRef}
            setTradeCoinSelected={setTradeCoinSelected}
            item={item}
            user_id={user_id}
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

      <Modalize ref={modalizeRef} modalHeight={height * 0.7}>
        <ModalizeData
          navigation={navigation}
          quantityState={quantityState}
          setLoading={setLoading}
          setErrorFlag={setErrorFlag}
          setModalizeMessage={setModalizeMessage}
          messageModalize={messageModalize}
          setInsufficientFlag={setInsufficientFlag}
          positionListApi={positionListApi}
          positionHeaderApiCall={positionHeaderApiCall}
        />
      </Modalize>

      <Modalize ref={messageModalize} modalHeight={height * 0.32}>
        <MessageModalizer
          messageModalize={messageModalize}
          error={errorFlag}
          message={modalizeMessage}
          insufficientFlag={insufficientFlag}
        />
      </Modalize>
    </View>
  );
};

export default PositionTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
