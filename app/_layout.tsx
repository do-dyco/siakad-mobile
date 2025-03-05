import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import "react-native-gesture-handler";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Lato: require("../assets/fonts/Lato-Regular.ttf"), // Fixed the typo here
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="forgetPassword" />
            <Stack.Screen name="confirmPassword" />
            {/* account */}
            <Stack.Screen name="informasiDiri" />
            <Stack.Screen name="informasiWali" />
            <Stack.Screen name="keamananAkun" />
            <Stack.Screen name="pengaturanAkun" />

            {/* keuangan */}
            <Stack.Screen name="saldo" />
            <Stack.Screen name="detailTransaksi" />
            <Stack.Screen name="topUp" />
            <Stack.Screen name="metodeBayar" />
            <Stack.Screen name="transferNow" />
            <Stack.Screen name="statusTransaksi" />
            <Stack.Screen name="tagihan" />
            <Stack.Screen name="invoice" />
            <Stack.Screen name="bayarInvoice" />

            {/* pengasuhan */}
            <Stack.Screen name="absensi" />
            <Stack.Screen name="absensiHp" />
            <Stack.Screen name="pelanggaran" />

            {/* akademik */}
            <Stack.Screen name="rangking" />
            <Stack.Screen name="detailMapel" />
            <Stack.Screen name="jadwalPelajaran" />
            <Stack.Screen name="detailJadwalMasuk" />

            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
