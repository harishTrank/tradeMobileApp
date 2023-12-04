import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import theme from "../../utils/theme";

const FullScreenLoader = ({ loading }: any) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ActivityIndicator size={"large"} color={theme.colors.primary} />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
