import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const TotalBoxComponent = ({ dropDownOpen, setDropDownOpen }: any) => {
  return (
    <View style={styles.mainDropContainer}>
      <TouchableOpacity
        style={styles.totalBox}
        onPress={() => setDropDownOpen(!dropDownOpen)}
      >
        <View style={styles.totalBox2}>
          {dropDownOpen ? (
            <Entypo name="chevron-up" size={25} color={theme.colors.danger} />
          ) : (
            <Entypo name="chevron-down" size={25} color={theme.colors.danger} />
          )}
          <Text style={styles.headerText}>Total</Text>
        </View>
        <Text style={styles.headerText}>123</Text>
      </TouchableOpacity>

      {dropDownOpen && (
        <View style={styles.tableBox}>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>M2M P&L:</Text>
            <Text style={styles.basicText}>{345}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Realised P&L:</Text>
            <Text style={styles.basicText}>{44}</Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>Credit:</Text>
            <Text style={styles.basicText}>{41}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.basicText}>Equity:</Text>
            <Text style={styles.basicText}>{12}</Text>
          </View>
          <View
            style={[styles.row, { backgroundColor: theme.colors.lightGrey }]}
          >
            <Text style={styles.basicText}>Margin Used:</Text>
            <Text style={styles.basicText}>{122}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.basicText}>Free margin:</Text>
            <Text style={styles.basicText}>{12}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const UserPositionScreen = () => {
  const [dropDownOpen, setDropDownOpen]: any = useState(false);
  const [searchText, setSearchText]: any = useState("");

  return (
    <View style={styles.screen}>
      <TotalBoxComponent
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
      />
      <View style={styles.mainBoxSearch}>
        <TextInput
          placeholder="Search"
          style={styles.searchText}
          onChangeText={setSearchText}
          value={searchText}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TouchableOpacity>
          <MaterialIcons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainDropContainer: {
    backgroundColor: theme.colors.white,
    margin: 10,
    borderRadius: 10,
    ...theme.elevationHeavy,
  },
  totalBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  totalBox2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: 15,
    color: theme.colors.danger,
  },
  tableBox: {},
  row: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
  },
  mainBoxSearch: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBlockColor: theme.colors.border,
  },
  searchText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    width: width * 0.83,
  },
});
export default UserPositionScreen;
