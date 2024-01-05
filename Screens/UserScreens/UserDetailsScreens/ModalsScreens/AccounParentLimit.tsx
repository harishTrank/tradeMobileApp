import React from "react";
import {
  Modal,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const RowElement = ({ first, second, third }: any) => {
  return (
    <View style={styles.rowStyle}>
      <Text style={styles.defaultText}>{first}</Text>
      <Text style={styles.defaultText}>{second}</Text>
      <Text style={styles.defaultText}>{third}</Text>
    </View>
  );
};

const AccounParentLimit = ({
  visible,
  setVisible,
  getAccountLimitApi,
}: any) => {
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
            <Text style={styles.headerText}>
              Parent limit info - {getAccountLimitApi.user_name}
            </Text>
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={() => setVisible(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBox}>
            <RowElement first="Parend info" second="Master" third="Client" />
            <RowElement
              first="Limit"
              second={getAccountLimitApi?.master_limit}
              third={getAccountLimitApi?.client_limit}
            />
            <RowElement
              first="Occupied"
              second={getAccountLimitApi?.master_occupied}
              third={getAccountLimitApi?.client_occupied}
            />
            <RowElement
              first="Created"
              second={getAccountLimitApi?.master_created}
              third={getAccountLimitApi?.client_created}
            />
            <RowElement
              first="Remaining"
              second={getAccountLimitApi?.master_remaining}
              third={getAccountLimitApi?.client_remaining}
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
    height: height - 200,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
  },
  mainBox: {
    height: 200,
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
  rowBox: {
    margin: 10,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultText: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
    textAlign: "center",
    flex: 1,
  },
});
export default AccounParentLimit;
