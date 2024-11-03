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
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <Image
        style={{ width: 70, height: 70, margin: 20 }}
        source={require("@/assets/images/LOGO.png")}
        alt="logo"
        mt="20%"
      />
      <Center mt={30}>
        <VStack space="md">
          <Text fontWeight={"$extrabold"} fontSize={"$xl"}>
            Selamat datang
          </Text>
          <Text>
            Masukkan email, kode instansi dan kata sandi Anda untuk masuk ke
            dalam aplikasi.
          </Text>

          <Input
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
            <InputField placeholder="Masukkan username / email Anda" />
          </Input>

          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            borderRadius={8}
          >
            <InputSlot mx={10}>
              <FontAwesome name="id-card-o" size={20} color={"#535862"} />
            </InputSlot>
            <InputField placeholder="Masukkan kode instansi" />
          </Input>

          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            borderRadius={8}
          >
            <InputField placeholder="Kata sandi" />

            <InputSlot mx={10}>
              <Entypo name="eye-with-line" size={25} color={"#535862"} />
            </InputSlot>
          </Input>

          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            bgColor={colors.primary}
            mt={20}
            onPress={() => router.push("/(tabs)")}
          >
            <Text color="#ffffff">Masuk</Text>
          </Button>

          <Center mt={20}>
            <TouchableOpacity onPress={() => router.push("forgetPassword")}>
              <Text>Lupa Kata Sandi ?</Text>
            </TouchableOpacity>
          </Center>
        </VStack>
      </Center>
    </>
  );
}