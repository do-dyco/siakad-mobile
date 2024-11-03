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
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ForgetPassword() {
  const router = useRouter();
  return (
    <>
      <VStack mt={"20%"} mx={10}>
        <Entypo name="chevron-left" size={30} />
        <Divider mt={20} />
        <Center mt={30}>
          <VStack space="md">
            <Text fontWeight={"$extrabold"} fontSize={"$xl"}>
              Setel ulang kata sandi
            </Text>
            <Text fontSize={"$lg"}>
              Masukkan alamat email yang terkait dengan akun Anda, dan kami akan
              mengirimkan tautan untuk mengatur ulang kata sandi Anda melalui
              email.
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
              <InputField placeholder="Masukkan email Anda" />
            </Input>

            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              bgColor={colors.primary}
              borderRadius={10}
              height={"15%"}
              mt={20}
              onPress={() => router.push("/confirmPassword")}
            >
              <Text color="#ffffff">Kirim Tautan</Text>
            </Button>
          </VStack>
        </Center>
      </VStack>
    </>
  );
}
