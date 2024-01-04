import React from "react";
import { View } from "react-native";
import { TradeCustomTab } from "../../TabNavigation/TradeTab";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserTradeScreen = ({ navigation, viewModalizeRef, route }: any) => {
  return (
    <View style={{ marginBottom: useSafeAreaInsets().bottom, flex: 1 }}>
      <TradeCustomTab
        navigation={navigation}
        pendingTab={false}
        viewModalizeRef={viewModalizeRef}
        user_id={route.params.user_id}
      />
    </View>
  );
};

export default UserTradeScreen;
