import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../../utils/theme";

const SmallBtnComponent = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  style,
  disabled,
  fontStyle,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonBox, backgroundColor && { backgroundColor }, style]}
    >
      <Text
        style={[
          styles.btnText,
          textColor && { color: textColor },
          fontStyle && fontStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    ...theme.elevationHeavy,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.white,
    fontSize: 15,
  },
});

export default SmallBtnComponent;
