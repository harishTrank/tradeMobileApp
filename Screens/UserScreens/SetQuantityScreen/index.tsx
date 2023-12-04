import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetQuantityScreen = ({ navigation }: any) => {
  const [quantityState, setQuantityState]: any = useState({});

  const refetchCurrentQuantity = async () => {
    const quantityData: any = await AsyncStorage.getItem("quantity");
    setQuantityState(JSON.parse(quantityData));
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      refetchCurrentQuantity();
    });
  }, [navigation]);

  const onChangeHandler = (text: any, type: any) => {
    setQuantityState((oldValue: any) => {
      return { ...oldValue, ...{ [type]: text } };
    });
  };

  const onUpdateQuantity = async () => {
    await AsyncStorage.setItem("quantity", JSON.stringify(quantityState));
  };

  const onResetQuantity = async () => {
    const quantity = {
      a: 5,
      b: 10,
      c: 50,
      d: 100,
      e: 250,
      f: 500,
      g: 1000,
      h: 2500,
    };
    await AsyncStorage.setItem("quantity", JSON.stringify(quantity));
    refetchCurrentQuantity();
  };
  return (
    <ScrollView style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Set Qunatity Values"} />
      <View style={styles.parentBox}>
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((key: any) => {
          return (
            <View style={styles.childBox} key={key}>
              <TextInput
                style={styles.text}
                value={`${quantityState[key] || ""}`}
                onChangeText={(text) => onChangeHandler(text, key)}
                keyboardType="numeric"
              />
            </View>
          );
        })}
      </View>
      <View style={styles.btnParentBox}>
        <SmallBtnComponent
          title={"Reset"}
          onPress={onResetQuantity}
          style={styles.btnStyle}
        />
        <SmallBtnComponent
          title={"Update"}
          onPress={onUpdateQuantity}
          backgroundColor={theme.colors.lightGrey}
          textColor={theme.colors.secondary}
          style={styles.btnStyle}
        />
      </View>
    </ScrollView>
  );
};

export default SetQuantityScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  parentBox: {
    margin: 10,
  },
  childBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 5,
    ...theme.elevationLight,
  },
  text: {
    ...theme.font.fontSemiBold,
    color: theme.colors.secondary,
    fontSize: 17,
  },
  btnParentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingBottom: 10,
  },
  btnStyle: {
    width: "48%",
  },
});
