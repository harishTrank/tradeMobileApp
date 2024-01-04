import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import theme from "../../utils/theme";

const { height } = Dimensions.get("window");

const DropDownComponent = ({
  data,
  value,
  setValue,
  placeholder,
  style,
  search,
  placeholderStyle,
  fieldKey,
  disable,
}: any) => {
  return (
    <Dropdown
      disable={disable}
      style={{ ...styles.mainDroper, ...style }}
      placeholderStyle={[styles.textStyle, placeholderStyle]}
      placeholder={placeholder}
      selectedTextStyle={styles.textStyle}
      search={search}
      searchPlaceholder="Search..."
      inputSearchStyle={styles.inputSearch}
      iconColor={"#000"}
      data={data}
      maxHeight={height * 0.3}
      labelField={fieldKey}
      valueField={fieldKey}
      value={value}
      renderItem={(item: any) => {
        return (
          <View style={styles.dropCardItem}>
            <Text style={styles.textStyle}>{item[fieldKey]}</Text>
          </View>
        );
      }}
      onChange={(item: any) => {
        setValue(item[fieldKey]);
      }}
    />
  );
};

const styles = StyleSheet.create({
  mainDroper: {
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    borderColor: theme.colors.lightGrey,
    marginVertical: 5,
    paddingVertical: 21,
  },
  textStyle: {
    fontSize: 16,
    ...theme.font.fontRegular,
    color: theme.colors.black,
  },
  inputSearch: {
    height: 40,
    ...theme.font.fontSemiBold,
    fontSize: 15,
    borderRadius: 5,
  },
  dropCardItem: {
    marginHorizontal: 10,
    paddingVertical: 5,
  },
});

export default DropDownComponent;
