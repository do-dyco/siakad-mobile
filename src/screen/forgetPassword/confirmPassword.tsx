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
  Heading,
  Icon,
  CloseIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

export default function ConfirmPassword() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <VStack mt={"20%"} mx={10}>
        <Center mt={30}>
          <VStack space="md">
            <Text fontWeight={"$extrabold"} fontSize={"$xl"} fontFamily="Lato">
              Pebarui kata sandi
            </Text>
            <Text fontFamily="Lato">
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
              onPress={handleOpen}
            >
              <Text color="#ffffff">Perbarui dan Masuk</Text>
            </Button>
          </VStack>
        </Center>
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent mt={16}>
          <AlertDialogBody mt={16}>
            <HStack justifyContent="space-between">
              <HStack>
                <Box bgColor={"#000000"} p={2} borderRadius={"$full"}>
                  <Ionicons
                    name="mail"
                    size={20}
                    color="white"
                    style={{ padding: 4 }}
                  />
                </Box>
                <Text fontSize={14} fontFamily="Lato-Bold" ml={8}>
                  Periksa kotak masuk email Anda!
                </Text>
              </HStack>

              <TouchableOpacity onPress={handleClose}>
                <Icon as={CloseIcon} />
              </TouchableOpacity>
            </HStack>
            <Text fontSize={12} fontFamily="Lato" mt={-4} mb={16} ml={40}>
              Tautan untuk mengatur ulang kata sandi Anda telah di kririm ke
              ajpdesign.info@gmail.com.
            </Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
