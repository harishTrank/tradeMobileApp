import theme from "../../../utils/theme";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import QuotesTab from "./QuotesTab";
import TradeTab from "./TradeTab";
import PositionTab from "./PositionTab";
import ProfileTab from "./ProfileTab";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="QuotesTabScreen"
      activeColor={theme.colors.blue}
      inactiveColor={theme.colors.secondary}
      barStyle={{
        backgroundColor: theme.colors.lightGrey,
      }}
      sceneAnimationType="shifting"
      sceneAnimationEnabled={true}
    >
      <Tab.Screen
        name="QuotesTabScreen"
        component={QuotesTab}
        options={{
          tabBarLabel: "Quotes",
          tabBarIcon: ({ focused }: any) => (
            <Feather
              name="bookmark"
              size={24}
              color={focused ? theme.colors.blue : theme.colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TradeTabScreen"
        component={TradeTab}
        options={{
          tabBarLabel: "Trade",
          tabBarIcon: ({ focused }: any) => (
            <AntDesign
              name="book"
              size={24}
              color={focused ? theme.colors.blue : theme.colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PositionTabScreen"
        component={PositionTab}
        options={{
          tabBarLabel: "Position",
          tabBarIcon: ({ focused }: any) => (
            <Ionicons
              name="md-briefcase-outline"
              size={24}
              color={focused ? theme.colors.blue : theme.colors.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTabScreen"
        component={ProfileTab}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }: any) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={focused ? theme.colors.blue : theme.colors.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
