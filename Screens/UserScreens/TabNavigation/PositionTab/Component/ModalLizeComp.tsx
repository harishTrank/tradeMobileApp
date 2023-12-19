import React from "react";
import {
  View,
  SafeAreaView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../../utils/theme";

const { width, height } = Dimensions.get("window");

const ModalLizeComp = ({ visible, setVisible, setSquareOffScreen }: any) => {
  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <TouchableOpacity
          style={styles.cloFieldHandler}
          onPress={() => setVisible(false)}
        />
        <View
          style={[
            styles.opacityScreen,
            { paddingBottom: useSafeAreaInsets().bottom },
          ]}
        >
          <TouchableOpacity
            style={styles.btnBackGround}
            onPress={() => {
              setVisible(false);
              setSquareOffScreen(true);
            }}
          >
            <Text style={[styles.textStyle, { color: theme.colors.primary }]}>
              Square-Off All Position
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnBackGround}
            onPress={() => setVisible(false)}
          >
            <Text style={[styles.textStyle, { color: theme.colors.blue }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  opacityScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  btnBackGround: {
    width: width * 0.95,
    backgroundColor: theme.colors.white,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  cloFieldHandler: {
    height: height * 0.8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
  },
});

export default ModalLizeComp;
