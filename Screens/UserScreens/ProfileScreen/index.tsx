import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import CustomButton from "../../ReUseComponents/CustomButton";
import { useUserProfileView } from "../../../hooks/User/query";

const ProfileScreen = ({ navigation }: any) => {
  const userApiCall: any = useUserProfileView({});
  // useEffect(() => {
  //   return navigation.addListener("focus", () => {
  //     userApiCall.refetch();
  //   });
  // }, [navigation]);

  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Profile Screen"} />
      <View style={styles.mainBox}>
        <View style={styles.tableRow}>
          <Text style={styles.text}>User Name :</Text>
          <Text style={styles.text}>
            {userApiCall?.data?.data?.user_name || ""}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Display Name :</Text>
          <Text style={styles.text}>
            {userApiCall?.data?.data?.full_name || ""}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>Phone Name :</Text>
          <Text style={styles.text}>
            {userApiCall?.data?.data?.phone_number || ""}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.text}>User Type :</Text>
          <Text style={styles.text}>
            {userApiCall?.data?.data?.user_type || ""}
          </Text>
        </View>
      </View>

      <CustomButton
        title="Delete Account"
        onPress={() => {}}
        extraStyle={{ marginVertical: 30 }}
        style={styles.buttonStyle}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    padding: 10,
  },
  tableRow: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.elevationLight,
  },
  text: {
    ...theme.font.fontMedium,
  },
  buttonStyle: {
    margin: 10,
  },
});
