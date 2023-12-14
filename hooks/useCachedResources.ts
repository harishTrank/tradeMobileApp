import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    useEffect(() => {
        SplashScreen.hideAsync();
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
                    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
                    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
                    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
                    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
                    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
                    "PlayfairDisplay-Black": require("../assets/fonts/PlayfairDisplay-Black.ttf"),
                    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
                    "Cinzel-Black": require("../assets/fonts/Cinzel-Black.ttf"),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
