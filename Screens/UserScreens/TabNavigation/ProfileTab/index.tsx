import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import theme from "../../../../utils/theme";
import CustomTabFund from "../../../ReUseComponents/CustomTabFund";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../ReUseComponents/CustomButton";
import { onShare } from "../../UserUtils";
import { boxData } from "./ProfileUtils";
import { useAtom } from "jotai";
import { currentUserData, userLoginGlobalFlag } from "../../../../JotaiStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width }: any = Dimensions.get("window");

const ProfileOptionCard = ({ icon, title, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardBox}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const ProfileTab = ({ navigation }: any) => {
  const [, setUserLogFlag]: any = useAtom(userLoginGlobalFlag);
  const [currentUserDetails]: any = useAtom(currentUserData);

  const logoutHander = async () => {
    await AsyncStorage.removeItem("accessToken");
    setUserLogFlag(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    <View style={styles.screen}>
      <CustomTabFund navigation={navigation} title={"Profile"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {currentUserDetails.user_type === "Master" && (
          <View style={[styles.cardHolder, { marginTop: 15 }]}>
            {boxData.adminBox.map((cardItem: any) => (
              <ProfileOptionCard
                key={cardItem.title}
                icon={cardItem.icon}
                title={cardItem.title}
                onPress={() => navigation.navigate(cardItem.screenName)}
              />
            ))}
          </View>
        )}

        <Text style={styles.heading}>Report</Text>
        <View style={styles.cardHolder}>
          {boxData.first.map((cardItem: any) => (
            <ProfileOptionCard
              key={cardItem.title}
              icon={cardItem.icon}
              title={cardItem.title}
              onPress={() => navigation.navigate(cardItem.screenName)}
            />
          ))}
        </View>

        <Text style={styles.heading}>Setting</Text>
        <View style={styles.cardHolder}>
          {boxData.second.map((cardItem: any) => (
            <ProfileOptionCard
              key={cardItem.title}
              icon={cardItem.icon}
              title={cardItem.title}
              onPress={() =>
                cardItem.title !== "Invite Friends"
                  ? navigation.navigate(cardItem.screenName)
                  : onShare()
              }
            />
          ))}
        </View>

        <CustomButton
          title="Logout"
          onPress={logoutHander}
          extraStyle={{ marginVertical: 30 }}
          style={{ margin: 10 }}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  heading: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 10,
  },
  cardHolder: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  cardBox: {
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 25,
    ...theme.elevationLight,
    width: width * 0.5 - 15,
    marginTop: 10,
  },
  title: {
    ...theme.font.fontSemiBold,
    color: theme.colors.secondary,
    paddingVertical: 5,
  },
});
