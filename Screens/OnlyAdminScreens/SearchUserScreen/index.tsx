import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../../utils/theme";
import { useSearchUserList } from "../../../hooks/User/query";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const RenderItem = ({ master }: any) => {
  const [showClient, setShowClient] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemStyle}>
        <TouchableOpacity onPress={() => setShowClient(!showClient)}>
          <AntDesign
            name={showClient ? "minuscircle" : "pluscircle"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.itemText}>
          {master?.master_user_details?.user_name}
        </Text>
      </View>
      {showClient && (
        <FlatList
          data={master?.clients || []}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyExtractor={(item: any) => `${item?.id}`}
          renderItem={({ item }: any) => {
            return (
              <Text
                style={[
                  styles.itemText,
                  { marginLeft: 40, color: theme.colors.primary },
                ]}
              >
                {item?.client_user_details?.user_name}
              </Text>
            );
          }}
          ListEmptyComponent={
            <View style={styles.clientScroll}>
              <Text style={styles.emptyText}>No record found!</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const SearchUserScreen = ({ navigation }: any) => {
  const [searchExchangeText, setSearchExchangeText]: any = useState("");
  const userListApi: any = useSearchUserList();

  const flatlistData: any = useMemo(() => {
    return userListApi.data?.data?.filter((filterItem: any) => {
      const userNameMatch =
        filterItem?.master_user_details?.user_name
          ?.toLowerCase()
          ?.includes(searchExchangeText?.toLowerCase()) ||
        filterItem?.clients?.some((someItem: any) =>
          someItem?.client_user_details?.user_name
            ?.toLowerCase()
            ?.includes(searchExchangeText?.toLowerCase())
        );

      return userNameMatch;
    });
  }, [searchExchangeText, userListApi.data?.data]);

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Search User"} />
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={20} color={theme.colors.black} />
        <TextInput
          value={searchExchangeText}
          onChangeText={setSearchExchangeText}
          placeholder="Seach User"
          placeholderTextColor={theme.colors.greyText}
          style={styles.searchTextBox}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {userListApi.data?.data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={flatlistData || []}
          keyExtractor={(item: any) => `${item?.id}`}
          renderItem={({ item }: any) => <RenderItem master={item} />}
          ListEmptyComponent={
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>No record found!</Text>
            </View>
          }
        />
      ) : (
        <FullScreenLoader loading={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    margin: 10,
  },
  searchTextBox: {
    ...theme.font.fontMedium,
    fontSize: 15,
    marginLeft: 10,
    width: width * 0.8,
  },
  emptyView: {
    height: height * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    ...theme.font.fontMedium,
    fontSize: 15,
    color: theme.colors.primary,
  },
  itemStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 10,
  },
  itemText: {
    ...theme.font.fontMedium,
    marginLeft: 10,
  },
  clientScroll: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SearchUserScreen;
