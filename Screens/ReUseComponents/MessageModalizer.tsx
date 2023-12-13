import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import theme from "../../utils/theme";
import CustomButton from "./CustomButton";

const MessageModalizer = ({
  error,
  message,
  messageModalize,
  insufficientFlag,
}: any) => {
  useEffect(() => {
    if (!insufficientFlag) {
      setTimeout(() => messageModalize.current?.close(), 1500);
    }
  }, []);
  return (
    <View>
      <View style={styles.content}>
        {error ? (
          <>
            <MaterialIcons
              name="error-outline"
              size={100}
              color={theme.colors.danger}
            />
            <Text style={styles.heading}>Error</Text>
          </>
        ) : (
          <>
            <Feather name="check-circle" size={100} color="green" />
            <Text style={styles.heading}>Success</Text>
          </>
        )}

        <Text style={styles.message}>{message}</Text>
      </View>
      {insufficientFlag ? (
        <View style={styles.btnCombo}>
          <CustomButton
            onPress={() => messageModalize.current?.close()}
            title={"Close"}
            style={{ width: "48%" }}
          />
          <CustomButton title={"Add Funds"} style={{ width: "48%" }} />
        </View>
      ) : (
        <></>
        // <CustomButton
        //   onPress={closeHandler}
        //   title={"Close"}
        //   style={styles.closeBtnStyle}
        // />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    ...theme.font.fontSemiBold,
    fontSize: 17,
    paddingVertical: 5,
    color: theme.colors.secondary,
  },
  message: {
    ...theme.font.fontMedium,
    fontSize: 15,
    paddingBottom: 10,
    textAlign: "center",
  },
  closeBtnStyle: {
    marginHorizontal: 20,
  },
  btnCombo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default MessageModalizer;
