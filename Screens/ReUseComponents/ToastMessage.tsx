import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ImageModule from "../../ImageModule";
import theme from "../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ToastMessage = ({ message }: any) => {
  return (
    <View
      style={[styles.messageBody, { bottom: useSafeAreaInsets().bottom + 30 }]}
    >
      <Image style={styles.imageStyle} source={ImageModule.appIcon} />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBody: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    ...theme.elevationHeavy,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    left: "20%",
  },
  imageStyle: {
    height: 20,
    width: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    marginRight: 10,
  },
  messageText: {
    ...theme.font.fontMedium,
    fontSize: 12,
    color: theme.colors.white,
  },
});

export default ToastMessage;
