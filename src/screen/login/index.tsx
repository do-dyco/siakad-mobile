import {
  Input,
  InputField,
  VStack,
  Text,
  Button,
  Center,
  Image,
  HStack,
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
import { useUserStore } from "../../store/userStore";
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

  const { isLoggedIn, hasHydrated } = useAuthStore();

  const setAuth = useUserStore((state) => state.setAuth);
  const user = useUserStore((state) => state.user);

  const handleLogin = async () => {
    setLoading(true);
    setShowAlert(false);

    if (!login || !password || !kodeUnik) {
      setShowAlert(true);
      setLoading(false);
      return;
    }

    const param = {
      login: login,
      password: password,
      kodeUnik: kodeUnik,
      rememberMe: rememberMe,
    };

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
        useAuthStore.getState().login();
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
    useAuthStore.getState().login();
  };

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
              />
            </Input>

            <Input borderRadius={12}>
              <InputField
                placeholder="Kata sandi"
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
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
