import React, { useEffect, useState } from "react";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { TextInput } from "react-native-paper";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import { getBrkSettings } from "../../../store/Services/TradeCoin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { usePostBrkSettings } from "../../../hooks/TradeCoin/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const { width } = Dimensions.get("window");

const SelectOptionComponent = ({
  title,
  currentSelection,
  setCurrentSelection,
}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnSelect,
        currentSelection === title && {
          borderColor: theme.colors.primary,
        },
      ]}
      onPress={() => setCurrentSelection(title)}
    >
      <Text
        style={[
          styles.btnText,
          currentSelection === title && {
            color: theme.colors.primary,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const RowElement = ({
  second,
  third,
  setListData,
  checkBox,
  selectAll,
  setSelectAll,
}: any) => {
  const clickCheckBox = (val: any) => {
    setListData((oldValue: any) =>
      oldValue.map((mapItem: any) => {
        return mapItem.identifier !== second.replaceAll(" ", "_")
          ? mapItem
          : { ...mapItem, checkBox: val };
      })
    );
  };
  return (
    <View style={styles.rowElementStyle}>
      <View style={[styles.box, { flex: 1 }]}>
        <CheckBoxComponent
          value={second === "Script Name" ? selectAll : checkBox}
          setValue={(val: boolean) =>
            second === "Script Name" ? setSelectAll(val) : clickCheckBox(val)
          }
        />
      </View>
      <View
        style={[
          styles.box,
          { flex: 7, alignItems: "flex-start", paddingLeft: 10 },
        ]}
      >
        <Text style={styles.defaultText}>{second}</Text>
      </View>
      <View style={[styles.box, { flex: 2 }]}>
        <Text style={styles.defaultText}>
          {third === "Brk" ? third : Number(third).toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const BrkSettingScreen = ({ navigation, route }: any) => {
  const [currentSelection, setCurrentSelection]: any =
    useState("TURNOVER WISE");
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [selectAll, setSelectAll]: any = useState(false);
  const [amountVal, setAmountVal]: any = useState("");
  const [listData, setListData]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const updateBrkSettings: any = usePostBrkSettings();

  const clearBtnHandler = () => {
    setListData([]);
    setExchangeValue("");
    setAmountVal("");
  };

  useEffect(() => {
    setListData((oldValue: any) =>
      oldValue.map((mapItem: any) => {
        return { ...mapItem, checkBox: selectAll };
      })
    );
  }, [selectAll]);

  useEffect(() => {
    if (exchangeValue && exchangeValue != "") {
      setLoading(true);
      getBrkSettings({
        query: {
          user_id: route.params?.user_id,
          ex_change: exchangeValue,
        },
      })
        .then((res: any) => {
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
        currentSelection === "TURNOVER WISE" ? "turnover_brk" : "lot_brk";
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
    } else {
      setLoading(true);
      updateBrkSettings
        ?.mutateAsync({
          body: {
            brk_type: currentSelection,
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
      <BasicHeader title="Brk Setting" navigation={navigation} />
      <FullScreenLoader loading={loading} />
      <FlatList
        data={listData}
        style={{ marginBottom: useSafeAreaInsets().bottom + 10 }}
        ListHeaderComponent={
          <>
            <View style={styles.headerMainBox}>
              <View style={styles.btnSelection}>
                <SelectOptionComponent
                  setCurrentSelection={setCurrentSelection}
                  currentSelection={currentSelection}
                  title="TURNOVER WISE"
                />
                <SelectOptionComponent
                  title="LOT WISE"
                  setCurrentSelection={setCurrentSelection}
                  currentSelection={currentSelection}
                />
              </View>
              <View style={styles.secondRow}>
                <DropDownComponent
                  data={route?.params?.exchange?.map((item: any) => {
                    return { name: item.toUpperCase() };
                  })}
                  value={exchangeValue}
                  setValue={setExchangeValue}
                  placeholder={"Exchange"}
                  style={styles.dropDownMargin}
                  search={false}
                  fieldKey={"name"}
                />
                <SmallBtnComponent
                  title="Clear"
                  onPress={clearBtnHandler}
                  style={styles.clearBtn}
                  textColor={theme.colors.black}
                  fontStyle={theme.font.fontMedium}
                />
              </View>

              <View style={styles.thirdRow}>
                <TextInput
                  label="Amount"
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
            </View>
            <RowElement
              second="Script Name"
              third="Brk"
              listData={listData}
              setListData={setListData}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
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
            third={
              currentSelection === "TURNOVER WISE"
                ? item?.turnover_brk
                : item?.lot_brk
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
  headerMainBox: {
    margin: 5,
    marginVertical: 10,
  },
  btnSelection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  btnSelect: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: theme.colors.black,
  },
  btnText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownMargin: {
    width: width * 0.47,
    margin: 5,
    marginTop: 10,
    marginRight: 10,
  },
  clearBtn: {
    width: width * 0.2,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginTop: 5,
  },
  thirdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  amountInput: {
    width: width * 0.47,
    height: 40,
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
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
});

export default BrkSettingScreen;
