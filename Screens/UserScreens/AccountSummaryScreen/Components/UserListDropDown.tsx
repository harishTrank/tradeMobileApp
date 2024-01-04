import React, { useEffect, useState } from "react";
import DropDownComponent from "../../../ReUseComponents/DropDownComponent";
import { StyleSheet, Dimensions } from "react-native";
import { getMasterChildApi } from "../../../../store/Services/User";

const UserListDropDown = ({ userDropDownVal, setUserDropDownVal }: any) => {
  const [userList, setUserList]: any = useState([]);
  useEffect(() => {
    getMasterChildApi().then((res: any) => {
      setUserList(
        res.data?.map((name: any) => {
          return { name };
        })
      );
    });
  }, []);
  return (
    <DropDownComponent
      data={userList}
      value={userDropDownVal}
      setValue={setUserDropDownVal}
      style={styles.dropDown}
      fieldKey={"name"}
      placeholder="Select User"
    />
  );
};

const styles = StyleSheet.create({
  dropDown: {},
});

export default UserListDropDown;
