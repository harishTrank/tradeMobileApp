import React from "react";
import { View, Modal, StyleSheet, SafeAreaView, Text } from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import theme from "../../utils/theme";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalizeLoader = ({
  modelOpen,
  setModelOpen,
  apiLoading,
  error,
  apiMessage,
}: any) => {
  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={modelOpen}>
        <View style={styles.container}>
          <View style={styles.containerWhite}>
            {!apiLoading && (
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModelOpen(false)}
              >
                <Entypo name="cross" size={30} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            <View style={styles.card}>
              <View
                style={[
                  styles.circle,
                  error && { backgroundColor: theme.colors.danger },
                ]}
              >
                {[...Array(3).keys()].map((item: any, index: any) => (
                  <MotiView
                    from={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0.2, scale: 3 }}
                    transition={{
                      type: "timing",
                      duration: 2000,
                      easing: Easing.out(Easing.ease),
                      delay: index * 500,
                      loop: true,
                      repeatReverse: true,
                    }}
                    key={index}
                    style={[
                      styles.circle,
                      { position: "absolute" },
                      error && { backgroundColor: theme.colors.danger },
                    ]}
                  />
                ))}
                {error ? (
                  <MaterialIcons name="cancel" size={30} color="black" />
                ) : (
                  <Feather name="check-circle" size={30} color="black" />
                )}
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.heading}>BUY ORDER</Text>

                <View>
                  <View
                    style={[
                      styles.row,
                      { backgroundColor: theme.colors.lightGrey },
                    ]}
                  >
                    <Text style={styles.basicText}>MCX SILVER</Text>
                    <Text style={styles.basicText}>Dec 5</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.basicText}>Quantity:</Text>
                    <Text style={styles.basicText}>1</Text>
                  </View>
                  <View
                    style={[
                      styles.row,
                      { backgroundColor: theme.colors.lightGrey },
                    ]}
                  >
                    <Text style={styles.basicText}>OrderType:</Text>
                    <Text style={styles.basicText}>Market</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeBtn: {
    alignItems: "flex-end",
  },
  containerWhite: {
    backgroundColor: "#fff",
    width: "95%",
    height: "80%",
    padding: 10,
    borderRadius: 10,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: theme.colors.primary,
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 100,
  },
  contentContainer: {
    width: "100%",
    marginTop: 20,
  },
  heading: {
    ...theme.font.fontSemiBold,
    fontSize: 17,
    color: theme.colors.black,
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  basicText: {
    ...theme.font.fontMedium,
    color: theme.colors.black,
    fontSize: 15,
  },
});

export default ModalizeLoader;
