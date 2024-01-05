import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import DropDownComponent from "../../ReUseComponents/DropDownComponent";
import { useAtom } from "jotai";
import { currentUserData } from "../../../JotaiStore";
import CustomButton from "../../ReUseComponents/CustomButton";
import CheckBoxComponent from "../../ReUseComponents/CheckBoxComponent";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";

const RenderItem = ({ item, navigation }: any) => {
  const [checkBox, setCheckBox]: any = useState(true);
  return (
    <View style={styles.itemBox}>
      <View style={styles.checkBoxTextBox}>
        <CheckBoxComponent value={checkBox} setValue={setCheckBox} />
        <Text style={styles.itemText}>INDEX 10 lot</Text>
      </View>
      <SmallBtnComponent
        style={styles.viewBtnStyle}
        textColor={theme.colors.black}
        fontStyle={theme.font.fontRegular}
        title="View"
        onPress={() => navigation.navigate("ViewGroupQuantityScreen")}
      />
    </View>
  );
};
const GroupQuantityScreen = ({ navigation, route }: any) => {
  const [exchangeValue, setExchangeValue]: any = useState("");

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Group Quantity Settings"} />
      <FlatList
        data={[1, 2]}
        ListHeaderComponent={
          <DropDownComponent
            data={route?.params?.exchange?.map((item: any) => {
              return { name: item.toUpperCase() };
            })}
            value={exchangeValue}
            setValue={setExchangeValue}
            placeholder={"Exchange"}
            style={styles.dropDownMargin}
            search={false}
            fieldKey={"name"}
          />
        }
        renderItem={({ item }: any) => (
          <RenderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item: any) => item}
        ListFooterComponent={
          <CustomButton
            title="Update"
            onPress={() => {}}
            extraStyle={{ marginVertical: 30 }}
            style={styles.updateView}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  dropDownMargin: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  updateView: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  checkBoxTextBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    ...theme.font.fontSemiBold,
    marginLeft: 10,
    color: theme.colors.black,
  },
  viewBtnStyle: {
    backgroundColor: theme.colors.lightGrey,
    width: 100,
  },
});

export default GroupQuantityScreen;
