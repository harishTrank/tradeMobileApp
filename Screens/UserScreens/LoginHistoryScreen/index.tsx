import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import dayjs from "dayjs";
import { DatePickerModal } from "react-native-paper-dates";

const { width } = Dimensions.get("window");

const LoginHistoryScreen = ({ navigation }: any) => {
  const [selectedWeek, setSelectedWeek]: any = useState("");
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const [searchIconColorState, setSearchIconColorState]: any = useState(
    theme.colors.greyText
  );

  // date picker case working
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

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
  // ------------------------------

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Login History"} />
      <View style={styles.mainBox}>
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

        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color={searchIconColorState} />
          <TextInput
            value={searchExchangeText}
            onChangeText={setSearchExchangeText}
            placeholder="Seach exchange or script"
            placeholderTextColor={theme.colors.greyText}
            style={styles.searchTextBox}
            onBlur={() => setSearchIconColorState(theme.colors.greyText)}
            onFocus={() => setSearchIconColorState(theme.colors.blue)}
          />
        </View>

        <View style={styles.btnStyleBox}>
          <SmallBtnComponent
            style={styles.buttonBtn}
            title={"Search"}
            onPress={() => {}}
          />
          <SmallBtnComponent
            style={{ ...styles.buttonBtn, ...{ marginLeft: 15 } }}
            title={"Reset"}
            onPress={() => {}}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
  },
  dropDownMargin: { marginTop: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchTextBox: {
    ...theme.font.fontMedium,
    fontSize: 15,
    marginLeft: 10,
    width: width * 0.8,
  },
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonBtn: {
    width: width * 0.4,
  },
  dateBox: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  datePersonalBox: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    width: width * 0.43,
    marginBottom: 10,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
});
