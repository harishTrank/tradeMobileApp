import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../utils/theme";

const CustomButton = ({ onPress, title, style, textColor }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.buttonBox, ...style }}
    >
      <Text style={[styles.text, textColor && { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    ...theme.elevationHeavy,
  },
  text: {
    ...theme.font.fontSemiBold,
    color: theme.colors.white,
    fontSize: 16,
  },
});

export default CustomButton;
