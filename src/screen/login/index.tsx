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
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Dimensions,
  Pressable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import AlertCustom from "@/components/Alert";

export default function Login() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
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
                fontWeight={"$extrabold"}
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

              <Input
                variant="outline"
                size={"md"}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                borderRadius={12}
              >
                <InputSlot mx={10}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color={"#535862"}
                  />
                </InputSlot>
                <InputField placeholder="Masukkan username / email Anda" />
              </Input>

              <Input
                variant="outline"
                size={"md"}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                borderRadius={12}
              >
                <InputSlot mx={10}>
                  <FontAwesome name="id-card-o" size={20} color={"#535862"} />
                </InputSlot>
                <InputField placeholder="Masukkan kode instansi" />
              </Input>

              <Input variant="outline" size="md" borderRadius={8}>
                <InputField
                  placeholder="Kata sandi"
                  type={showPassword ? "text" : "password"}
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
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                bgColor={colors.brand[500]}
                mt={20}
                borderRadius={12}
                onPress={() => router.push("/(tabs)")}
              >
                <Text color="#ffffff" fontFamily="Lato">
                  Masuk
                </Text>
              </Button>

              <Center mt={20}>
                <TouchableOpacity
                  onPress={() => router.push("forgetPassword" as never)}
                >
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
        </SafeAreaView>
        {showAlert === true && (
          <VStack mx={20} mt={-150}>
            <AlertCustom
              boxBgColor={colors.error[500]}
              iconColor="white"
              title="Email atau Kata Sandi Salah"
              message="Email atau kata sandi yang Anda masukkan salah, cek ulang email atau kata sandi Anda."
            />
          </VStack>
        )}
      </ScrollView>
    </>
  );
}
