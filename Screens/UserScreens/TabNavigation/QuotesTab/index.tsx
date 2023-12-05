import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CustomTabFund from "../../../ReUseComponents/CustomTabFund";
import theme from "../../../../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import RenderListItem from "./Components/RenderListItem";
import { Modalize } from "react-native-modalize";
import ModalizeData from "./Components/ModalizeData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { tradeSelectedCoinGlobal } from "../../../../JotaiStore";
import FullScreenLoader from "../../../ReUseComponents/FullScreenLoader";
import {
  getFilterData,
  getFilterOff,
  subscribeToFilterData,
} from "../../../../utils/socket/SocketService";
import { getUserTradeCoin } from "../../../../store/Services/TradeCoin";
import MessageModalizer from "../../../ReUseComponents/MessageModalizer";

const { height }: any = Dimensions.get("window");

const QuotesTab = ({ navigation }: any) => {
  const [watchListData, setWatchListData]: any = useState([]);

  const focusRefetchContant = async () => {
    const quantityData: any = await AsyncStorage.getItem("quantity");
    setQuantityState(JSON.parse(quantityData));
  };

  // message modalizer ----------------------------
  const [, setTradeCoinSelected]: any = useAtom(tradeSelectedCoinGlobal);
  const modalizeRef = useRef<Modalize>(null);
  const [quantityState, setQuantityState]: any = useState({});
  const [loading, setLoading]: any = useState(false);
  const [errorFlag, setErrorFlag]: any = useState(false);
  const [modalizeMessage, setModalizeMessage]: any = useState("");
  const [insufficientFlag, setInsufficientFlag]: any = useState(false);
  const messageModalize = useRef<Modalize>(null);
  // ----------------------------------------------

  // socket manage case -------------------------
  useEffect(() => {
    subscribeToFilterData((data: any) => {
      setLoading(false);
      setWatchListData(data);
    });
  }, []);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setLoading(true);
      getUserTradeCoin()
        .then((res: any) => {
          getFilterData({ identifier: res.result });
        })
        ?.catch((err: any) => console.log("err", err));
      focusRefetchContant();
    });
  }, [navigation]);

  useEffect(() => {
    return navigation.addListener("blur", () => {
      getFilterOff();
    });
  }, [navigation]);
  // ------------------------------------------------

  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loading} />
      <CustomTabFund navigation={navigation} title={"Marketwatch"} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddSymbolListScreen")}
        style={styles.searchBox}
      >
        <View style={styles.searchChildBox}>
          <Ionicons name="search" size={24} color={theme.colors.greyText} />
          <Text style={{ ...styles.searchText, paddingLeft: 10 }}>
            Search & Add
          </Text>
        </View>
        <Text style={styles.searchText}>{watchListData?.length || 0}/100</Text>
      </TouchableOpacity>

      <FlatList
        data={watchListData}
        keyExtractor={(item: any) => item?.InstrumentIdentifier}
        renderItem={({ item }: any) => (
          <RenderListItem
            item={item}
            setTradeCoinSelected={setTradeCoinSelected}
            modalizeRef={modalizeRef}
          />
        )}
        ListEmptyComponent={
          <>
            {!loading && (
              <View style={styles.emptyCardView}>
                <Text style={styles.emptyText}>
                  Market Watch not added yet!
                </Text>
              </View>
            )}
          </>
        }
        showsVerticalScrollIndicator={false}
      />

      <Modalize ref={modalizeRef} modalHeight={height * 0.7}>
        <ModalizeData
          navigation={navigation}
          quantityState={quantityState}
          setLoading={setLoading}
          setErrorFlag={setErrorFlag}
          setModalizeMessage={setModalizeMessage}
          messageModalize={messageModalize}
          setInsufficientFlag={setInsufficientFlag}
        />
      </Modalize>

      <Modalize ref={messageModalize} modalHeight={height * 0.32}>
        <MessageModalizer
          messageModalize={messageModalize}
          error={errorFlag}
          message={modalizeMessage}
          insufficientFlag={insufficientFlag}
        />
      </Modalize>
    </View>
  );
};

export default QuotesTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  searchChildBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
  emptyCardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.65,
  },
  emptyText: {
    color: theme.colors.black,
    ...theme.font.fontRegular,
  },
});
