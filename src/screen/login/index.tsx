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
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  Box,
  Spinner,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import AlertCustom from "@/components/Alert";
import apiService from "@/src/service/apiService";
import { useAuthStore } from "@/src/store/authStore";
import { MotiView } from "moti";

export default function Login() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [kodeUnik, setKodeUnik] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { isLoggedIn, setAuth, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && isLoggedIn) {
      router.replace("/(tabs)");
    }
  }, [hasHydrated, isLoggedIn]);

  const handleLogin = async () => {
    if (!login.trim() || !password.trim() || !kodeUnik.trim()) {
      setAlertMessage("Silakan isi email, kode instansi, dan kata sandi sebelum melanjutkan.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setShowAlert(false);

    const param = {
      login: login.trim(),
      password: password.trim(),
      kode_unik: kodeUnik.trim(),
      remember_me: rememberMe,
    };

    try {
      console.log("Mengirim request login dengan param:", param);
      const res = await apiService.login(param);

      if (res?.meta?.status_code === 200) {
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
        // Navigation will be handled by useEffect or RootLayout
      } else {
        setAlertMessage(res?.meta?.message || "Login gagal. Silakan periksa kembali data Anda.");
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setAlertMessage(error?.response?.data?.meta?.message || "Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (!hasHydrated) {
    return (
      <SafeAreaView backgroundColor={mode === "dark" ? "black" : "white"} height="100%">
        <Center flex={1}>
          <Spinner size="large" color={colors.brand[500]} />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView flex={1}>
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
            style={{ flex: 1 }}
          >
            <Box px={24} pt={60} pb={24}>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("@/assets/images/LOGO.png")}
                alt="logo"
                resizeMode="contain"
              />
              
              <VStack mt={40} space="xs">
                <Text
                  fontWeight="$extrabold"
                  fontFamily="Lato-Bold"
                  fontSize={28}
                  color={mode === "dark" ? "white" : colors.gray.light[900]}
                >
                  Selamat datang
                </Text>
                <Text
                  fontSize={15}
                  fontFamily="Lato"
                  color={mode === "dark" ? colors.gray.dark[400] : colors.gray.light[500]}
                  lineHeight={22}
                >
                  Silakan masuk dengan akun Anda untuk mengakses dashboard akademik.
                </Text>
              </VStack>

              <VStack mt={32} space="lg">
                <VStack space="xs">
                  <Text size="sm" fontWeight="$medium" color={mode === "dark" ? "white" : colors.gray.light[700]}>
                    Email atau Username
                  </Text>
                  <Input borderRadius={12} height={50} variant="outline" size="md">
                    <InputSlot pl={12}>
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={colors.gray.light[500]}
                      />
                    </InputSlot>
                    <InputField
                      placeholder="Contoh: user@email.com"
                      value={login}
                      onChangeText={setLogin}
                      color={mode === "dark" ? "white" : "black"}
                    />
                  </Input>
                </VStack>

                <VStack space="xs">
                  <Text size="sm" fontWeight="$medium" color={mode === "dark" ? "white" : colors.gray.light[700]}>
                    Kode Instansi
                  </Text>
                  <Input borderRadius={12} height={50} variant="outline" size="md">
                    <InputSlot pl={12}>
                      <FontAwesome name="id-card-o" size={18} color={colors.gray.light[500]} />
                    </InputSlot>
                    <InputField
                      placeholder="Masukkan kode instansi"
                      value={kodeUnik}
                      onChangeText={setKodeUnik}
                      color={mode === "dark" ? "white" : "black"}
                    />
                  </Input>
                </VStack>

                <VStack space="xs">
                  <Text size="sm" fontWeight="$medium" color={mode === "dark" ? "white" : colors.gray.light[700]}>
                    Kata Sandi
                  </Text>
                  <Input borderRadius={12} height={50} variant="outline" size="md">
                    <InputSlot pl={12}>
                      <MaterialCommunityIcons name="lock-outline" size={20} color={colors.gray.light[500]} />
                    </InputSlot>
                    <InputField
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChangeText={setPassword}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <InputSlot pr={12}>
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Entypo
                          name={showPassword ? "eye" : "eye-with-line"}
                          size={20}
                          color={colors.gray.light[500]}
                        />
                      </Pressable>
                    </InputSlot>
                  </Input>
                </VStack>

                <HStack justifyContent="space-between" alignItems="center">
                  <Checkbox
                    size="md"
                    isInvalid={false}
                    isDisabled={false}
                    value="remember"
                    isChecked={rememberMe}
                    onChange={(val) => setRememberMe(val)}
                    aria-label="Remember me"
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel fontFamily="Lato" size="sm">Ingat saya</CheckboxLabel>
                  </Checkbox>

                  <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
                    <Text
                      fontFamily="Lato-Bold"
                      fontSize={14}
                      color={colors.brand[500]}
                    >
                      Lupa Kata Sandi?
                    </Text>
                  </TouchableOpacity>
                </HStack>

                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  bg={colors.brand[500]}
                  h={50}
                  mt={8}
                  borderRadius={12}
                  onPress={handleLogin}
                  isDisabled={loading}
                >
                  {loading ? (
                    <Spinner color="white" />
                  ) : (
                    <Text color="white" fontWeight="$bold" fontFamily="Lato-Bold">
                      Masuk Ke Akun
                    </Text>
                  )}
                </Button>
              </VStack>

              {showAlert && (
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ marginTop: 24 }}
                >
                  <AlertCustom
                    boxBgColor={colors.error[500]}
                    iconColor="white"
                    title="Oops!"
                    message={alertMessage}
                  />
                </MotiView>
              )}
            </Box>
          </MotiView>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
