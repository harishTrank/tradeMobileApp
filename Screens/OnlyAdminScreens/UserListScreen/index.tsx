import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import UserNameHeader from "../../ReUseComponents/UserNameHeader";
import SearchComponent from "../../ReUseComponents/SearchComponent";
import theme from "../../../utils/theme";
import UserFilterModal from "./Components/UserFilterModal";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const RenderItem = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>DEMO999(demo)</Text>
        <Text style={styles.itemBalance}>Balance: 0</Text>
        <Text style={styles.itemText}>Credit: 8000000</Text>
      </View>

      <View style={styles.itemSmallBox}>
        <View style={styles.circularBack}>
          <Text style={styles.userType}>M</Text>
        </View>
        <Text style={styles.itemPercent}>0%</Text>
      </View>
    </View>
  );
};

const UserListScreen = ({ navigation }: any) => {
  const [searchText, setSearchText]: any = useState("");
  const [userModalOpen, setUserModalOpen]: any = useState(false);
  return (
    <View style={styles.screen}>
      <UserNameHeader navigation={navigation} title={"User List"} />
      <View style={styles.searchBox}>
        <UserFilterModal
          userModalOpen={userModalOpen}
          setUserModalOpen={setUserModalOpen}
        />
        <SearchComponent
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <TouchableOpacity onPress={() => setUserModalOpen(true)}>
          <MaterialIcons
            name="settings-input-component"
            size={20}
            color={theme.colors.greyText}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[1, 2, 3, 4]}
        style={styles.flatlistStyle}
        keyExtractor={(item: any) => `${item}`}
        renderItem={RenderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  flatlistStyle: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: theme.colors.lightGrey,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    ...theme.elevationLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
  },
  itemBalance: {
    ...theme.font.fontMedium,
    fontSize: 15,
    paddingVertical: 3,
    color: "green",
  },
  circularBack: {
    height: 40,
    width: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    ...theme.elevationLight,
  },
  userType: {
    ...theme.font.fontSemiBold,
    fontSize: 20,
    color: "green",
  },
  itemSmallBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemPercent: {
    ...theme.font.fontSemiBold,
    color: "red",
  },
});

export default UserListScreen;
