import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import theme from "../../../../utils/theme";
import { dateManager } from "../../UserUtils";

const { width } = Dimensions.get("window");

const ScriptCard = ({
  item,
  index,
  modalizeRef,
  setTradeCoinSelected,
  addCoinApi,
  deleteCoinApi,
  tradeCoinData,
  setTradeCoinData,
  scriptType,
}: any) => {
  const [checkBoxValue, setCheckBoxValue]: any = useState(
    tradeCoinData.includes(item?.InstrumentIdentifier)
  );

  const checkBoxHandler = () => {
    setCheckBoxValue(!checkBoxValue);
    if (!checkBoxValue) {
      addCoinApi
        ?.mutateAsync({
          body: {
            trade_coin_id: item.InstrumentIdentifier,
          },
        })
        .then((res: any) =>
          setTradeCoinData((oldValue: any) => {
            return [...oldValue, item.InstrumentIdentifier];
          })
        )
        ?.catch((err: any) => console.log("err", err));
    } else {
      deleteCoinApi
        ?.mutateAsync({
          query: {
            trade_coin_id: item.InstrumentIdentifier,
          },
        })
        .then((res: any) =>
          setTradeCoinData((oldValue: any) => {
            return oldValue.filter(
              (filterItem: any) => filterItem !== item.InstrumentIdentifier
            );
          })
        )
        ?.catch((err: any) => console.log("err", err));
    }
  };

  // useEffect(() => {
  //   console.log("checkBoxValue", checkBoxValue, item.InstrumentIdentifier);
  // }, [checkBoxValue]);

  const viewBottomSheet = () => {
    setTradeCoinSelected(item);
    modalizeRef.current?.open();
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        index % 2 === 1 && { backgroundColor: theme.colors.lightGrey },
      ]}
      onPress={checkBoxHandler}
    >
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={checkBoxHandler}
          style={[styles.checkBox, checkBoxValue && { borderColor: "green" }]}
        >
          {checkBoxValue && (
            <FontAwesome5 name="check" size={15} color={"green"} />
          )}
        </TouchableOpacity>
        <Text style={styles.titleStyle}>
          {scriptType === "NSE"
            ? `NSE ${item?.InstrumentIdentifier}`
            : `${scriptType} ${
                item?.InstrumentIdentifier?.split("_")?.[1]
              }, ${dateManager(item?.InstrumentIdentifier)}`}
        </Text>
      </View>
      <TouchableOpacity onPress={viewBottomSheet}>
        <Entypo name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.lightBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
  },
  titleStyle: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
    marginLeft: 15,
  },
});

export default ScriptCard;
