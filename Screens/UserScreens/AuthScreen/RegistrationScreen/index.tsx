import React from "react";
import {
  Image,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ImageModule from "../../../../ImageModule";
import theme from "../../../../utils/theme";
import CustomButton from "../../../ReUseComponents/CustomButton";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]+$/, "Mobile Number must be a valid number"),
  name: Yup.string().required("Name is required"),
  city: Yup.string().required("City is required"),
});

const { height }: any = Dimensions.get("window");

const RegistrationScreen = ({ navigation }: any) => {
  const handleSubmit = (values: any) => {
    console.log("Form submitted with values", values);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Image source={ImageModule.appIconCrop} style={styles.headImage} />

      <Formik
        initialValues={{ mobileNumber: "", name: "", city: "" }}
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
            <Text style={styles.heading}>Register</Text>

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

            <TextInput
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder="Please Enter name"
              mode="outlined"
              style={{ marginBottom: 5 }}
              theme={{ roundness: 10 }}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  icon="account-outline"
                />
              }
            />
            {touched.name && errors.name && (
              <Text style={{ color: "red" }}>{errors.name}</Text>
            )}

            <TextInput
              label="City"
              value={values.city}
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              placeholder="Please Enter City"
              mode="outlined"
              style={{ marginBottom: 5 }}
              theme={{ roundness: 10 }}
              right={
                <TextInput.Icon
                  color={theme.colors.secondary}
                  icon="home-city-outline"
                />
              }
            />
            {touched.city && errors.city && (
              <Text style={{ color: "red" }}>{errors.city}</Text>
            )}

            <CustomButton
              title="Register"
              onPress={handleSubmit}
              extraStyle={{ marginVertical: 30 }}
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>

      <Text style={styles.finalText}>
        Already a member?{" "}
        <Text
          style={{ ...styles.finalText, ...{ color: theme.colors.secondary } }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

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
    marginTop: height * 0.025,
  },
  heading: {
    ...theme.font.fontBold,
    color: theme.colors.secondary,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  finalText: {
    textAlign: "center",
    marginVertical: 20,
    ...theme.font.fontRegular,
  },
});
