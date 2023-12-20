import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import theme from "../../../../../utils/theme";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const ExtraOptionRow = ({
  searchText,
  setSearchText,
  refreshHandler,
  setVisible,
  length,
}: any) => {
  const [searchOpen, isSearchOpen]: any = useState(false);
  const searchOpenHandler = () => isSearchOpen(true);
  const searchCloseHandler = () => {
    setSearchText("");
    isSearchOpen(false);
  };
  return (
    <>
      {searchOpen ? (
        <View style={styles.mainBoxSearch}>
          <TouchableOpacity onPress={searchCloseHandler}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.greyText}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchText}
            onChangeText={setSearchText}
            value={searchText}
            autoCorrect={false}
            autoFocus={true}
            autoCapitalize="none"
          />
        </View>
      ) : (
        <View style={styles.mainBox}>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={searchOpenHandler}
          >
            <AntDesign name="search1" size={20} color="black" />
            <Text style={styles.textStyle}>Search</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttonBox} onPress={refreshHandler}>
              <Ionicons name="refresh-outline" size={20} color="black" />
              <Text style={styles.textStyle}>Refresh</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonBox}
              onPress={() =>
                length > 0
                  ? setVisible(true)
                  : Toast.show({
                      type: "error",
                      text1: "Position doesn't exist.",
                    })
              }
            >
              <Entypo name="dots-three-vertical" size={18} color="black" />
              <Text style={styles.textStyle}>Square-Off</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    ...theme.font.fontMedium,
    fontSize: 12,
    marginLeft: 5,
  },
  mainBoxSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.greyText,
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    width: width * 0.83,
  },
});
export default ExtraOptionRow;
