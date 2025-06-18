import { VerbProvider } from "@/contexts/VerbContext";
import { initVerbs } from "@/data/Verbs";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initVerbs();
        setAppIsReady(true);
      } catch (e) {
        console.error(e);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <VerbProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen
            name="PracticeScreen"
            options={{ title: "Practice Verbs" }}
          />
          <Stack.Screen
            name="VerbsScreen"
            options={{ title: "View + Edit Verbs" }}
          />
          <Stack.Screen name="SettingsScreen" options={{ title: "Settings" }} />
        </Stack>
      </VerbProvider>
    </View>
  );
}
