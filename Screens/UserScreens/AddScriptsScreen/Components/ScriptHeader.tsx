import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import theme from "../../../../utils/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const { width }: any = Dimensions.get("window");

const ScriptHeader = ({ navigation, title, refreshController }: any) => {
  return (
    <>
      <View
        style={{
          paddingTop: useSafeAreaInsets().top,
          backgroundColor: theme.colors.primaryDark,
        }}
      />
      <StatusBar style="light" />
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>{title}</Text>
        <TouchableOpacity onPress={refreshController}>
          <MaterialCommunityIcons name="reload" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ScriptHeader;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRightColor: "#FFF",
    ...theme.elevationLight,
  },
  mainCardBox: {
    backgroundColor: theme.colors.lightGrey,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  fundsText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStyle: {
    width: width * 0.46,
    backgroundColor: theme.colors.white,
    marginVertical: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    ...theme.elevationLight,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
  },
  textTitle: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 18,
    width: width - 100,
  },
});
