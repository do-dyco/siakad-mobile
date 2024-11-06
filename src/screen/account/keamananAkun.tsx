import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  Box,
  HStack,
  VStack,
  ScrollView,
  Button,
  InputField,
  Input,
  InputSlot,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { router } from "expo-router";

const keamananAkun = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Keamanan Akun"} />

        <VStack space="md">
          <Box
            mx={40}
            borderWidth={1}
            borderColor="transparent"
            borderRadius={10}
            bgColor={mode === "dark" ? "#22262F" : "white"}
            mt={20}
            width={"80%"}
          >
            <VStack space="2xl" p={10} my={20}>
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
                <InputField placeholder="Kata sandi baru" />

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
                <InputField placeholder="Konfirmasi kata sandi baru" />

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
                mt={20}
                mx={30}
                onPress={() => router.push("/(tabs)")}
              >
                <HStack space="md">
                  <Text color="#ffffff">Ganti Kata Sandi</Text>
                </HStack>
              </Button>
            </VStack>
          </Box>
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default keamananAkun;
