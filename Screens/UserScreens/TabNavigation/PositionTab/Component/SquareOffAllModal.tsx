import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../../../utils/theme";
import CheckBoxComponent from "../../../../ReUseComponents/CheckBoxComponent";
import { Entypo } from "@expo/vector-icons";
import SmallBtnComponent from "../../../../ReUseComponents/SmallBtnComponent";

const { height } = Dimensions.get("window");

const RenderSquareItem = ({
  item,
  socketResponse,
  setCheckedManager,
  checkedManager,
}: any) => {
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
    <View style={styles.itemContainer}>
      <View style={styles.itemFirstRow}>
        <View style={styles.checkBoxMaintainer}>
          <CheckBoxComponent
            value={
              checkedManager.find(
                (findItem: any) => findItem?.identifer === item?.identifer
              )
                ? true
                : false
            }
            setValue={(val: any) => {
              val
                ? setCheckedManager([...checkedManager, item])
                : setCheckedManager(
                    checkedManager.filter(
                      (filterItem: any) =>
                        filterItem?.identifer !== item?.identifer
                    )
                  );
            }}
          />
          <Text style={[styles.itemText, { marginLeft: 5 }]}>
            {item?.coin_name} ,{" "}
            <Text
              style={[
                styles.itemText,
                { color: item?.total_quantity > 0 ? "green" : "red" },
              ]}
            >
              {" "}
              {item?.total_quantity > 0
                ? `${item?.total_quantity} BUY`
                : `${Math.abs(item?.total_quantity)} SELL`}
            </Text>
          </Text>
        </View>
        {isNaN(finalProfitLoss) ? (
          <ActivityIndicator size={"small"} color={theme.colors.primaryDark} />
        ) : (
          <Text
            style={[
              styles.itemText,
              { color: Number(finalProfitLoss) > 0 ? "green" : "red" },
            ]}
          >
            {finalProfitLoss}
          </Text>
        )}
      </View>

      <View style={styles.itemSecondRow}>
        <Text style={styles.smallText}>
          {item?.total_quantity > 0
            ? item?.avg_buy_price?.toFixed(2)
            : item?.avg_sell_price?.toFixed(2)}
        </Text>
        <Entypo
          name="arrow-long-right"
          size={20}
          color="black"
          style={styles.arrowIcon}
        />
        <Text style={styles.smallText}>
          {item?.total_quantity > 0
            ? socketResponse?.BuyPrice?.toFixed(2)
            : socketResponse?.SellPrice?.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const SquareOffAllModal = ({
  squareOffScreen,
  setSquareOffScreen,
  data,
  socketResponse,
  buySellHandler,
}: any) => {
  const [checkedManager, setCheckedManager]: any = useState([]);

  const allCheckClickHandler = (val: any) => {
    val ? setCheckedManager(data) : setCheckedManager([]);
  };

  const squareOffPosition = () => {
    buySellHandler(checkedManager);
    setSquareOffScreen(false);
  };
  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={squareOffScreen}>
        <View
          style={{
            paddingTop: useSafeAreaInsets().top,
            backgroundColor: theme.colors.primaryDark,
          }}
        />
        <StatusBar style="light" />
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => setSquareOffScreen(false)}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Square-Off All Position</Text>
          <CheckBoxComponent
            value={checkedManager.length === 0 ? false : true}
            setValue={allCheckClickHandler}
          />
        </View>

        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item: any) => item.identifer}
            renderItem={({ item }: any) => (
              <RenderSquareItem
                item={item}
                setCheckedManager={setCheckedManager}
                checkedManager={checkedManager}
                socketResponse={socketResponse.find(
                  (findObject: any) =>
                    findObject?.InstrumentIdentifier === item?.identifer
                )}
              />
            )}
          />
          <SmallBtnComponent
            onPress={squareOffPosition}
            title="Square-Off Position"
            style={{
              marginBottom: useSafeAreaInsets().bottom + 10,
              marginHorizontal: 10,
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.white,
    padding: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    ...theme.elevationLight,
  },
  title: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
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
  smallText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    fontSize: 12,
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  checkBoxMaintainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SquareOffAllModal;
