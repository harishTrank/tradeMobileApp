import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Platform,
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
import { tradeSelectedCoinGlobal } from "../../../../JotaiStore";
import FullScreenLoader from "../../../ReUseComponents/FullScreenLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExtraOptionRow from "./Component/ExtraOptionRow";
import { useBuySellTradeCoin } from "../../../../hooks/TradeCoin/mutation";
import * as Network from "expo-network";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");

const PositionTab = ({ navigation }: any) => {
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
  const [, setTradeCoinSelected]: any = useAtom(tradeSelectedCoinGlobal);
  // ----------------------------------------------

  // position api and socket logic
  const positionListApi: any = UseGetAllPosition();
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
    if (
      positionListApi.data?.response &&
      positionListApi.data?.response.length > 0 &&
      socketResponse &&
      socketResponse.length > 0
    ) {
      updateTotalPrice();
    }
  }, [positionListApi.data?.response, socketResponse]);

  useEffect(() => {
    subscribeToFilterData((data: any) => {
      setSocketResponse(data);
    });
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
    getAllCoinsPosition()
      .then((res: any) => {
        setLoading(false);
        getFilterData({ identifier: res.response });
      })
      ?.catch((err: any) => setLoading(false));
  };
  // ----------------------

  // square off -------------------------
  const buySellApiCall: any = useBuySellTradeCoin();
  const buySellHandler = async () => {
    setLoading(true);
    const currentMobileIP = await Network.getIpAddressAsync();
    positionListApi.data?.response?.map((item: any) => {
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
            text1: "Complete all the positions.",
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
      <CustomTabFund navigation={navigation} title={"Position"} />

      <FullScreenLoader loading={loading} />

      <DropDownCompo
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        totalBalance={totalBalance}
      />

      <ExtraOptionRow
        setSearchText={setSearchText}
        searchText={searchText}
        refreshHandler={refreshHandler}
        buySellHandler={buySellHandler}
      />

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
});
