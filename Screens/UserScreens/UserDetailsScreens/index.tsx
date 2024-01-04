import React, { useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../utils/theme";
import OverViewScreen from "./Components/OverViewScreen";
import UserTradeScreen from "./Components/UserTradeScreen";
import UserPositionScreen from "./Components/UserPositionScreen";
import UserListScreen from "./Components/UserListScreen";
import { Modalize } from "react-native-modalize";
import ViewModalize from "../TabNavigation/TradeTab/Component/ViewModalize";

const Tab = createMaterialTopTabNavigator();

const { height } = Dimensions.get("window");
const UserDetailsScreens = ({ navigation, route }: any) => {
  const viewModalizeRef = useRef<Modalize>(null);
  const UserTradeManager = (props: any) => {
    return <UserTradeScreen {...props} viewModalizeRef={viewModalizeRef} />;
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"User Details"} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.lightGrey,
          },
          tabBarLabelStyle: {
            ...theme.font.fontMedium,
            textTransform: "capitalize", // Set textTransform to lowercase
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.black,
        }}
      >
        <Tab.Screen
          name="Overview"
          component={OverViewScreen}
          initialParams={{ user_id: route.params?.user_id }}
        />
        <Tab.Screen
          name="Trade"
          component={UserTradeManager}
          initialParams={{ user_id: route.params?.user_id }}
        />
        <Tab.Screen
          name="Position"
          component={UserPositionScreen}
          initialParams={{ user_id: route.params?.user_id }}
        />
        <Tab.Screen
          name="Userlist"
          component={UserListScreen}
          initialParams={{ user_id: route.params?.user_id }}
        />
      </Tab.Navigator>
      <Modalize ref={viewModalizeRef} modalHeight={height * 0.5}>
        <ViewModalize />
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default UserDetailsScreens;
