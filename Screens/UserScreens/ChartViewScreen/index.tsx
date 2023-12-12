import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import theme from "../../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChartViewScreen = ({ route }: any) => {
  const [currentCoin, setCurrentCoin]: any = useState(
    route.params?.selectedCoinData?.InstrumentIdentifier
  );

  useEffect(() => {
    if (route.params?.selectedCoinData.Exchange?.toUpperCase() === "MCX") {
      setCurrentCoin(
        `${
          route.params?.selectedCoinData?.InstrumentIdentifier?.split("_")?.[1]
        }1!`
      );
    }
  }, [route.params.selectedCoinData]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: useSafeAreaInsets().top,
          backgroundColor: theme.colors.primaryDark,
        }}
      />
      <WebView
        source={{
          uri: `https://www.tradingview.com/chart/?symbol=${currentCoin}&theme=dark`,
        }}
      />
      <View
        style={{
          paddingTop: useSafeAreaInsets().bottom,
          backgroundColor: theme.colors.primaryDark,
        }}
      />
    </View>
  );
};

export default ChartViewScreen;
