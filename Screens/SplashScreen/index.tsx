import React, { useEffect } from "react";
import { SafeAreaView, Image } from "react-native";
import ImageModule from "../../ImageModule";
import { findLatAndLong } from "../UserScreens/UserUtils";
import { useAtom } from "jotai";
import { locationGlobal } from "../../JotaiStore";

const SplashScreen = ({ navigation }: any) => {
  const [, setLocation]: any = useAtom(locationGlobal);
  useEffect(() => {
    // accessToken();
    setTimeout(async () => {
      navigation?.replace("UserScreens");
      const locationArray = await findLatAndLong();
      setLocation(locationArray?.coords);
    }, 500);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Image
        source={ImageModule.appIconCrop}
        style={{
          height: 250,
          width: 250,
          resizeMode: "contain",
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
