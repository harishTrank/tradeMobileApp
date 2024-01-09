import React, { useEffect, useState } from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { TextInput } from "react-native-paper";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import { getTradeMarginSettings } from "../../../store/Services/TradeCoin";
import { usePostTradeMarginSettings } from "../../../hooks/TradeCoin/mutation";
import Toast from "react-native-toast-message";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width } = Dimensions.get("window");

const RowElement = ({
  second,
  third,
  listData,
  setListData,
  checkBox,
  exchangeValue,
}: any) => {
  const clickCheckBox = (val: any) => {
    if (second === "Script Name" && listData && listData.length > 0) {
      setListData((oldValue: any) =>
        oldValue.map((mapItem: any) => {
          return { ...mapItem, checkBox: val };
        })
      );
    } else {
      setListData((oldValue: any) =>
        oldValue.map((mapItem: any) => {
          return mapItem.identifier !== second.replaceAll(" ", "_")
            ? mapItem
            : { ...mapItem, checkBox: val };
        })
      );
    }
  };
  return (
    <View style={styles.rowElementStyle}>
      <View style={[styles.box, { flex: 1 }]}>
        <CheckBoxComponent value={checkBox} setValue={clickCheckBox} />
      </View>
      <View
        style={[
          styles.box,
          { flex: 6, alignItems: "flex-start", paddingLeft: 10 },
        ]}
      >
        <Text style={styles.defaultText}>{second}</Text>
      </View>
      <View style={[styles.box, { flex: 3 }]}>
        <Text style={styles.defaultText}>
          {`${second === "Script Name" ? third : Number(third)?.toFixed(2)}${
            second !== "Script Name" && exchangeValue?.toUpperCase() === "NSE"
              ? "%"
              : ""
          }`}
        </Text>
      </View>
    </View>
  );
};

const TradeMarginScreen = ({ navigation, route }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [typeBase, setTypeBase]: any = useState("Percentage");
  const [amountVal, setAmountVal]: any = useState("");
  const [listData, setListData]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const updateSingleApiCall: any = usePostTradeMarginSettings();

  useEffect(() => {
    if (exchangeValue && exchangeValue != "") {
      setLoading(true);
      getTradeMarginSettings({
        query: {
          user_id: route.params?.user_id,
          ex_change: exchangeValue,
        },
      })
        .then((res: any) => {
          setTypeBase(
            exchangeValue?.toUpperCase() === "NSE" ? "Percentage" : "Amount"
          );
          setListData(res.response);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [exchangeValue]);

  const applyBtnHandler = () => {
    if (amountVal === "") {
      return Toast.show({
        type: "error",
        text1: "Amount is required.",
      });
    } else {
      const currentKey =
        exchangeValue?.toUpperCase() === "NSE"
          ? "trademargin_percentage"
          : "trademargin_amount";
      setListData((oldValue: any) => {
        return oldValue.map((mapItem: any) =>
          mapItem?.checkBox ? { ...mapItem, [currentKey]: amountVal } : mapItem
        );
      });
    }
  };

  const updateBtnHandler = () => {
    if (
      listData.length === 0 &&
      listData?.filter((filterItem: any) => filterItem.checkBox)?.length === 0
    ) {
      return Toast.show({
        type: "error",
        text1: "Nothing to update.",
      });
    } else if (exchangeValue?.toUpperCase() === "NSE" && amountVal > 100) {
      return Toast.show({
        type: "error",
        text1: "Percentage out of range.",
      });
    } else {
      setLoading(true);
      updateSingleApiCall
        ?.mutateAsync({
          body: {
            update_type:
              exchangeValue?.toUpperCase() === "NSE" ? "PERCENTAGE" : "AMOUNT",
            amount: amountVal,
            object_list: listData
              ?.filter((filterItem: any) => filterItem.checkBox)
              ?.map((mapItem: any) => {
                return mapItem.id;
              }),
          },
        })
        .then((res: any) => {
          setLoading(false);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
          return Toast.show({
            type: "success",
            text1: res?.message,
          });
        })
        .catch(() => setLoading(false));
    }
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title="Trade Margin Setting" />
      <FullScreenLoader loading={loading} />
      <FlatList
        data={listData}
        ListHeaderComponent={
          <>
            <View style={styles.firstRow}>
              <DropDownComponent
                data={route?.params?.exchange?.map((item: any) => {
                  return { name: item.toUpperCase() };
                })}
                value={exchangeValue}
                setValue={setExchangeValue}
                placeholder={"Exchange"}
                search={false}
                fieldKey={"name"}
                style={styles.dropDown}
              />
              <DropDownComponent
                data={[{ name: "Percentage" }, { name: "Amount" }]}
                value={typeBase}
                setValue={setTypeBase}
                search={false}
                fieldKey={"name"}
                style={styles.dropDown}
                disable={true}
              />
            </View>

            <View style={styles.thirdRow}>
              <TextInput
                label={"Value"}
                theme={{ roundness: 5 }}
                value={amountVal}
                mode="outlined"
                onChangeText={(val: any) =>
                  setAmountVal(val.replaceAll("-", ""))
                }
                style={styles.amountInput}
                keyboardType="numeric"
              />
              <SmallBtnComponent
                title="Apply"
                onPress={applyBtnHandler}
                fontStyle={theme.font.fontMedium}
                style={[
                  styles.clearBtn,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <SmallBtnComponent
                title="Update"
                onPress={updateBtnHandler}
                style={styles.clearBtn}
                fontStyle={theme.font.fontMedium}
                textColor={theme.colors.black}
              />
            </View>
            <SmallBtnComponent
              title="Update To All Users"
              onPress={() => console.log("Update")}
              style={styles.updateAll}
              fontStyle={theme.font.fontRegular}
              textColor={theme.colors.black}
            />
            <RowElement
              second="Script Name"
              third="Trade Margin"
              listData={listData}
              setListData={setListData}
              exchangeValue={exchangeValue}
            />
          </>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: any) => (
          <RowElement
            second={item?.identifier}
            setListData={setListData}
            checkBox={item?.checkBox}
            exchangeValue={exchangeValue}
            third={
              exchangeValue?.toUpperCase() === "NSE"
                ? item?.trademargin_percentage
                : item?.trademargin_amount
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  thirdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  amountInput: {
    width: width * 0.47,
    height: 40,
    marginBottom: 10,
  },
  clearBtn: {
    width: width * 0.2,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  firstRow: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDown: {
    width: width * 0.46,
  },
  rowElementStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  box: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultText: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 13,
  },
  updateAll: {
    margin: 10,
    marginTop: 0,
    backgroundColor: theme.colors.border,
  },
});

export default TradeMarginScreen;
