import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

const { width }: any = Dimensions.get("window");

const MarketTimingScreen = ({ navigation }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");
  const [currentUser]: any = useAtom(currentUserData);
  const [openCalender, setOpenCalender]: any = useState(false);
  const [marketToastMessage, setMarketToastMessage]: any = useState("");

  // calender managers -----------------------------------------
  const [selectedDate, setSelectedDate]: any = useState("");

  const getMarkedDates = () => {
    const marked: any = {};
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 1; i <= 12; i++) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(currentYear, i - 1, day);
        const dateString = date.toISOString().split("T")[0];
        if (dateString === selectedDate) {
          marked[dateString] = {
            selected: true,
            selectedColor: theme.colors.primary,
          };
        } else if (date.getDay() === 0 || date.getDay() === 1) {
          marked[dateString] = { marked: true, dotColor: "red" };
        } else {
          marked[dateString] = { marked: true, dotColor: "green" };
        }
      }
    }
    return marked;
  };

  const handleDayPress = (date: any) => {
    setSelectedDate(date.dateString);
  };
  // -----------------------------------------------------------
  const errorMessageReturn = () => {
    if (exchangeValue === "NSE") {
      setMarketToastMessage("09:16 AM - 03:30 PM");
    } else {
      setMarketToastMessage("09:01 AM - 11:55 PM");
    }
  };

  const searchBtnHandler = () => {
    errorMessageReturn();
    setOpenCalender(true);
  };

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Market Timings"} />
      <View style={styles.mainBox}>
        <DropDownComponent
          data={currentUser?.exchange?.map((item: any) => {
            return { name: item };
          })}
          value={exchangeValue}
          setValue={setExchangeValue}
          placeholder={"Exchange"}
          style={styles.dropDownMargin}
          search={false}
          fieldKey={"name"}
        />
        <SmallBtnComponent title={"Search"} onPress={searchBtnHandler} />
      </View>

      {openCalender && (
        <>
          <Calendar
            markedDates={getMarkedDates()}
            onDayPress={handleDayPress}
            hideExtraDays={true}
            enableSwipeMonths={true}
            theme={{
              selectedDayBackgroundColor: theme.colors.primary,
              todayTextColor: theme.colors.primary,
              arrowColor: theme.colors.primary,
            }}
          />

          <View style={styles.dayFotterStyle}>
            {selectedDate !== "" ? (
              <View style={styles.selectedBox}>
                <View style={styles.dateBox}>
                  <Text style={styles.month}>
                    {dayjs(selectedDate).format("MMM").toUpperCase()}
                  </Text>
                  <Text style={styles.date}>
                    {dayjs(selectedDate).format("DD")}
                  </Text>
                </View>
                <View
                  style={[
                    styles.marketTimingBox,
                    Number(dayjs(selectedDate).format("d")) === 0 ||
                    Number(dayjs(selectedDate).format("d")) === 6
                      ? {
                          backgroundColor: "red",
                        }
                      : {
                          backgroundColor: "green",
                        },
                  ]}
                >
                  <Text style={styles.marketTiming}>
                    {Number(dayjs(selectedDate).format("d")) === 0 ||
                    Number(dayjs(selectedDate).format("d")) === 6
                      ? "12:00 AM - 12:00 AM"
                      : marketToastMessage}
                  </Text>
                </View>
              </View>
            ) : (
              <Text>No selected date</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default MarketTimingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    marginHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDownMargin: {
    marginVertical: 10,
    width: width * 0.4,
  },
  dayFotterStyle: {
    margin: 10,
  },
  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateBox: {
    width: width * 0.1,
  },
  month: {
    ...theme.font.fontMedium,
    fontSize: 12,
    color: theme.colors.greyText,
    textAlign: "center",
  },
  date: {
    ...theme.font.fontMedium,
    fontSize: 18,
    color: theme.colors.black,
    textAlign: "center",
  },
  marketTimingBox: {
    width: width * 0.82,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  marketTiming: {
    ...theme.font.fontMedium,
    color: theme.colors.white,
  },
});
