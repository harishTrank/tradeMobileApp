import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import theme from "../../../../../utils/theme";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import CounterComponent from "../../../../ReUseComponents/CounterComponent";
import { useAtom } from "jotai";
import {
  currentUserData,
  tradeSelectedCoinGlobal,
} from "../../../../../JotaiStore";
import { dateManager } from "../../../UserUtils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useBuySellTradeCoin } from "../../../../../hooks/TradeCoin/mutation";
import FullScreenLoader from "../../../../ReUseComponents/FullScreenLoader";
import * as Network from "expo-network";
import {
  getOneData,
  getOneDataOff,
  subscribeToGetOneData,
} from "../../../../../utils/socket/SocketService";

const button = ["Market", "Limit", "SL"];

const { width }: any = Dimensions.get("window");

const QuantityComponent = ({
  currentQuantity,
  setCurrentQuantity,
  quantityModal,
  setQuantityModal,
  quantityState,
}: any) => {
  return (
    <View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.iconTextBox}
          onPress={() => setQuantityModal((oldValue: any) => !oldValue)}
        >
          <Text style={styles.normalText}>Quantity</Text>
          <AntDesign
            name={quantityModal ? "caretup" : "caretdown"}
            size={10}
            color={theme.colors.black}
          />
        </TouchableOpacity>

        <CounterComponent
          value={currentQuantity}
          setValue={setCurrentQuantity}
        />
      </View>

      {quantityModal && (
        <View style={styles.priceButtomParent}>
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((key: any) => (
            <TouchableOpacity
              key={key}
              style={styles.priceButton}
              onPress={() => setCurrentQuantity(quantityState[key])}
            >
              <Text style={styles.priceButtonText}>{quantityState[key]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ModalizeData = ({
  quantityState,
  setErrorFlag,
  setModalizeMessage,
  messageModalize,
  setInsufficientFlag,
  positionListApi,
  navigation,
  positionHeaderApiCall,
}: any) => {
  dayjs.extend(relativeTime);

  const [selectedCoinData, setSelectedCoinData]: any = useAtom(
    tradeSelectedCoinGlobal
  );
  const [currentButtonState, setCurrentButtonState]: any = useState("Market");
  const [currentQuantity, setCurrentQuantity]: any = useState(1);
  const [currentPrice, setCurrentPrice]: any = useState(
    selectedCoinData?.BuyPrice || 2000
  );
  const [quantityModal, setQuantityModal]: any = useState(false);
  const buySellApiCall: any = useBuySellTradeCoin();
  const [, setCurrentUser]: any = useAtom(currentUserData);

  const [screenLoader, setScreenLoader]: any = useState(false);

  const buySellHandler = async (type: any) => {
    const currentMobileIP = await Network.getIpAddressAsync();
    setScreenLoader(true);

    if (currentButtonState.toUpperCase() === "SL") {
      if (type === "BUY" && currentPrice > selectedCoinData.BuyPrice) {
        setScreenLoader(false);
        setErrorFlag(true);
        setInsufficientFlag(false);
        setModalizeMessage("Price key must lower than buy price.");
        messageModalize.current?.open();
        return;
      } else if (type === "SELL" && currentPrice < selectedCoinData.SellPrice) {
        setScreenLoader(false);
        setErrorFlag(true);
        setInsufficientFlag(false);
        setModalizeMessage("Price key must higher than sell price.");
        messageModalize.current?.open();
        return;
      }
    }
    const body = {
      identifer: selectedCoinData?.InstrumentIdentifier,
      trade_type: currentButtonState.toUpperCase(),
      coin_name:
        selectedCoinData?.Exchange === "NSE"
          ? `NSE ${selectedCoinData?.InstrumentIdentifier}`
          : `${selectedCoinData.Exchange} ${
              selectedCoinData?.InstrumentIdentifier?.split("_")?.[1]
            }, ${dateManager(selectedCoinData?.InstrumentIdentifier) || ""}`,
      ex_change: selectedCoinData.Exchange,
      action: type,
      quantity: currentQuantity,
      price:
        type === "SELL"
          ? selectedCoinData.SellPrice
          : selectedCoinData.BuyPrice,
      is_pending: currentButtonState.toUpperCase() === "LIMIT" ? true : false,
      ip_address: currentMobileIP,
      order_method: Platform.OS,
      lot_size: selectedCoinData.QuotationLot,
      stop_loss: currentPrice,
      is_cancel: false,
    };

    if (currentButtonState.toUpperCase() === "LIMIT") {
      body.price = currentPrice;
      if (type === "SELL" && currentPrice <= selectedCoinData.SellPrice) {
        setScreenLoader(false);
        setErrorFlag(true);
        setInsufficientFlag(false);
        setModalizeMessage("Sell price must higher than high price.");
        messageModalize.current?.open();
        return;
      } else if (type === "BUY" && currentPrice >= selectedCoinData.BuyPrice) {
        setScreenLoader(false);
        setErrorFlag(true);
        setInsufficientFlag(false);
        setModalizeMessage("Buy price must lower than low price.");
        messageModalize.current?.open();
        return;
      }
    }
    if (
      selectedCoinData.SellPrice === 0 ||
      selectedCoinData.BuyPrice == 0 ||
      Number(dayjs().format("d")) === 0 ||
      Number(dayjs().format("d")) === 6
    ) {
      body.is_cancel = true;
    }
    buySellApiCall
      ?.mutateAsync({
        body,
      })
      .then((res: any) => {
        setCurrentUser((oldValue: any) => {
          return { ...oldValue, balance: res?.user_balance };
        });
        setScreenLoader(false);
        setErrorFlag(false);
        setInsufficientFlag(false);
        setModalizeMessage(res.message);
        if (positionListApi) {
          positionListApi?.refetch();
          positionHeaderApiCall?.refetch();
        }
        messageModalize.current?.open();
        return;
      })
      .catch((err: any) => {
        setScreenLoader(false);
        if (!body.is_cancel) {
          setInsufficientFlag(true);
        }
        setErrorFlag(true);
        setModalizeMessage(err.data.message);
        messageModalize.current?.open();
      });
  };

  // color fluctuation managers
  const [currentBuyColor, setCurrentBuyColor]: any = useState(
    theme.colors.white
  );
  const [currentSellColor, setCurrentSellColor]: any = useState(
    theme.colors.white
  );

  useEffect(() => {
    setCurrentBuyColor(selectedCoinData?.buyColor);
    setTimeout(() => setCurrentBuyColor(theme.colors.white), 1000);
  }, [selectedCoinData?.BuyPrice]);

  useEffect(() => {
    setCurrentSellColor(selectedCoinData?.sellColor);
    setTimeout(() => setCurrentSellColor(theme.colors.white), 1000);
  }, [selectedCoinData?.SellPrice]);
  // --------------------------------

  // socket fluctuations handlers -------
  useEffect(() => {
    subscribeToGetOneData((data: any) => {
      setSelectedCoinData(data);
    });
    getOneData({ identifier: selectedCoinData?.InstrumentIdentifier });
    return () => {
      getOneDataOff();
      setSelectedCoinData({});
    };
  }, []);
  // --------------------------------

  return (
    <>
      <View>
        <FullScreenLoader loading={screenLoader} />
        <View style={styles.mainContainer}>
          <View style={styles.secondBox}>
            <View style={styles.nameBox}>
              {selectedCoinData?.PriceChange < 0 ? (
                <Feather name="chevrons-down" size={15} color={"red"} />
              ) : (
                <Feather name="chevrons-up" size={15} color={"green"} />
              )}
              <Text style={styles.name}>
                {selectedCoinData?.Exchange === "NSE"
                  ? `NSE ${selectedCoinData?.InstrumentIdentifier}`
                  : `${selectedCoinData?.Exchange || ""} ${
                      selectedCoinData?.InstrumentIdentifier?.split("_")?.[1]
                    }, ${
                      dateManager(selectedCoinData?.InstrumentIdentifier) || ""
                    }`}
              </Text>
            </View>
            <Text
              style={[
                styles.price,
                selectedCoinData?.PriceChange < 0
                  ? { color: "red" }
                  : { color: "green" },
              ]}
            >
              {`${selectedCoinData?.PriceChange} (${selectedCoinData?.PriceChangePercentage}%)`}
            </Text>
          </View>

          <View style={styles.priceBoxParent}>
            <View
              style={[styles.priceCard, { backgroundColor: currentBuyColor }]}
            >
              <Text style={styles.priceBoxFirst}>
                {Number(selectedCoinData?.BuyPrice)?.toFixed(2)}
              </Text>
              <Text style={styles.priceBoxSecond}>
                {`L: ${Number(selectedCoinData?.Low)?.toFixed(2)}`}
              </Text>
            </View>

            <View
              style={[styles.priceCard, { backgroundColor: currentSellColor }]}
            >
              <Text style={styles.priceBoxFirst}>
                {Number(selectedCoinData?.SellPrice)?.toFixed(2)}
              </Text>
              <Text style={styles.priceBoxSecond}>
                {`H: ${Number(selectedCoinData?.High)?.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonBox}>
          {button.map((buttonName: any) => (
            <TouchableOpacity
              key={buttonName}
              style={[
                styles.typeButton,
                currentButtonState === buttonName && {
                  borderColor: theme.colors.danger,
                },
              ]}
              onPress={() => setCurrentButtonState(buttonName)}
            >
              <Text
                style={[
                  styles.typeText,
                  currentButtonState === buttonName && {
                    color: theme.colors.danger,
                  },
                ]}
              >
                {buttonName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentButtonState !== "Market" && (
          <View>
            <View style={styles.quantityContainer}>
              <View style={styles.iconTextBox}>
                <Text style={styles.normalText}>Price</Text>
              </View>
              <CounterComponent
                value={currentPrice}
                setValue={setCurrentPrice}
              />
            </View>
          </View>
        )}

        <QuantityComponent
          currentQuantity={currentQuantity}
          setCurrentQuantity={setCurrentQuantity}
          quantityModal={quantityModal}
          setQuantityModal={setQuantityModal}
          quantityState={quantityState}
        />

        <View style={styles.purchaseBtnBox}>
          <TouchableOpacity
            style={[styles.purchaseBtn, { backgroundColor: theme.colors.blue }]}
            onPress={() => buySellHandler("BUY")}
          >
            <Text style={styles.purchaseText}>BUY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.purchaseBtn}
            onPress={() => buySellHandler("SELL")}
          >
            <Text style={styles.purchaseText}>SELL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.purchaseBtnBox}>
          <TouchableOpacity
            style={styles.smallBtnBox}
            onPress={() =>
              navigation.navigate("ChartViewScreen", { selectedCoinData })
            }
          >
            <MaterialIcons
              name="bar-chart"
              size={22}
              color={theme.colors.blue}
            />
            <Text style={styles.smallBtnText}>Chart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallBtnBox}
            onPress={() =>
              navigation.navigate("CoinDetailsScreen", { selectedCoinData })
            }
          >
            <Feather name="info" size={22} color={theme.colors.blue} />
            <Text style={styles.smallBtnText}>Info</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceMethodParent}>
          <View style={styles.priceMethodBox}>
            <Text style={{ ...styles.name, marginBottom: 5 }}>Open</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.Open)?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceMethodBox}>
            <Text style={{ ...styles.name, marginBottom: 5 }}>High</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.High)?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceMethodBox}>
            <Text style={{ ...styles.name, marginBottom: 5 }}>Low</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.Low)?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceMethodBox}>
            <Text style={{ ...styles.name, marginBottom: 5 }}>Close</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.Close)?.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomTable}>
          <View
            style={[
              styles.tableRow,
              { backgroundColor: theme.colors.lightGrey },
            ]}
          >
            <Text style={styles.name}>Lot Size</Text>
            <Text style={styles.name}>
              {selectedCoinData?.QuotationLot != 0
                ? Number(selectedCoinData?.QuotationLot)?.toFixed(1)
                : 0}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.name}>LTP</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.LastTradePrice)?.toFixed(1)}
            </Text>
          </View>

          <View
            style={[
              styles.tableRow,
              { backgroundColor: theme.colors.lightGrey },
            ]}
          >
            <Text style={styles.name}>Avg. Price</Text>
            <Text style={styles.name}>
              {Number(selectedCoinData?.AverageTradedPrice)?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.name}>Time</Text>
            <Text style={styles.name}>
              {dayjs(selectedCoinData?.LastTradeTime)?.format("HH:MM:ss")}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ModalizeData;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.lightGrey,
    paddingVertical: 10,
    backgroundColor: theme.colors.lightGrey,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 5,
  },
  secondBox: {},
  nameBox: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.35,
  },
  name: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
    color: theme.colors.black,
  },
  price: {
    ...theme.font.fontMedium,
    fontSize: 12,
    alignItems: "center",
    paddingLeft: 12,
  },
  priceBoxParent: {
    flexDirection: "row",
  },
  priceCard: {
    marginHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 23,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  priceBoxFirst: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  priceBoxSecond: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
    fontSize: 11,
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeButton: {
    borderWidth: 1,
    padding: 8,
    width: width * 0.31,
    marginVertical: 15,
    marginLeft: 7,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.secondary,
    backgroundColor: "#FFF",
    ...theme.elevationLight,
  },
  typeText: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
    color: theme.colors.secondary,
  },
  quantityContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 10,
  },
  iconTextBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  normalText: {
    ...theme.font.fontSemiBold,
    marginRight: 10,
  },
  priceButtomParent: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  priceButton: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    marginVertical: 10,
    width: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    ...theme.elevationLight,
  },
  priceButtonText: {
    ...theme.font.fontMedium,
  },
  purchaseBtnBox: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  purchaseBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.45,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.danger,
    marginHorizontal: 5,
    ...theme.elevationHeavy,
  },
  purchaseText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.white,
    fontSize: 16,
  },
  smallBtnBox: {
    backgroundColor: theme.colors.lightGrey,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    width: width * 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    ...theme.elevationHeavy,
  },
  smallBtnText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.blue,
  },
  priceMethodParent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  priceMethodBox: {
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.215,
    ...theme.elevationLight,
  },
  bottomTable: {
    marginVertical: 15,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 5,
  },
});
