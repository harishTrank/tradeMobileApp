import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import theme from "../../../../utils/theme";
import { Entypo } from "@expo/vector-icons";
import DropDownComponent from "../../../ReUseComponents/DropDownComponent";
import SmallBtnComponent from "../../../ReUseComponents/SmallBtnComponent";

const { width } = Dimensions.get("window");

const filterKey = {
  first: [{ name: "OWN" }, { name: "ALL" }],
  second: [{ name: "ALL" }, { name: "MASTER" }],
  third: [{ name: "All" }, { name: "Active" }, { name: "InActive" }],
};

const UserFilterModal = ({ userModalOpen, setUserModalOpen }: any) => {
  const [ownUser, setOwnUser]: any = useState("");
  const [selectUser, setSelectUser]: any = useState("");
  const [selectStatus, setSelectStatus]: any = useState("");
  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={userModalOpen}>
        <View style={styles.opacityScreen}>
          <View style={styles.card}>
            <View style={styles.secondBox}>
              <Text style={styles.headingDate}>Filter</Text>
              <TouchableOpacity onPress={() => setUserModalOpen(false)}>
                <Entypo name="cross" size={25} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.dropDownContainer}>
              <DropDownComponent
                data={filterKey.first}
                value={ownUser}
                setValue={setOwnUser}
                style={styles.dropDown}
                fieldKey={"name"}
                placeholder={"Own User"}
              />
              <DropDownComponent
                data={filterKey.second}
                value={selectUser}
                setValue={setSelectUser}
                style={styles.dropDown}
                fieldKey={"name"}
                placeholder={"Select User"}
              />
              <DropDownComponent
                data={filterKey.third}
                value={selectStatus}
                setValue={setSelectStatus}
                style={styles.dropDown}
                fieldKey={"name"}
                placeholder={"Select Status"}
              />
            </View>

            <View style={styles.buttonsBoxStyle}>
              <SmallBtnComponent
                title={"Reset"}
                onPress={() => {}}
                style={{ marginLeft: 10 }}
              />
              <SmallBtnComponent
                title={"Search"}
                onPress={() => {}}
                backgroundColor={theme.colors.lightGrey}
                textColor={theme.colors.secondary}
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainBox: {
    backgroundColor: theme.colors.lightGrey,
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBlockColor: theme.colors.greyText,
  },
  headingText: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  opacityScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "95%",
  },
  secondBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 5,
  },
  headingDate: {
    ...theme.font.fontMedium,
    color: theme.colors.greyText,
    width: width - 80,
    textAlign: "center",
    fontSize: 18,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  datePersonalBox: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    width: width * 0.42,
    marginTop: 20,
  },
  dateText: {
    ...theme.font.fontRegular,
    color: theme.colors.greyText,
    marginLeft: 15,
    fontSize: 15,
  },
  errorText: {
    ...theme.font.fontRegular,
    color: "red",
    textAlign: "center",
  },
  btnParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownStyle: {
    width: width * 0.42,
    borderColor: theme.colors.lightGrey,
    marginVertical: 15,
  },
  dropDown: {
    width: width * 0.8,
    borderColor: theme.colors.lightGrey,
  },
  dropDownContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  buttonsBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    width: width * 0.85,
  },
});

export default UserFilterModal;
