import React, { useState } from "react";
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
import CheckBoxComponent from "../../../ReUseComponents/CheckBoxComponent";
import ToggleBtnComponent from "../../../ReUseComponents/ToggleBtnComponent";
import CustomButton from "../../../ReUseComponents/CustomButton";

const { height, width } = Dimensions.get("window");

const AdminRightModal = ({ visible, setVisible }: any) => {
  const [checkBoxData, setCheckBoxData]: any = useState({
    add_order: false,
    delete_trade: false,
    execute_pending_trade: false,
  });
  const [downUserToggle, setDownUserToggle]: any = useState(false);
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
            <Text style={styles.headerText}>Admin Rights</Text>
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={() => setVisible(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxRow}>
              <CheckBoxComponent
                value={checkBoxData.add_order}
                setValue={(value: any) =>
                  setCheckBoxData((oldValue: any) => {
                    return { ...oldValue, add_order: value };
                  })
                }
              />
              <Text style={styles.defaultLabel}>Add Order</Text>
            </View>

            <View style={styles.checkBoxRow}>
              <CheckBoxComponent
                value={checkBoxData.delete_trade}
                setValue={(value: any) =>
                  setCheckBoxData((oldValue: any) => {
                    return { ...oldValue, delete_trade: value };
                  })
                }
              />
              <Text style={styles.defaultLabel}>Delete Trade</Text>
            </View>

            <View style={styles.checkBoxRow}>
              <CheckBoxComponent
                value={checkBoxData.execute_pending_trade}
                setValue={(value: any) =>
                  setCheckBoxData((oldValue: any) => {
                    return { ...oldValue, execute_pending_trade: value };
                  })
                }
              />
              <Text style={styles.defaultLabel}>Execute pending Trade</Text>
            </View>
          </View>

          <View style={styles.lastCheckContainer}>
            <ToggleBtnComponent
              value={downUserToggle}
              onToggle={setDownUserToggle}
            />
            <Text style={styles.rightText}>Give rights to his down user?</Text>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton
              title="Save"
              onPress={() => {}}
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
    height: height - 300,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
  },
  mainBox: {
    height: 300,
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
  checkBoxContainer: {
    margin: 10,
  },
  checkBoxRow: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  defaultLabel: {
    marginLeft: 20,
    ...theme.font.fontRegular,
  },
  lastCheckContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
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
export default AdminRightModal;
