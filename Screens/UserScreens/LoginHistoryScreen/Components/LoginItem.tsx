import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../../../utils/theme";
import dayjs from "dayjs";

const LoginItem = ({ item }: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstBox}>
        <Text style={styles.mainText}>
          {item?.user_history__user_name} (
          {item?.user_history__user_type?.toUpperCase()})
        </Text>
        <Text style={styles.mainText}>IP: {item?.ip_address}</Text>
      </View>
      <View style={styles.firstBox}>
        <Text style={styles.mainText}>
          {dayjs(item?.created_at).format("DD-MM-YYYY HH:mm:ss")}
        </Text>
        <Text
          style={[
            styles.mainText,
            { color: item?.action === "LOGIN" ? "green" : "red" },
          ]}
        >
          {item?.action}
        </Text>
      </View>
      <Text style={styles.secondaryText}>
        ID: {item?.user_history__id} [{item?.method?.toUpperCase()}]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    borderRadius: 10,
    ...theme.elevationLight,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  firstBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  secondaryText: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 13,
  },
});

export default LoginItem;
