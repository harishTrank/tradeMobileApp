import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import UserListDropDown from "../AccountSummaryScreen/Components/UserListDropDown";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetWeeklyAdmin } from "../../../hooks/TradeCoin/query";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import axios from "axios";
import { nodeURL } from "../../../utils/socket/SocketService";

const { width } = Dimensions.get("window");

const HearderBox = ({ text, value }: any) => {
  return (
    <View>
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>{text}</Text>
        <FontAwesome5 name="arrow-down" size={16} color="black" />
      </View>
      <Text
        style={[
          styles.headerText,
          { color: value < 0 ? theme.colors.primary : "green" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const RenderItem = ({ item, m2mVal }: any) => {
  const m2mFinal: any = Number(
    m2mVal && m2mVal.length !== 0
      ? m2mVal?.reduce((a: any, b: any) => a?.m2mTotal + b?.m2mTotal) || 0
      : 0
  )?.toFixed(2);
  return (
    <View style={styles.itemBox}>
      <Text style={styles.userText}>
        {item?.user_summary__user_name}({item?.user_summary__user_type})
      </Text>
      <View style={styles.rowStyle}>
        <View>
          <Text style={styles.heading}>Realised P&L</Text>
          <Text
            style={[
              styles.amountStyle,
              { color: item?.total_amount > 0 ? "green" : "red" },
            ]}
          >
            {item?.total_amount?.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>M2M P&L</Text>
          <Text
            style={[
              styles.amountStyle,
              {
                color: m2mFinal > 0 ? "green" : "red",
              },
            ]}
          >
            {m2mFinal}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Total P&L</Text>
          <Text
            style={[
              styles.amountStyle,
              {
                color:
                  Number(m2mFinal) + Number(item?.total_amount) > 0
                    ? "green"
                    : "red",
              },
            ]}
          >
            {(Number(m2mFinal) + Number(item?.total_amount)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const WeeklyAdminScreen = ({ navigation }: any) => {
  const [currentUser]: any = useAtom(currentUserData);
  const [submitResponse, setSubmitResponse]: any = useState("");
  const [userDropDownVal, setUserDropDownVal]: any = useState("");
  const [m2mListUserWise, setM2MListUserWise]: any = useState([]);
  const [m2mTotal, setm2mTotal]: any = useState(0);

  const getweeklyAdmin: any = useGetWeeklyAdmin({
    query: {
      user_name:
        submitResponse !== "" ? submitResponse : currentUser?.user_name,
    },
  });

  const totalReleaseP_L: any = useMemo(() => {
    return getweeklyAdmin?.data?.release_p_and_l.length !== 1
      ? getweeklyAdmin?.data?.release_p_and_l
          ?.reduce((a: any, b: any) => a.total_amount + b.total_amount)
          ?.toFixed(2) || 0
      : getweeklyAdmin?.data?.release_p_and_l?.[0]?.total_amount?.toFixed(2) ||
          0;
  }, [getweeklyAdmin?.data?.release_p_and_l]);

  const searchBtnHandler = () => {
    setSubmitResponse(userDropDownVal);
  };
  const resetHandler = () => {
    setUserDropDownVal("");
    setSubmitResponse("");
  };

  useEffect(() => {
    if (getweeklyAdmin?.data?.result) {
      axios
        .post(`${nodeURL}/api/tradeCoin/weekly`, {
          identifiers: getweeklyAdmin?.data?.result?.map(
            (mapItem: any) => mapItem.identifer
          ),
        })
        .then((res: any) => {
          setM2MListUserWise([]);
          getweeklyAdmin?.data?.result.map((mapItem: any) => {
            setM2MListUserWise((oldValue: any) => {
              const currentLiveData: any = res.data?.response?.find(
                (liveData: any) =>
                  liveData?.InstrumentIdentifier === mapItem?.identifer
              );
              const currentP_L: any =
                mapItem?.total_quantity > 0
                  ? (currentLiveData?.BuyPrice - mapItem?.avg_buy_price) *
                    mapItem?.total_quantity *
                    currentLiveData?.QuotationLot
                  : (mapItem?.avg_sell_price - currentLiveData?.SellPrice) *
                    Math.abs(mapItem?.total_quantity) *
                    currentLiveData?.QuotationLot;
              return [
                ...(oldValue || []),
                {
                  user_id: mapItem?.buy_sell_user__id,
                  m2mTotal: currentP_L,
                },
              ];
            });
          });
        })
        .catch((err: any) => console.log("err", err));
    }
  }, [getweeklyAdmin?.data?.result]);

  useEffect(() => {
    setm2mTotal(
      Number(
        m2mListUserWise && m2mListUserWise.length !== 0
          ? m2mListUserWise?.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + currentValue?.m2mTotal,
              0
            ) || 0
          : 0
      )?.toFixed(2)
    );
  }, [m2mListUserWise]);

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"% Weekly Admin"} />
      <View style={styles.btnStyleBox}>
        <View style={{ width: "45%", marginLeft: 10 }}>
          <UserListDropDown
            userDropDownVal={userDropDownVal}
            setUserDropDownVal={setUserDropDownVal}
          />
        </View>
        <>
          <SmallBtnComponent
            style={styles.buttonBtn}
            title={"Search"}
            onPress={searchBtnHandler}
          />
          <SmallBtnComponent
            style={{
              ...styles.buttonBtn,
              ...{ marginLeft: 5, marginRight: 15 },
            }}
            title={"Clear"}
            onPress={resetHandler}
            backgroundColor={theme.colors.lightGrey}
            textColor={theme.colors.secondary}
          />
        </>
      </View>

      {getweeklyAdmin?.data && (
        <FlatList
          data={getweeklyAdmin?.data?.release_p_and_l || []}
          ListHeaderComponent={
            <View style={styles.rowStyle}>
              <HearderBox text={"Realised P&L"} value={totalReleaseP_L} />
              <HearderBox text={"M2M P&L"} value={m2mTotal} />
              <HearderBox
                text={"Total P&L"}
                value={(Number(totalReleaseP_L) + Number(m2mTotal)).toFixed(2)}
              />
            </View>
          }
          style={styles.flatlistStyle}
          keyExtractor={(item: any) => item.user_summary__id}
          renderItem={({ item }: any) => (
            <RenderItem
              item={item}
              m2mVal={m2mListUserWise.filter(
                (f: any) => f?.user_id === item?.user_summary__id
              )}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  btnStyleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBtn: {
    width: width * 0.215,
  },
  flatlistStyle: {
    margin: 10,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    ...theme.font.fontSemiBold,
    marginRight: 5,
  },
  heading: {
    ...theme.font.fontSemiBold,
    color: theme.colors.greyText,
  },
  itemBox: {
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  userText: {
    ...theme.font.fontSemiBold,
    fontSize: 15,
  },
  amountStyle: {
    ...theme.font.fontSemiBold,
  },
});

export default WeeklyAdminScreen;
