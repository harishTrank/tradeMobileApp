import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";

const SearchUserScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Search User"} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
export default SearchUserScreen;
