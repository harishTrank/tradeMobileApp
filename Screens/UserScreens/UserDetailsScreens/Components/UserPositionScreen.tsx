import React from "react";
import PositionTab from "../../TabNavigation/PositionTab";

const UserPositionScreen = ({ navigation, route }: any) => {
  return (
    <PositionTab navigation={navigation} user_id={route?.params?.user_id} />
  );
};
export default UserPositionScreen;
