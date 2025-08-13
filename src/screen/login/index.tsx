import {
  Input,
  InputField,
  VStack,
  Text,
  Button,
  Center,
  Image,
  InputSlot,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import AlertCustom from "@/components/Alert";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";
import { useAuthStore } from "@/src/store/authStore";

export default function Login() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [kodeUnik, setKodeUnik] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  const { isLoggedIn, hasHydrated, login: authLogin } = useAuthStore();
  const setAuth = useUserStore((state) => state.setAuth);
  const accessToken = useUserStore((state) => state.accessToken);

  const handleLogin = async () => {
    setLoading(true);
    setShowAlert(false);

    if (!login || !password || !kodeUnik) {
      setShowAlert(true);
      setLoading(false);
      return;
    }

    const param = { login, password, kodeUnik, rememberMe };

    try {
      const res = await apiService.login(param);

      if (res?.meta.status_code === 200) {
        setAuth({
          user: {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            isActive: res.data.is_active,
            groups: res.data.groups,
          },
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });
        authLogin();
        router.replace("/(tabs)");
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let authUnsub, userUnsub;
    let mounted = true;

    const initializeStores = async () => {
      try {
        // Wait for both stores to hydrate
        const authPromise = new Promise((resolve) => {
          if (useAuthStore.persist.hasHydrated()) {
            resolve();
          } else {
            authUnsub = useAuthStore.persist.onFinishHydration(resolve);
          }
        });

        const userPromise = new Promise((resolve) => {
          if (useUserStore.persist.hasHydrated()) {
            resolve();
          } else {
            userUnsub = useUserStore.persist.onFinishHydration(resolve);
          }
        });

        await Promise.all([authPromise, userPromise]);

        if (!mounted) return;

        // Get current state after hydration
        const token = useUserStore.getState().accessToken;
        const loggedIn = useAuthStore.getState().isLoggedIn;

        console.log("Hydration complete:", {
          token: !!token,
          loggedIn,
          hasToken: token !== null && token !== undefined,
        });

        setIsHydrating(false);

        // Navigate if user is already authenticated
        if (token && loggedIn) {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Store hydration error:", error);
        setIsHydrating(false);
      }
    };

    initializeStores();

    return () => {
      mounted = false;
      if (authUnsub) authUnsub();
      if (userUnsub) userUnsub();
    };
  }, [router]);

  // Additional effect to monitor store changes after hydration
  useEffect(() => {
    if (isHydrating) return;

    const unsubUser = useUserStore.subscribe(
      (state) => state.accessToken,
      (token) => {
        console.log("AccessToken changed:", !!token);
      }
    );

    const unsubAuth = useAuthStore.subscribe(
      (state) => state.isLoggedIn,
      (isLoggedIn) => {
        console.log("IsLoggedIn changed:", isLoggedIn);

        // Check if user should be redirected
        const token = useUserStore.getState().accessToken;
        if (token && isLoggedIn) {
          router.replace("/(tabs)");
        }
      }
    );

    return () => {
      unsubUser();
      unsubAuth();
    };
  }, [isHydrating, router]);

  console.log("Login component rendered", {
    accessToken: !!accessToken,
    isLoggedIn,
    hasHydrated,
    isHydrating,
  });

  // Show loading screen while stores are hydrating
  if (isHydrating) {
    return (
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Center flex={1}>
          <Image
            style={{ width: 80, height: 80, marginBottom: 20 }}
            source={require("@/assets/images/LOGO.png")}
            alt="logo"
          />
          <Text
            fontSize={16}
            fontFamily="Lato"
            color={mode === "dark" ? "white" : colors.gray.light[900]}
          >
            Loading...
          </Text>
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Image
          style={{ width: 50, height: 50, margin: 30 }}
          source={require("@/assets/images/LOGO.png")}
          alt="logo"
          mt="20%"
        />
        <Center mt={30} mx={20}>
          <VStack space="md">
            <Text
              fontWeight="$extrabold"
              fontFamily="Lato"
              fontSize={24}
              color={mode === "dark" ? "white" : colors.gray.light[900]}
            >
              Selamat datang
            </Text>
            <Text
              fontSize={14}
              mb={30}
              fontFamily="Lato"
              color={mode === "dark" ? "white" : colors.gray.light[400]}
            >
              Masukkan email, kode instansi dan kata sandi Anda untuk masuk ke
              dalam aplikasi.
            </Text>

            <Input borderRadius={12}>
              <InputSlot mx={10}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={25}
                  color={"#535862"}
                />
              </InputSlot>
              <InputField
                placeholder="Masukkan username / email Anda"
                value={login}
                onChangeText={setLogin}
                color={mode === "dark" ? "white" : "black"}
                placeholderTextColor={mode === "dark" ? "white" : "#888"}
              />
            </Input>

            <Input borderRadius={12}>
              <InputSlot mx={10}>
                <FontAwesome name="id-card-o" size={20} color={"#535862"} />
              </InputSlot>
              <InputField
                placeholder="Masukkan kode instansi"
                value={kodeUnik}
                onChangeText={setKodeUnik}
                color={mode === "dark" ? "white" : "black"}
                placeholderTextColor={mode === "dark" ? "white" : "#888"}
              />
            </Input>

            <Input borderRadius={12}>
              <InputField
                placeholder="Kata sandi"
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
                color={mode === "dark" ? "white" : "black"}
                placeholderTextColor={mode === "dark" ? "white" : "#888"}
              />
              <InputSlot mx={10}>
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Entypo
                    name={showPassword ? "eye" : "eye-with-line"}
                    size={25}
                    color="#535862"
                  />
                </Pressable>
              </InputSlot>
            </Input>

            <Button
              size="md"
              variant="solid"
              bgColor={colors.brand[500]}
              mt={20}
              borderRadius={12}
              onPress={handleLogin}
              isDisabled={loading}
            >
              <Text color="#ffffff" fontFamily="Lato">
                {loading ? "Loading..." : "Masuk"}
              </Text>
            </Button>

            <Center mt={20}>
              <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
                <Text
                  fontFamily="Lato"
                  color={mode === "dark" ? "white" : colors.gray.light[900]}
                >
                  Lupa Kata Sandi ?
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </Center>

        {showAlert && (
          <VStack mx={20} mt={20}>
            <AlertCustom
              boxBgColor={colors.error[500]}
              iconColor="white"
              title="Input Tidak Lengkap"
              message="Silakan isi email, kode instansi, dan kata sandi sebelum melanjutkan."
            />
          </VStack>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
