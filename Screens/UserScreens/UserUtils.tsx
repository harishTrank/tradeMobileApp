import * as Location from "expo-location";
import { Alert, Share } from "react-native";

export const findLatAndLong = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  // Get the user's current location
  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export const dropDownData = [
  { name: "This Week" },
  { name: "23-10-2023 to 29-10-2023" },
  { name: "Previous Week" },
  { name: "16-10-2023 to 22-10-2023" },
  { name: "Custom period" },
];

export const dropDownData2 = {
  exchange: [{ name: "MCX" }, { name: "NFO" }],
  selectScript: [
    { name: "ABB Nov 30" },
    { name: "AARTIIND Nov 30" },
    { name: "ABCAPITAL Nov 30" },
    { name: "ACC Nov 30" },
    { name: "ADDAA Nov 30" },
  ],
  timing: [
    { name: "minute" },
    { name: "3 minute" },
    { name: "5 minute" },
    { name: "10 minute" },
    { name: "15 minute" },
    { name: "30 minute" },
    { name: "60 minute" },
    { name: "day" },
  ],
};

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "React Native | A framework for building native apps using React",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

export const dateManager = (val: any) => {
  return `${val?.split("_")?.[2]?.slice(0, 2)} ${val
    ?.split("_")?.[2]
    ?.slice(2, 5)} ${val?.split("_")?.[2]?.slice(7)}`;
};

export const miniList = [
  "ZINCMINI",
  "SILVERM",
  "NATGASMINI",
  "LEADMINI",
  "GOLDM",
  "COPPERM",
  "ALUMINIUM",
  "CRUDEOILM",
];
