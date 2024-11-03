import {
  Input,
  InputField,
  VStack,
  Text,
  Button,
  Center,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Akun() {
  const router = useRouter();
  return (
    <Center>
      <VStack space="md" mt={"50%"}>
        <Text fontWeight={"$extrabold"} fontSize={"$xl"}>
          Selamat datang
        </Text>
        <Text>
          Masukkan email, kode instansi dan kata sandi Anda untuk masuk ke dalam
          aplikasi.
        </Text>

        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          borderRadius={8}
        >
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
        </Input>

        <Center>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            bgColor={colors.primary}
            mt={20}
          >
            <Text color="#ffffff">Masuk</Text>
          </Button>
        </Center>

        <Center mt={20}>
          <Text>Lupa Kata Sandi ?</Text>
        </Center>
      </VStack>
    </Center>
  );
}
