import React from "react";
import { StyleSheet, View } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";

const MessageScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Message"} />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
