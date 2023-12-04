import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import CustomButton from "../../../ReUseComponents/CustomButton";
import theme from "../../../../utils/theme";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicHeader from "../../../ReUseComponents/BasicHeader";

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]+$/, "Mobile Number must be a valid number")
    .min(10)
    .max(10),
});

const ForgotPasswordScreen = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <BasicHeader navigation={navigation} title={"Forgot Password"} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
          justifyContent: "space-around",
        }}
      >
        <Formik
          initialValues={{ mobileNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted with values", values);
          }}
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
                label="Mobile Number"
                value={values.mobileNumber}
                onChangeText={handleChange("mobileNumber")}
                onBlur={handleBlur("mobileNumber")}
                keyboardType="numeric"
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
              {touched.mobileNumber && errors.mobileNumber && (
                <Text style={{ color: "red" }}>{errors.mobileNumber}</Text>
              )}

              <CustomButton
                title="Submit"
                onPress={handleSubmit}
                extraStyle={{ marginVertical: 30 }}
                style={{ marginTop: 10 }}
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </View>
  );
};

export default ForgotPasswordScreen;
