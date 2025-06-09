import Header from "@/components/Header";
import colors from "@/src/config/colors";
import {
  Box,
  HStack,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Center,
  Avatar,
  AvatarFallbackText,
  Input,
  InputField,
  Image,
  Divider,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const topUp = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const borderColor = mode === "dark" ? colors.box : colors.gray.light[100];
  const textColor = mode === "dark" ? "white" : "black";

  const handleSubmit = () => {
    setIsSubmitted(true);
    router.push("/metodeBayar");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Isi Ulang Saldo"} />
        <VStack space="md" mx={10} flex={1}>
          <Box
            borderWidth={1}
            borderColor={"transparent"}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
          >
            <ImageBackground
              source={require("@/assets/images/One.png")}
              style={{
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                width: "auto",
                height: screenHeight / 10,
              }}
              imageStyle={{
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              <Center>
                <HStack justifyContent="space-between" width={"100%"} mt={"5%"}>
                  <Text color="white" mx={10} fontFamily="Lato" fontSize={16}>
                    Saldo
                  </Text>
                  <Text color="white" mx={10} fontFamily="Lato" fontSize={16}>
                    Rp.104.389.000
                  </Text>
                </HStack>
              </Center>
            </ImageBackground>
          </Box>

          <Center>
            <Avatar bgColor={colors.primary} size="md" borderRadius="$full">
              <AvatarFallbackText>Muhammad Robby</AvatarFallbackText>
            </Avatar>
            <Text color={textColor} fontFamily="Lato" fontSize={16}>
              Muhammad Robby
            </Text>
            <Center flex={1} justifyContent="center" alignItems="center">
              <HStack width="70%" space="sm" alignItems="center" px={20}>
                <Input
                  size="xl"
                  flex={1}
                  borderWidth={isSubmitted ? 0 : 1}
                  borderColor={borderColor}
                  justifyContent="center"
                  ml={-4} // Mengurangi margin kiri agar lebih rapat
                >
                  <Text fontFamily="Lato" fontSize={32} color={textColor}>
                    Rp.
                  </Text>
                  <InputField
                    placeholder="0"
                    color="#333333"
                    fontSize={32}
                    fontWeight="bold"
                    value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    onChangeText={(text) => {
                      const cleanedText = text.replace(/[^\d]/g, "");
                      setAmount(cleanedText);
                    }}
                    keyboardType="numeric"
                    textAlign="center"
                    pl={0}
                  />
                </Input>
              </HStack>
            </Center>
          </Center>

          {/* First Row */}
          <HStack justifyContent="space-between" mt={10}>
            {[50, 100, 200].map((nominal) => (
              <Box
                key={nominal}
                borderRadius={999}
                borderWidth={1}
                borderColor={borderColor}
                backgroundColor="transparent"
                width="30%"
                py="$2"
                px="$3"
                onTouchEnd={() => setAmount(nominal * 1000 + "")}
              >
                <Center>
                  <HStack space="md" alignItems="center">
                    <Image
                      source={require("@/assets/images/money/upto100k.png")}
                      alt={`${nominal}k`}
                      style={{ width: 24, height: 24, resizeMode: "contain" }}
                    />
                    <Text color={textColor} fontFamily="Lato" fontSize={16}>
                      {nominal}k
                    </Text>
                  </HStack>
                </Center>
              </Box>
            ))}
          </HStack>

          {/* Second Row */}
          <HStack justifyContent="space-between" mt="$2">
            {[300, 500, 1000].map((nominal) => (
              <Box
                key={nominal}
                borderRadius={999}
                borderWidth={1}
                borderColor={borderColor}
                backgroundColor="transparent"
                width="30%"
                py="$2"
                px="$3"
                onTouchEnd={() => setAmount(nominal * 1000 + "")}
              >
                <Center>
                  <HStack space="md" alignItems="center">
                    <Image
                      source={
                        nominal === 300
                          ? require("@/assets/images/money/upto300k.png")
                          : nominal === 500
                          ? require("@/assets/images/money/upto500k.png")
                          : require("@/assets/images/money/upto1mil.png")
                      }
                      alt={`${
                        nominal >= 1000 ? nominal / 1000 + "jt" : nominal + "k"
                      }`}
                      style={{ width: 24, height: 24, resizeMode: "contain" }}
                    />
                    <Text color={textColor} fontFamily="Lato" fontSize={16}>
                      {nominal >= 1000 ? nominal / 1000 + "jt" : nominal + "k"}
                    </Text>
                  </HStack>
                </Center>
              </Box>
            ))}
          </HStack>
        </VStack>

        <Divider mb={20} bgColor="#22262F" />
        <VStack mt="auto" mx={10} mb={20}>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            mb={20}
            onPress={handleSubmit}
          >
            <Text color="white">Selanjutnya</Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default topUp;
