import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
const { width } = Dimensions.get("window");
import { DatePickerModal } from "react-native-paper-dates";
import ProfitTab from "./Components/ProfitTab";
import LossTab from "./Components/LossTab";
import { useSettlementApi } from "../../../hooks/User/query";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const SettlementsReportScreen = ({ navigation }: any) => {
  const settleMentApiHit: any = useSettlementApi({
    query: {},
  });
  const [loading, setLoading]: any = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [settleMentApiHit.data]);
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

  const searchBtnHit = () => {};

  const resetBtnHit = () => {
    setRange({
      startDate: undefined,
      endDate: undefined,
    });
  };
  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loading} />
      <BasicHeader navigation={navigation} title={"Settlement Report"} />
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

        <View style={styles.buttonsBoxStyle}>
          <SmallBtnComponent
            title={"Search"}
            onPress={searchBtnHit}
            style={styles.btnStyle}
          />
          <SmallBtnComponent
            title={"Reset"}
            onPress={resetBtnHit}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
            style={styles.btnStyle}
          />
        </View>
      </View>
      <ScrollView>
        <ProfitTab />
        <LossTab />
      </ScrollView>
    </View>
  );
};

export default SettlementsReportScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  buttonsBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 13,
  },
  btnStyle: {
    marginLeft: 10,
    width: width * 0.23,
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
    width: width * 0.44,
    marginBottom: 10,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
});
