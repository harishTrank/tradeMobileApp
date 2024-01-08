import React, { useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import ToggleBtnComponent from "../../../ReUseComponents/ToggleBtnComponent";
import CustomButton from "../../../ReUseComponents/CustomButton";
import { useGetMarketTrade } from "../../../../hooks/User/query";
import { useUpdateMarketTrade } from "../../../../hooks/User/mutation";
import Toast from "react-native-toast-message";

const { height, width } = Dimensions.get("window");

const MarketTradeModal = ({ visible, setVisible, user_id }: any) => {
  const [downUserToggle, setDownUserToggle]: any = useState(false);
  const getAPiReponse: any = useGetMarketTrade({
    query: {
      user_id,
    },
  });

  useEffect(() => {
    setDownUserToggle(getAPiReponse?.data?.data?.trade_right);
  }, [getAPiReponse?.data]);

  const saveApiCall: any = useUpdateMarketTrade();
  const saveBtnHandler = () => {
    saveApiCall
      ?.mutateAsync({
        body: {
          trade_right: downUserToggle,
        },
        query: {
          id: user_id,
        },
      })
      .then((res: any) => {
        console.log("res", res);
        setVisible(false);
        return Toast.show({
          type: "success",
          text1: res.message,
        });
      });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.cloFieldHandler}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      />
      <View style={styles.opacityScreen}>
        <View style={styles.mainBox}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Market Trade Rights</Text>
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={() => setVisible(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.lastCheckContainer}>
            <Text style={styles.rightText}>Market trade for admin</Text>
            <ToggleBtnComponent
              value={downUserToggle}
              onToggle={setDownUserToggle}
            />
          </View>

          <View style={styles.btnContainer}>
            <CustomButton
              title="Save"
              onPress={saveBtnHandler}
              extraStyle={{ marginVertical: 30 }}
              style={styles.saveBtn}
            />
            <CustomButton
              title="Cancel"
              onPress={() => setVisible(false)}
              extraStyle={{ marginVertical: 30 }}
              style={styles.cancelBtn}
              textColor={theme.colors.primary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  opacityScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 100,
  },
  cloFieldHandler: {
    height: height - 220,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
  },
  mainBox: {
    height: 220,
    width,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBlockColor: theme.colors.border,
  },
  headerText: {
    width: "85%",
    textAlign: "center",
    marginLeft: "6%",
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  crossBtn: {
    paddingHorizontal: 10,
  },
  lastCheckContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  rightText: {
    ...theme.font.fontSemiBold,
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  saveBtn: {
    marginTop: 10,
    flexGrow: 1,
    marginRight: 5,
    borderRadius: 10,
  },
  cancelBtn: {
    marginTop: 10,
    flexGrow: 1,
    marginLeft: 5,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.primary,
  },
});
export default MarketTradeModal;
