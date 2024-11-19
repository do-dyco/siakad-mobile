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
  Badge,
  Image,
  Divider,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const topUp = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();

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
                  <Text color="white" mx={10}>
                    Saldo
                  </Text>
                  <Text color="white" mx={10}>
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
            <Text color={mode === "dark" ? "white" : "black"}>
              Muhammad Robby
            </Text>
            <HStack mt={20}>
              <Text
                size="2xl"
                fontWeight={"$bold"}
                color={mode === "dark" ? "white" : "black"}
              >
                Rp
              </Text>
              <Input
                variant="underlined"
                size="xl"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                style={{ borderColor: "transparent" }}
              >
                <InputField
                  color={mode === "dark" ? "white" : "black"}
                  fontSize={18}
                  fontWeight={"$bold"}
                  // placeholder="0"
                />
              </Input>
            </HStack>
          </Center>

          <HStack justifyContent="space-between">
            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto100k.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    50k
                  </Text>
                </HStack>
              </Center>
            </Badge>

            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto100k.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    100k
                  </Text>
                </HStack>
              </Center>
            </Badge>

            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto100k.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    200k
                  </Text>
                </HStack>
              </Center>
            </Badge>
          </HStack>

          <HStack justifyContent="space-between">
            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto300k.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    300k
                  </Text>
                </HStack>
              </Center>
            </Badge>

            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto500k.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    500k
                  </Text>
                </HStack>
              </Center>
            </Badge>

            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              backgroundColor={colors.box}
              width={"30%"}
            >
              <Center>
                <HStack space="md" alignItems="center">
                  <Image
                    source={require("@/assets/images/money/upto1mil.png")}
                    alt="artikel"
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: "contain",
                    }}
                  />
                  <Text color="white" size="md">
                    1jt
                  </Text>
                </HStack>
              </Center>
            </Badge>
          </HStack>
        </VStack>
        <Divider mb={20} bgColor="#22262F" />
        <VStack mt="auto" mx={10} mb={20}>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            onPress={() => router.push("/metodeBayar")}
          >
            <Text color="white">Selanjutnya</Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default topUp;
