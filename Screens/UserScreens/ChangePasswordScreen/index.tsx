import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import theme from "../../../utils/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import CustomButton from "../../ReUseComponents/CustomButton";
import { useChangePassword } from "../../../hooks/Auth/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(6, "New Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("newPassword")],
      "New password and confirm password must match"
    )
    .min(6, "Confirm Password must be at least 6 characters"),
  currentPassword: Yup.string()
    .required("Current Password is required")
    .min(6, "Current Password must be at least 6 characters"),
});

const ChangePasswordScreen = ({ navigation, route }: any) => {
  const changePasswordAPICALL: any = useChangePassword();
  const [loader, setLoader]: any = useState(false);
  const handleSubmit = (values: any) => {
    setLoader(true);
    changePasswordAPICALL
      ?.mutateAsync({
        body: {
          current_password: values.currentPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
          user_id: route?.params?.user_id ? route?.params?.user_id : "",
        },
      })
      ?.then((res: any) => {
        setLoader(false);
        if (route?.params?.tab) {
          navigation.navigate(route?.params?.tab);
        } else {
          navigation.goBack();
        }
        return Toast.show({
          type: "success",
          text1: "Password updated successfully.",
        });
      })
      ?.catch((err: any) => {
        setLoader(false);
        return Toast.show({
          type: "error",
          text1: "Something went wrong, Try Again.",
        });
      });
  };

  const [eyePassword, setEyePassword]: any = useState({
    newPasswordEye: true,
    confirmPasswordEye: true,
    currentPasswordEye: true,
  });

  const manageEyeHandler = (value: any) => {
    setEyePassword((oldValue: any) => {
      return { ...oldValue, ...value };
    });
  };

  return (
    <View style={styles.screen}>
      <FullScreenLoader loading={loader} />
      <BasicHeader navigation={navigation} title={"Change Password"} />
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
          currentPassword: "",
        }}
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
            <TextInput
              label="New Password"
              value={values.newPassword}
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              placeholder="Please Enter New Password"
              mode="outlined"
              style={{ marginBottom: 5 }}
              theme={{ roundness: 10 }}
              secureTextEntry={eyePassword.newPasswordEye}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  onPress={() =>
                    manageEyeHandler({
                      newPasswordEye: !eyePassword.newPasswordEye,
                    })
                  }
                  icon={eyePassword.newPasswordEye ? "eye-off" : "eye"}
                />
              }
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={{ color: "red" }}>{errors.newPassword}</Text>
            )}

            <TextInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="Please Enter Confirm Password"
              mode="outlined"
              style={{ marginBottom: 5 }}
              theme={{ roundness: 10 }}
              secureTextEntry={eyePassword.confirmPasswordEye}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  onPress={() =>
                    manageEyeHandler({
                      confirmPasswordEye: !eyePassword.confirmPasswordEye,
                    })
                  }
                  icon={eyePassword.confirmPasswordEye ? "eye-off" : "eye"}
                />
              }
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}

            <TextInput
              label="Current Password"
              value={values.currentPassword}
              onChangeText={handleChange("currentPassword")}
              onBlur={handleBlur("currentPassword")}
              placeholder="Please Enter Current Password"
              mode="outlined"
              style={{ marginBottom: 5 }}
              secureTextEntry={eyePassword.currentPasswordEye}
              theme={{ roundness: 10 }}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  onPress={() =>
                    manageEyeHandler({
                      currentPasswordEye: !eyePassword.currentPasswordEye,
                    })
                  }
                  icon={eyePassword.currentPasswordEye ? "eye-off" : "eye"}
                />
              }
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text style={{ color: "red" }}>{errors.currentPassword}</Text>
            )}

            <CustomButton
              title="Change Password"
              onPress={handleSubmit}
              extraStyle={{ marginVertical: 30 }}
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
