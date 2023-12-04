import React from "react";
import { View, StyleSheet, Dimensions, TextInput } from "react-native";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SearchComponent = ({ searchText, setSearchText }: any) => {
  return (
    <View style={styles.searchChildBox}>
      <Ionicons name="search" size={20} color={theme.colors.greyText} />
      <TextInput
        placeholder="Search & Add"
        style={{
          ...styles.searchText,
          paddingLeft: 10,
          width: width * 0.7,
        }}
        onChangeText={setSearchText}
        value={searchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchChildBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
});
export default SearchComponent;
