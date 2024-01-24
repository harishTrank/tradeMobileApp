import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import theme from "../../../utils/theme";

const InputComponent = ({
  title,
  required,
  personalDetails,
  setPersonalDetails,
  currentKey,
  eye,
}: any) => {
  const textInputChangeHandler = (text: any) => {
    setPersonalDetails((oldValue: any) => {
      return {
        ...oldValue,
        [currentKey]:
          currentKey === "userName" ? text.replaceAll(" ", "") : text,
      };
    });
  };
  return (
    <View>
      <Text style={styles.title}>
        {title}{" "}
        {required && (
          <Text style={[styles.title, { color: theme.colors.danger }]}>*</Text>
        )}
      </Text>
      <TextInput
        style={styles.textInput}
        value={personalDetails[currentKey]}
        onChangeText={textInputChangeHandler}
        autoCorrect={false}
        secureTextEntry={eye}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...theme.font.fontSemiBold,
    marginTop: 8,
    color: theme.colors.secondary,
  },
  textInput: {
    borderWidth: 2,
    padding: 5,
    borderColor: theme.colors.primary,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
});
export default InputComponent;
