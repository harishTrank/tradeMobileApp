import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import CheckBoxComponent from "../../../ReUseComponents/CheckBoxComponent";
import SmallBtnComponent from "../../../ReUseComponents/SmallBtnComponent";
import AccounParentLimit from "./AccounParentLimit";
import { useUserAccountLimit } from "../../../../hooks/User/query";
import { useUserAccountLimitCreated } from "../../../../hooks/User/mutation";
import ToastMessage from "../../../ReUseComponents/ToastMessage";
const { height, width } = Dimensions.get("window");

const AccountLimitModal = ({ visible, setVisible, user_id }: any) => {
  const [limitCheck, setLimitCheck]: any = useState(false);
  const [parentLimit, setParentLimit]: any = useState(false);
  const [masterValue, setMasterValue]: any = useState("0");
  const [clientValue, setClientValue]: any = useState("0");
  const accountLimitApi: any = useUserAccountLimitCreated();
  const [toastMessageFlag, setToastMessageFlag]: any = useState(false);
  const [toastMessage, setToastMessage]: any = useState("");
  useEffect(() => {
    if (toastMessageFlag) {
      setTimeout(() => {
        setToastMessageFlag(false);
      }, 2000);
    }
  }, [toastMessageFlag]);

  const getAccountLimitApi: any = useUserAccountLimit({
    query: {
      user_id: user_id ? user_id : "",
    },
  });

  useEffect(() => {
    setMasterValue(`${getAccountLimitApi?.data?.master_limit}`);
    setClientValue(`${getAccountLimitApi?.data?.client_limit}`);
  }, [getAccountLimitApi?.data]);

  const saveBtnHandler = () => {
    accountLimitApi
      ?.mutateAsync({
        body: {
          master_limit: Number(masterValue),
          client_limit: Number(clientValue),
        },
        query: {
          id: user_id,
        },
      })
      .then(() => {
        getAccountLimitApi.refetch();
        setToastMessage("Account limit update successfully.");
        setToastMessageFlag(true);
      })
      .catch((err: any) => {
        setToastMessage("Max account limit reached.");
        setToastMessageFlag(true);
      });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <AccounParentLimit
        visible={parentLimit}
        setVisible={setParentLimit}
        getAccountLimitApi={getAccountLimitApi?.data}
      />
      {toastMessageFlag && <ToastMessage message={toastMessage} />}
      <TouchableOpacity
        style={styles.cloFieldHandler}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      />
      <View style={styles.opacityScreen}>
        <View style={styles.mainBox}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Account Limit</Text>
            <TouchableOpacity
              style={styles.crossBtn}
              onPress={() => setVisible(false)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxRow}>
            <Text style={styles.textLabel}>Limit:</Text>
            <View style={styles.checkBoxBox}>
              <CheckBoxComponent value={limitCheck} setValue={setLimitCheck} />
              <Text style={styles.defaultText}>On</Text>
            </View>
            <View style={styles.checkBoxBox}>
              <CheckBoxComponent
                value={!limitCheck}
                setValue={(value: any) => setLimitCheck(!value)}
              />
              <Text style={styles.defaultText}>Off</Text>
            </View>
          </View>

          <View style={styles.rowElement}>
            <Text style={styles.textLabel}>Masters:</Text>
            <TextInput
              keyboardType="numeric"
              value={masterValue}
              onChangeText={setMasterValue}
              style={styles.textInputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              editable={limitCheck}
            />
          </View>

          <View style={styles.normalBox}>
            <Text style={styles.normalText}>{`Occupied ${
              getAccountLimitApi?.data?.master_occupied
            } + created ${getAccountLimitApi?.data?.master_created} = ${
              getAccountLimitApi?.data?.master_created +
              getAccountLimitApi?.data?.master_occupied
            }    ${
              getAccountLimitApi?.data?.master_remaining
            } Remaining`}</Text>
          </View>

          <View style={styles.rowElement}>
            <Text style={styles.textLabel}>Clients:</Text>
            <TextInput
              keyboardType="numeric"
              value={clientValue}
              onChangeText={setClientValue}
              style={styles.textInputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              editable={limitCheck}
            />
          </View>

          <View style={styles.normalBox}>
            <Text style={styles.normalText}>{`Occupied ${
              getAccountLimitApi?.data?.client_occupied
            } + created ${getAccountLimitApi?.data?.client_created} = ${
              getAccountLimitApi?.data?.client_occupied +
              getAccountLimitApi?.data?.client_created
            }    ${
              getAccountLimitApi?.data?.client_remaining
            } Remaining`}</Text>
          </View>

          <View style={styles.fotterCompo}>
            <TouchableOpacity onPress={() => setParentLimit(true)}>
              <Text style={styles.parentText}>Parent Limit info</Text>
            </TouchableOpacity>

            <View style={styles.btnBox}>
              <SmallBtnComponent
                style={styles.buttonBtn}
                title={"Save"}
                onPress={saveBtnHandler}
                disabled={!limitCheck}
              />
              <SmallBtnComponent
                style={{
                  ...styles.buttonBtn,
                  ...{ marginLeft: 10 },
                }}
                title={"Cancel"}
                onPress={() => setVisible(false)}
                backgroundColor={theme.colors.lightGrey}
                textColor={theme.colors.secondary}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  opacityScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  cloFieldHandler: {
    height: height - 380,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
  },
  mainBox: {
    height: 380,
    width,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBlockColor: theme.colors.border,
  },
  headerText: {
    width: "85%",
    textAlign: "center",
    marginLeft: "6%",
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  crossBtn: {
    paddingHorizontal: 10,
  },
  checkboxRow: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLabel: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
  },
  defaultText: {
    ...theme.font.fontRegular,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  checkBoxBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowElement: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  textInputStyle: {
    borderWidth: 1,
    flexGrow: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.border,
    marginLeft: 10,
    ...theme.font.fontRegular,
    fontSize: 13,
    color: theme.colors.black,
  },
  normalBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.border,
    marginLeft: 10,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  normalText: {
    ...theme.font.fontRegular,
    fontSize: 13,
    color: theme.colors.black,
  },
  buttonBtn: {
    width: width * 0.215,
  },
  fotterCompo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 5,
  },
  btnBox: {
    flexDirection: "row",
  },
  parentText: {
    ...theme.font.fontSemiBold,
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
});

export default AccountLimitModal;
