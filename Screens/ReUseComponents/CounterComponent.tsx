import React from "react";
import theme from "../../utils/theme";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

const CounterComponent = ({ value, setValue }: any) => {
  return (
    <View style={styles.counterBox}>
      <TouchableOpacity
        onPress={() =>
          setValue((oldValue: any) => (oldValue === 1 ? 1 : oldValue - 1))
        }
        style={{ paddingHorizontal: 5 }}
      >
        <Text style={styles.counterText}>-</Text>
      </TouchableOpacity>
      {/* <Text style={styles.counterText}>{value}</Text> */}
      <TextInput
        style={styles.counterText}
        value={`${value}`}
        keyboardType="numeric"
        onChangeText={(val) => setValue(Number(val))}
      />
      <TouchableOpacity
        style={{ paddingHorizontal: 5 }}
        onPress={() => setValue((oldValue: any) => oldValue + 1)}
      >
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CounterComponent;

const styles = StyleSheet.create({
  counterBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.lightGrey,
    ...theme.elevationLight,
  },
  counterText: {
    ...theme.font.fontMedium,
    fontSize: 15,
  },
});
