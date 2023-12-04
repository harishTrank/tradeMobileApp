import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useAtom } from "jotai";
import { currentUserData } from "../../JotaiStore";

const { width }: any = Dimensions.get("window");

const FundsCardComponent = ({ title, text, textColor }: any) => {
  return (
    <View style={styles.cardStyle}>
      <Text
        style={{
          ...theme.font.fontRegular,
          fontSize: 12,
          color: theme.colors.black,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...theme.font.fontMedium,
          fontSize: 12,
          color: textColor,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const CustomTabFund = ({ navigation, title }: any) => {
  const [toggleCard, setToggleCard]: any = useState(false);
  const [userApiCall]: any = useAtom(currentUserData);
  // animations
  const amheight = useSharedValue(60);
  const rotate = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: amheight.value,
    };
  });

  const iconRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const handlePress = () => {
    if (amheight.value === 60 && !toggleCard) {
      rotate.value = withSpring(180);
      amheight.value = withSpring(90);
    } else {
      rotate.value = withSpring(0);
      amheight.value = withSpring(60);
    }
    setToggleCard(!toggleCard);
  };
  // ----------
  return (
    <>
      <View
        style={{
          paddingTop: useSafeAreaInsets().top,
          backgroundColor: theme.colors.primaryDark,
        }}
      />
      <StatusBar style="light" />
      <Animated.View style={[styles.mainContainer, animationStyle]}>
        <Text style={styles.textTitle}>{title}</Text>
        <Animated.View style={iconRotateStyle}>
          <TouchableOpacity onPress={handlePress}>
            <Entypo name="chevron-down" size={24} color={theme.colors.black} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {toggleCard && (
        <View style={styles.mainCardBox}>
          <Text style={styles.fundsText}>Funds</Text>

          <View style={styles.cardBox}>
            <FundsCardComponent
              title={"Credit"}
              text={userApiCall?.credit?.toFixed(2) || 0}
              textColor={"green"}
            />
            <FundsCardComponent
              title={"Balance"}
              text={userApiCall?.balance?.toFixed(2) || 0}
              textColor={"red"}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CustomTabFund;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.lightGrey,
    padding: 10,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRightColor: "#FFF",
    ...theme.elevationLight,
  },
  mainCardBox: {
    backgroundColor: theme.colors.lightGrey,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  fundsText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStyle: {
    width: width * 0.46,
    backgroundColor: theme.colors.white,
    marginVertical: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    ...theme.elevationLight,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
  },
  textTitle: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    fontSize: 18,
    width: width - 70,
  },
});
