import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import theme from "../../../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import ScriptHeader from "./Components/ScriptHeader";
import ScriptCard from "./Components/ScriptCard";
import { useAtom } from "jotai";
import { selectedCoinList, tradeSelectedCoinGlobal } from "../../../JotaiStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import ModalizeData from "../TabNavigation/QuotesTab/Components/ModalizeData";
import {
  useAddTradeCoin,
  useDeleteTradeCoin,
} from "../../../hooks/TradeCoin/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageModalizer from "../../ReUseComponents/MessageModalizer";
import { dateManager } from "../UserUtils";
import { nodeURL } from "../../../utils/socket/SocketService";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const AddScriptsScreen = ({ navigation, route }: any) => {
  const [searchText, setSearchText]: any = useState("");
  const [tradeCoin, setTradeCoin]: any = useState([]);
  const [, setTradeCoinSelected]: any = useAtom(tradeSelectedCoinGlobal);
  const modalizeRef = useRef<Modalize>(null);
  const addCoinApi: any = useAddTradeCoin();
  const deleteCoinApi: any = useDeleteTradeCoin();
  const [loading, setLoading]: any = useState(false);
  const [tradeCoinData, setTradeCoinData] = useAtom(selectedCoinList);

  const [quantityState, setQuantityState]: any = useState({});
  const focusRefetchContant = async () => {
    const quantityData: any = await AsyncStorage.getItem("quantity");
    setQuantityState(JSON.parse(quantityData));
  };

  // message modalizer ----------------------------
  const [errorFlag, setErrorFlag]: any = useState(false);
  const [modalizeMessage, setModalizeMessage]: any = useState("");
  const [insufficientFlag, setInsufficientFlag]: any = useState(false);
  const messageModalize = useRef<Modalize>(null);
  // ----------------------------------------------

  // socket manage case -------------------------
  // useEffect(() => {
  //   subscribeToAllData((data: any) => {
  //     setLoading(false);
  //     setTradeCoin(data);
  //   });
  // }, []);

  const refetchDetailsAndData = () => {
    setLoading(true);
    axios
      .get(`${nodeURL}/api/tradeCoin?coinType=${route.params?.coinType}`)
      .then((res: any) => {
        setLoading(false);
        setTradeCoin(res.data?.response);
      })
      .catch((err: any) => setLoading(false));
    // getAllData();
    focusRefetchContant();
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      refetchDetailsAndData();
    });
  }, [navigation]);
  // ------------------------------------------------

  return (
    <View
      style={[styles.screen, { paddingBottom: useSafeAreaInsets().bottom }]}
    >
      <FullScreenLoader loading={loading} />
      <ScriptHeader
        refreshController={refetchDetailsAndData}
        navigation={navigation}
        title={route.params?.coinType}
      />

      <View style={styles.searchBox}>
        <View style={styles.searchChildBox}>
          <Ionicons name="search" size={24} color={theme.colors.greyText} />
          <TextInput
            placeholder="Search & Add"
            style={{
              ...styles.searchText,
              paddingLeft: 10,
              maxWidth: width * 0.6,
            }}
            autoCorrect={false}
            autoCapitalize="none"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <Text style={styles.searchText}>
          {tradeCoinData.length || 0}/{tradeCoin?.length || 0}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={tradeCoin}
        keyExtractor={(item) => item?.InstrumentIdentifier}
        renderItem={({ item, index }) => (
          <ScriptCard
            setTradeCoinSelected={setTradeCoinSelected}
            tradeCoinData={tradeCoinData}
            item={item}
            index={index}
            modalizeRef={modalizeRef}
            addCoinApi={addCoinApi}
            deleteCoinApi={deleteCoinApi}
            setTradeCoinData={setTradeCoinData}
            scriptType={route.params?.coinType}
          />
        )}
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
});

export default AddScriptsScreen;
