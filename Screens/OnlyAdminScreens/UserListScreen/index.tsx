import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import UserNameHeader from "../../ReUseComponents/UserNameHeader";
import SearchComponent from "../../ReUseComponents/SearchComponent";
import theme from "../../../utils/theme";
import UserFilterModal from "./Components/UserFilterModal";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useUserListView } from "../../../hooks/User/query";

const RenderItem = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>
          {item?.full_name}({item?.user_name})
        </Text>
        <Text style={styles.itemBalance}>Balance: {item?.balance}</Text>
        <Text style={styles.itemText}>Credit: {item?.credit}</Text>
      </View>

      <View style={styles.itemSmallBox}>
        <View style={styles.circularBack}>
          <Text style={styles.userType}>
            {item?.user_type?.[0]?.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.itemPercent}>0%</Text>
      </View>
    </View>
  );
};

const UserListScreen = ({ navigation }: any) => {
  const [searchText, setSearchText]: any = useState("");
  const [userModalOpen, setUserModalOpen]: any = useState(false);
  const [stateFilter, setStateFilter]: any = useState({
    own_user: "",
    select_user: "",
    select_status: "",
  });

  const [btnHitSearchFilter, setBtnHitSearchFilter]: any = useState({
    own_user: "",
    select_user: "",
    select_status: "",
  });

  const userListApiHandler: any = useUserListView({
    query: btnHitSearchFilter,
  });

  const submitHandler = () => {
    setBtnHitSearchFilter(stateFilter);
    userListApiHandler.refetch();
  };

  const restartHandler = () => {
    setStateFilter({
      own_user: "",
      select_user: "",
      select_status: "",
    });
    setBtnHitSearchFilter({
      own_user: "",
      select_user: "",
      select_status: "",
    });
    userListApiHandler.refetch();
  };
  return (
    <View style={styles.screen}>
      <UserNameHeader navigation={navigation} title={"User List"} />
      <View style={styles.searchBox}>
        <UserFilterModal
          userModalOpen={userModalOpen}
          setUserModalOpen={setUserModalOpen}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          restartHandler={restartHandler}
          submitHandler={submitHandler}
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
        showsVerticalScrollIndicator={false}
        data={userListApiHandler?.data?.results || []}
        keyExtractor={(item: any) => item.id}
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
  itemContainer: {
    backgroundColor: theme.colors.lightGrey,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
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
