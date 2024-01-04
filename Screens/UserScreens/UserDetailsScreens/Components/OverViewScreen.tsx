import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo, AntDesign } from "@expo/vector-icons";
import ToggleBtnComponent from "../../../ReUseComponents/ToggleBtnComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserProfileView } from "../../../../hooks/User/query";
import dayjs from "dayjs";

const OverViewScreen = ({ route, navigation }: any) => {
  const userDetailsApi: any = useUserProfileView({
    query: route?.params,
  });
  const [statusToggle, setStatusToggle]: any = useState(false);
  const [closeOnlyToggle, setCloseOnlyToggle]: any = useState();

  useEffect(() => {
    setStatusToggle(userDetailsApi?.data?.data?.status);
    setCloseOnlyToggle(userDetailsApi?.data?.data?.close_only);
  }, [userDetailsApi?.data?.data]);

  return (
    <ScrollView
      style={[styles.screen, { marginBottom: useSafeAreaInsets().bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.defaultBcg}>
        <View style={styles.userCard2}>
          <View style={styles.circularCard}>
            <Text style={styles.circualarText}>
              {userDetailsApi?.data?.data?.user_type?.[0]?.toUpperCase()}
            </Text>
          </View>

          <View>
            <Text style={styles.userNameText}>
              {userDetailsApi?.data?.data?.user_name || ""} (
              {userDetailsApi?.data?.data?.user_type || ""})
            </Text>
            <Text style={styles.balanceTxt}>
              Balance:{" "}
              <Text style={{ color: theme.colors.primary }}>{`${
                userDetailsApi?.data?.data?.balance || ""
              }   `}</Text>{" "}
              C:{" "}
              <Text style={{ color: "green" }}>
                {userDetailsApi?.data?.data?.credit || ""}
              </Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditUserScreen", route?.params)}
        >
          <Entypo name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>User Name</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.user_name || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Name</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.full_name || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Mobile Number</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.phone_number || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>City</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.city || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Remarks</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.remark || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Create Date</Text>
        <Text style={styles.defaultText}>
          {dayjs(userDetailsApi?.data?.data?.created_at).format(
            "DD MMM YYYY hh:mm:ss A"
          ) || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Last Login</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.last_login
            ? dayjs(userDetailsApi?.data?.data?.last_login).format(
                "DD MMM YYYY hh:mm:ss A"
              )
            : ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>IP Address</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.ip_address || ""}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Exchange</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.exchange?.join(",")?.toUpperCase()}
        </Text>
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Status</Text>
        <ToggleBtnComponent value={statusToggle} onToggle={setStatusToggle} />
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Close Only</Text>
        <ToggleBtnComponent
          value={closeOnlyToggle}
          onToggle={setCloseOnlyToggle}
        />
      </View>

      <View style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Credit</Text>
        <Text style={styles.defaultText}>
          {userDetailsApi?.data?.data?.credit || ""}
        </Text>
      </View>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Group Quantity Settings</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Brokerage Settings</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Trade margin</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Sharing Details</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Change Password</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Account Limit</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Admin Rights</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.defaultBcg}>
        <Text style={styles.defaultText}>Market trade right</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  defaultBcg: {
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  circularCard: {
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    marginHorizontal: 10,
  },
  circualarText: {
    ...theme.font.fontMedium,
    fontSize: 16,
    color: theme.colors.black,
  },
  userCard2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  userNameText: {
    fontSize: 16,
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  balanceTxt: {
    ...theme.font.fontSemiBold,
    fontSize: 12,
    color: theme.colors.black,
  },
  defaultText: {
    ...theme.font.fontSemiBold,
    fontSize: 13,
  },
});

export default OverViewScreen;
