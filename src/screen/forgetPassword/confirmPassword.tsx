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

export default function ConfirmPassword() {
  const router = useRouter();
  return (
    <>
      <VStack mt={"20%"} mx={10}>
        <Center mt={30}>
          <VStack space="md">
            <Text fontWeight={"$extrabold"} fontSize={"$xl"}>
              Pebarui kata sandi
            </Text>
            <Text>
              Panjangnya minimal 8 karakter dan mengandung angka atau simbol
            </Text>

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

            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              borderRadius={8}
            >
              <InputField placeholder="Konfirmasi kata sandi" />

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
              borderRadius={10}
              height={"15%"}
              mt={20}
              onPress={() => router.push("/(tabs)")}
            >
              <Text color="#ffffff">Perbarui dan Masuk</Text>
            </Button>
          </VStack>
        </Center>
      </VStack>
    </>
  );
}
