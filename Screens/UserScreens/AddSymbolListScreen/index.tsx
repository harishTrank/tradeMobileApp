import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScriptHeader from "../AddScriptsScreen/Components/ScriptHeader";
import { Ionicons, Entypo } from "@expo/vector-icons";
import theme from "../../../utils/theme";
import axios from "axios";
import { nodeURL } from "../../../utils/socket/SocketService";
import { useAtom } from "jotai";
import { currentUserData, selectedCoinList } from "../../../JotaiStore";

const { width }: any = Dimensions.get("window");

const AddSymbolListScreen = ({ navigation }: any) => {
  const [searchText, setSearchText]: any = useState("");
  const [coinTypeListning, setCoinTypeListning]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [tradeCoinData] = useAtom(selectedCoinList);
  const [userProfileData] = useAtom(currentUserData);
  const screenFocusedCase = () => {
    axios
      .get(
        `${nodeURL}/api/tradeCoin/length?coinList=${JSON.stringify(
          userProfileData?.exchange
        )}`
      )
      .then((res: any) => {
        setLoading(false);
        setCoinTypeListning(res.data);
      })
      .catch((err: any) => setLoading(false));
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      screenFocusedCase();
    });
  }, [navigation]);
  return (
    <View
      style={[styles.screen, { paddingBottom: useSafeAreaInsets().bottom }]}
    >
      <FullScreenLoader loading={loading} />
      <ScriptHeader navigation={navigation} title={"Add Symbol"} />

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
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <Text style={styles.searchText}>
          {tradeCoinData.length}/{coinTypeListning?.allCount}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          coinTypeListning?.coins?.filter((itemFilter: any) =>
            itemFilter?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
          ) || []
        }
        keyExtractor={(item: any) => item?.name}
        renderItem={({ item }: any) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("AddScriptsScreen", {
                  coinType: item?.name,
                })
              }
            >
              <Text style={styles.itemText}>{item?.name}</Text>
              <View style={styles.itemCountBox}>
                <Text style={styles.itemText}>({item?.coinCount})</Text>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  itemText: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  itemCountBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddSymbolListScreen;
