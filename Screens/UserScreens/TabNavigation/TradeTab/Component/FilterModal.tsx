import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import theme from "../../../../../utils/theme";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";
import SmallBtnComponent from "../../../../ReUseComponents/SmallBtnComponent";
import DropDownComponent from "../../../../ReUseComponents/DropDownComponent";
import { useUserCoinList } from "../../../../../hooks/TradeCoin/query";
import { useAtom } from "jotai";
import { currentUserData } from "../../../../../JotaiStore";

const { width } = Dimensions.get("window");

const FilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  setDateRange,
  setCurrentPage,
  successTradeList,
  setExchangeKey,
  setSearchText,
}: any) => {
  const [selectScript, setSelectScript]: any = useState("");
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage]: any = useState("");
  const [currentUser]: any = useAtom(currentUserData);

  const userCoinListApi: any = useUserCoinList();

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: any) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  const searchHandler = () => {
    setCurrentPage(1);
    setOpenFilterModal(false);
    setErrorMessage("");
    setExchangeKey(exchangeValue);
    setSearchText(selectScript);
    if (range?.startDate) {
      setDateRange(range);
    }
  };

  const onCloseHandler = () => {
    setOpenFilterModal(false);
    setErrorMessage("");
  };

  const onResetHandler = () => {
    setRange({ startDate: undefined, endDate: undefined });
    setDateRange({
      startDate: "",
      endDate: "",
    });
    setExchangeKey("");
    setSearchText("");
    setCurrentPage(1);
    setOpenFilterModal(false);
    setSelectScript("");
    setExchangeValue("");
    successTradeList.refetch();
  };

  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={openFilterModal}>
        <View style={styles.opacityScreen}>
          <View style={styles.card}>
            <View style={styles.secondBox}>
              <Text style={styles.headingDate}>Filter</Text>
              <TouchableOpacity onPress={onCloseHandler}>
                <Entypo name="cross" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.dateBox}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.datePersonalBox}
              >
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text style={styles.dateText}>
                  {range?.startDate
                    ? dayjs(`${range?.startDate}`).format("DD/MM/YYYY")
                    : "From Date"}
                </Text>
              </TouchableOpacity>

              <DatePickerModal
                locale="en"
                mode="range"
                visible={open}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
                validRange={{ endDate: new Date() }}
              />

              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.datePersonalBox}
              >
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text style={styles.dateText}>
                  {range?.endDate
                    ? dayjs(`${range?.endDate}`).format("DD/MM/YYYY")
                    : "To Date"}
                </Text>
              </TouchableOpacity>
            </View>

            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <View style={styles.dateBox}>
              <DropDownComponent
                data={currentUser?.exchange?.map((item: any) => {
                  return { name: item };
                })}
                value={exchangeValue}
                setValue={setExchangeValue}
                placeholder={"Exchange"}
                search={false}
                style={styles.dropDownStyle}
                placeholderStyle={{ fontSize: 15 }}
                fieldKey={"name"}
              />
              <DropDownComponent
                data={
                  userCoinListApi?.data?.response?.filter((filterObj: any) => {
                    return filterObj?.coin_name?.includes(exchangeValue);
                  }) || []
                }
                value={selectScript}
                setValue={setSelectScript}
                placeholder={"Select Script"}
                search
                style={styles.dropDownStyle}
                placeholderStyle={{ fontSize: 15 }}
                fieldKey={"coin_name"}
              />
            </View>

            <View style={styles.btnParent}>
              <SmallBtnComponent title={"SEARCH"} onPress={searchHandler} />
              <View style={{ marginLeft: 10 }} />
              <SmallBtnComponent title={"RESET"} onPress={onResetHandler} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainBox: {
    backgroundColor: theme.colors.lightGrey,
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBlockColor: theme.colors.greyText,
  },
  headingText: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  opacityScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  secondBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  headingDate: {
    ...theme.font.fontMedium,
    color: theme.colors.greyText,
    width: width - 80,
    textAlign: "center",
    fontSize: 18,
  },
  dateBox: {
    alignItems: "center",
  },
  datePersonalBox: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    width: width * 0.75,
    marginBottom: 10,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
  errorText: {
    ...theme.font.fontRegular,
    color: "red",
    textAlign: "center",
  },
  btnParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownStyle: {
    width: width * 0.75,
    borderColor: theme.colors.lightGrey,
    marginBottom: 10,
  },
});

export default FilterModal;
