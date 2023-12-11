import React from "react";
import CheckBox from "@react-native-community/checkbox";
import theme from "../../utils/theme";

const CheckBoxComponent = ({ value, setValue, disabled }: any) => {
  return (
    <CheckBox
      disabled={disabled}
      value={value}
      boxType="circle"
      // onAnimationType="one-stroke"
      // offAnimationType="one-stroke"
      onFillColor={theme.colors.primaryDark}
      onTintColor={theme.colors.lightGrey}
      onCheckColor={theme.colors.white}
      onValueChange={setValue}
      animationDuration={0.5}
      style={{
        height: 25,
        width: 25,
      }}
    />
  );
};

export default CheckBoxComponent;
