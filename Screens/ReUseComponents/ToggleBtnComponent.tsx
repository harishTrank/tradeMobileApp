import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import theme from "../../utils/theme";

const ToggleBtnComponent = ({ value, onToggle }: any) => {
  return (
    <ToggleSwitch
      isOn={value}
      onColor={theme.colors.primary}
      offColor={theme.colors.secondary}
      labelStyle={{ color: "black", fontWeight: "900" }}
      size="medium"
      onToggle={onToggle}
    />
  );
};

export default ToggleBtnComponent;
