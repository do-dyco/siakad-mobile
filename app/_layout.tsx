import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgetPassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="confirmPassword"
            options={{ headerShown: false }}
          />
          {/* account */}
          <Stack.Screen name="informasiDiri" options={{ headerShown: false }} />
          <Stack.Screen name="informasiWali" options={{ headerShown: false }} />
          <Stack.Screen name="keamananAkun" options={{ headerShown: false }} />
          <Stack.Screen
            name="pengaturanAkun"
            options={{ headerShown: false }}
          />

          {/* keuangan */}
          <Stack.Screen name="saldo" options={{ headerShown: false }} />
          <Stack.Screen
            name="detailTransaksi"
            options={{ headerShown: false }}
          />

          {/* pengasuhan */}
          <Stack.Screen name="absensi" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
