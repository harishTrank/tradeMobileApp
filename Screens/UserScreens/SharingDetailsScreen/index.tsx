import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { AntDesign } from "@expo/vector-icons";

const TableHeader = ({ title }: any) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableElement}>
        <Text style={styles.defaultText}>{`${title}   `}</Text>
        <AntDesign name="arrowup" size={18} color="black" />
      </View>
      <View style={styles.tableElement}>
        <Text style={styles.defaultText}>%</Text>
      </View>
    </View>
  );
};

const TableItem = ({ field, value }: any) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableElement}>
        <Text style={styles.defaultText}>{field}</Text>
      </View>
      <View style={styles.tableElement}>
        <Text style={styles.defaultText}>{value}</Text>
      </View>
    </View>
  );
};

const SharingDetailsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title={"Sharing Details"} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TableHeader title="BKSharing" />
          <TableItem field={"Admin"} value={"100%"} />
          <TableItem field={"Master(DEMOKK)"} value={"0%"} />
          <TableItem field={"Master(MASTER1)"} value={"0%"} />

          <View style={styles.extraSpace} />
          <TableHeader title="PLSharing" />
          <TableItem field={"Admin"} value={"100%"} />
          <TableItem field={"Master(DEMOKK)"} value={"0%"} />
          <TableItem field={"Master(MASTER1)"} value={"0%"} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainContainer: {
    margin: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableElement: {
    width: "50%",
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  extraSpace: {
    height: 20,
  },
  defaultText: {
    ...theme.font.fontRegular,
  },
});

export default SharingDetailsScreen;
