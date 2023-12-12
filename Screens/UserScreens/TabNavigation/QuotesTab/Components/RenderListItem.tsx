import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import theme from "../../../../../utils/theme";
import { Feather } from "@expo/vector-icons";
import { dateManager, miniList } from "../../../UserUtils";

const { width }: any = Dimensions.get("window");

const HistoryCard = ({ first, second, colorComp }: any) => {
  return (
    <View style={[styles.priceCard, { backgroundColor: colorComp }]}>
      <Text style={styles.priceBoxFirst}>{first}</Text>
      <Text style={styles.priceBoxSecond}>{second}</Text>
    </View>
  );
};

const RenderListItem = ({ item, modalizeRef, setTradeCoinSelected }: any) => {
  const cardClickHandler = () => {
    setTradeCoinSelected(item);
    modalizeRef.current?.open();
  };
  const [buyColor, setBuyColor]: any = useState(theme.colors.lightGrey);
  const [sellColor, setSellColor]: any = useState(theme.colors.lightGrey);

  useEffect(() => {
    setBuyColor(item?.buyColor);
    setTimeout(() => setBuyColor(theme.colors.lightGrey), 1000);
  }, [item?.BuyPrice]);

  useEffect(() => {
    setSellColor(item?.sellColor);
    setTimeout(() => setSellColor(theme.colors.lightGrey), 1000);
  }, [item?.SellPrice]);

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={cardClickHandler}>
      <View style={styles.secondBox}>
        <View style={styles.nameBox}>
          {item?.PriceChange < 0 ? (
            <Feather name="chevrons-down" size={15} color={"red"} />
          ) : (
            <Feather name="chevrons-up" size={15} color={"green"} />
          )}
          <Text style={styles.name}>
            {item?.Exchange === "NSE"
              ? `NSE ${item?.InstrumentIdentifier}`
              : `${
                  miniList.find((itemObj) =>
                    item?.InstrumentIdentifier.includes(itemObj)
                  )
                    ? "MINI"
                    : "MCX"
                } ${item?.InstrumentIdentifier?.split("_")?.[1]}, ${dateManager(
                  item?.InstrumentIdentifier
                )}`}
          </Text>
        </View>
        <Text
          style={[
            styles.price,
            item?.PriceChange < 0 ? { color: "red" } : { color: "green" },
          ]}
        >
          {`${item?.PriceChange} (${item?.PriceChangePercentage}%)`}
        </Text>
      </View>

      <View style={styles.priceBoxParent}>
        <HistoryCard
          first={Number(item?.BuyPrice)?.toFixed(2)}
          second={`L: ${Number(item?.Low)?.toFixed(2)}`}
          colorComp={buyColor}
        />
        <HistoryCard
          first={Number(item?.SellPrice)?.toFixed(2)}
          second={`H: ${Number(item?.High)?.toFixed(2)}`}
          colorComp={sellColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RenderListItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.lightGrey,
    paddingVertical: 10,
  },
  secondBox: {},
  nameBox: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.3,
  },
  name: {
    ...theme.font.fontSemiBold,
    fontSize: 12,
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
    width: width * 0.27,
  },
  priceBoxFirst: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 13,
  },
  priceBoxSecond: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
    fontSize: 10,
  },
});
