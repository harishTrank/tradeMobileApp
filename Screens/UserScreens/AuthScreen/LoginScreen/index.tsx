import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import ImageModule from "../../../../ImageModule";
import theme from "../../../../utils/theme";
import { TextInput } from "react-native-paper";
import CustomButton from "../../../ReUseComponents/CustomButton";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownComponent from "../../../ReUseComponents/DropDownComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useloginApiCall } from "../../../../hooks/Auth/mutation";
import { useAtom } from "jotai";
import { currentUserData, selectedCoinList } from "../../../../JotaiStore";
import FullScreenLoader from "../../../ReUseComponents/FullScreenLoader";
import * as Network from "expo-network";
import { userProfileView } from "../../../../store/Services/User";
import { connectSocket } from "../../../../utils/socket/SocketService";

const accountType = [{ name: "Demo" }, { name: "AREX" }];

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("User Name is required"),
  // .matches(/^[0-9]+$/, "Mobile Number must be a valid number")
  // .min(10)
  // .max(10)
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const { height }: any = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
  const [passwordEye, setPasswordEye]: any = useState(true);
  const [serverType, setServerType]: any = useState("Demo");
  const [, setTradeCoinData] = useAtom(selectedCoinList);
  const [, setCurrentUser]: any = useAtom(currentUserData);

  // const [currentLocation]: any = useAtom(locationGlobal);
  const [loader, setLoader]: any = useState(false);

  const loginApiHandler: any = useloginApiCall();

  const handleSubmit = async (values: any) => {
    // const currentMobileIP = await Network.getIpAddressAsync();
    setLoader(true);
    loginApiHandler
      ?.mutateAsync({
        body: {
          user_type: serverType,
          user_name: values?.userName,
          password: values?.password,
          // latitude: currentLocation?.latitude,
          // longitude: currentLocation?.longitude,
          // currentMobileIP,
        },
      })
      .then(async (response: any) => {
        if (response?.responsecode === 200) {
          await AsyncStorage.setItem("accessToken", response?.token?.access);

          userProfileView()
            .then((res: any) => {
              connectSocket();
              setTradeCoinData(res?.tradeCoinData);
              setCurrentUser(res?.data);
              setLoader(false);
              Toast.show({
                type: "success",
                text1: response?.responsemessage,
              });
              navigation.navigate("TabNavigation");
            })
            ?.catch((err: any) => console.log("err", err));
        } else {
          setLoader(false);
          return Toast.show({
            type: "error",
            text1: "Something went wrong.",
          });
        }
      })
      .catch((error: any) => {
        setLoader(false);
        return Toast.show({
          type: "error",
          text1: "Invalid user credentials.",
        });
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FullScreenLoader loading={loader} />
      <Image source={ImageModule.appIconCrop} style={styles.headImage} />

      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={styles.heading}>Login</Text>
            <DropDownComponent
              data={accountType}
              value={serverType}
              setValue={setServerType}
              search={false}
              style={styles.dropdownServer}
              fieldKey={"name"}
            />
            <TextInput
              label="User Name"
              value={values.userName}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              placeholder="Please Enter Mobile Number"
              mode="outlined"
              style={{ marginBottom: 5 }}
              theme={{ roundness: 10 }}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  icon="cellphone-check"
                />
              }
            />
            {touched.userName && errors.userName && (
              <Text style={{ color: "red" }}>{errors.userName}</Text>
            )}

            <TextInput
              label="Password"
              secureTextEntry={passwordEye}
              theme={{ roundness: 10 }}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              mode="outlined"
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  onPress={() => setPasswordEye(!passwordEye)}
                  icon={passwordEye ? "eye-off" : "eye"}
                />
              }
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            <CustomButton
              title="Login"
              onPress={handleSubmit}
              extraStyle={{ marginVertical: 30 }}
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>

      <View style={styles.marginBox}>
        {/* <View style={styles.bottomBox}>
          <Text
            style={styles.navigationText}
            onPress={() => navigation.navigate("RegistrationScreen")}
          >
            Register
          </Text>
          <Text
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            style={styles.navigationText}
          >
            Forgot Password
          </Text>
        </View> */}

        <Text style={styles.finalText}>
          This application is used for training purpose only.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headImage: {
    height: "20%",
    width: "40%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: height * 0.05,
  },
  heading: {
    ...theme.font.fontBold,
    color: theme.colors.secondary,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  marginBox: {
    marginHorizontal: 10,
  },
  bottomBox: {
    margin: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  finalText: {
    textAlign: "center",
    marginVertical: 20,
    ...theme.font.fontRegular,
  },
  navigationText: {
    ...theme.font.fontMedium,
    color: theme.colors.secondary,
  },
  dropdownServer: {
    borderColor: "grey",
    borderWidth: 1,
  },
});
