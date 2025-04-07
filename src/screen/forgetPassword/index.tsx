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
  Divider,
  SafeAreaView,
  ScrollView,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

export default function ForgetPassword() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  return (
    <>
      <ScrollView>
        <SafeAreaView
          backgroundColor={mode === "dark" ? "black" : "white"}
          height={screenHeight}
        >
          <VStack mt={"20%"} mx={10}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo
                name="chevron-left"
                size={30}
                color={mode === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <Divider mt={20} />
            <Center mt={30}>
              <VStack space="md">
                <Text
                  fontWeight={"$bold"}
                  fontFamily="Lato"
                  fontSize={24}
                  color={mode === "dark" ? "white" : colors.gray.light[900]}
                >
                  Setel ulang kata sandi
                </Text>
                <Text
                  mt={16}
                  fontSize={16}
                  fontFamily="Lato"
                  color={mode === "dark" ? "white" : colors.gray.light[600]}
                >
                  Masukkan alamat email yang terkait dengan akun Anda, dan kami
                  akan mengirimkan tautan untuk mengatur ulang kata sandi Anda
                  melalui email.
                </Text>

                <Input
                  mt={40}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  borderRadius={8}
                >
                  <InputSlot mx={10}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={25}
                      color={"#535862"}
                    />
                  </InputSlot>
                  <InputField placeholder="Masukkan email Anda" />
                </Input>

                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  bgColor={colors.brand[500]}
                  borderRadius={10}
                  height={"15%"}
                  mt={24}
                  onPress={() => router.push("/confirmPassword")}
                >
                  <Text color="#ffffff" fontFamily="Lato">
                    Kirim Tautan
                  </Text>
                </Button>
              </VStack>
            </Center>
          </VStack>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
