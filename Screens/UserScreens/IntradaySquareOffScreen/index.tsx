import { Text, View, StyleSheet } from "react-native";
import theme from "../../../utils/theme";
import BasicHeader from "../../ReUseComponents/BasicHeader";
import { useEffect, useState } from "react";
import SmallBtnComponent from "../../ReUseComponents/SmallBtnComponent";
import ToggleBtnComponent from "../../ReUseComponents/ToggleBtnComponent";
import { useGetIntradaySquareOff } from "../../../hooks/TradeCoin/query";
import { usePostIntradaySquareOff } from "../../../hooks/TradeCoin/mutation";
import Toast from "react-native-toast-message";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";

const RowComponent = ({ title, coinToggles, setCoinToggles }: any) => {
  const coinValueUpdate = (val: any) => {
    setCoinToggles((oldValue: any) => {
      return { ...oldValue, ...{ [title]: val } };
    });
  };
  return (
    <View style={styles.rowStyle}>
      <Text style={styles.defaultText}>{title.toUpperCase()}</Text>
      <ToggleBtnComponent
        value={coinToggles[title]}
        onToggle={coinValueUpdate}
      />
    </View>
  );
};

const IntradaySquareOffScreen = ({ navigation, route }: any) => {
  const [coinToggles, setCoinToggles]: any = useState({
    mcx: false,
    nse: false,
    mini: false,
  });

  const postApiCall: any = usePostIntradaySquareOff();

  const getCoinDetails: any = useGetIntradaySquareOff({
    query: {
      user_id: route?.params?.user_id,
    },
  });
  useEffect(() => {
    if (getCoinDetails?.data?.data) {
      setCoinToggles(getCoinDetails.data.data);
    }
  }, [getCoinDetails?.data?.data]);

  const updateBtnHandler = () => {
    postApiCall
      ?.mutateAsync({
        query: {
          user_id: route?.params?.user_id,
        },
        body: coinToggles,
      })
      ?.then((res: any) => {
        navigation.goBack();
        return Toast.show({
          type: "success",
          text1: res.message,
        });
      })
      ?.catch((err: any) => console.log("err", err));
  };
  return (
    <View style={styles.screen}>
      <BasicHeader navigation={navigation} title="Intraday Squareoff" />
      <FullScreenLoader loading={postApiCall?.isLoading} />
      <View style={styles.mainBox}>
        {route?.params?.exchange.map((mapItem: any) => {
          return (
            <RowComponent
              key={mapItem}
              title={mapItem.toLowerCase()}
              coinToggles={coinToggles}
              setCoinToggles={setCoinToggles}
            />
          );
        })}
        <SmallBtnComponent
          style={styles.btnStyle}
          title={"Update"}
          onPress={updateBtnHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  mainBox: {
    margin: 10,
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  defaultText: {
    ...theme.font.fontSemiBold,
    fontSize: 16,
  },
  btnStyle: {
    marginVertical: 15,
  },
});

export default IntradaySquareOffScreen;
