import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  Center,
  Radio,
  RadioIndicator,
  RadioGroup,
  RadioIcon,
  CircleIcon,
  Button,
  Image,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, useColorScheme } from "react-native";

const MetodeBayar = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [selected, setSelected] = useState(false);

  const textColor = mode === "dark" ? "white" : "black";
  const borderColor = selected ? colors.primary : "#373A41";
  const boxBgColor = mode === "dark" ? "#262729" : colors.gray.light[200];
  const dividerColor = mode === "dark" ? "#373A41" : colors.gray.light[300];

  useEffect(() => {}, [selected]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Pilih Metode Bayar"} />

        <VStack space="md" m={10} flex={1}>
          {/* <ImageBackground
            source={mode === 'light' ? require("@/assets/images/Card-Trasanction.png") : ""}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              width: "100%",
              height: 120,
              margin: 10,
            }}
            imageStyle={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          > */}

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}
            mt={20}
            >
            <VStack mx={10} space="md" m={10}>
              <HStack space="md">
                <Box
                  borderRadius={10}
                  borderWidth={1}
                  borderColor="transparent"
                  height={30}
                  width={30}
                  bgColor={colors.primary}
                >
                  <Center mt={3}>
                    <SimpleLineIcons name="user" size={20} color={"white"} />
                  </Center>
                </Box>
                <Text color={textColor} fontFamily="Lato">
                  Muhammad Robby
                </Text>
              </HStack>
              <Divider bgColor={dividerColor} />
              <HStack justifyContent="space-between">
                <Text color="#94979C" fontFamily="Lato">
                  Jumlah isi ulang saldo
                </Text>
                <Text color={textColor} fontFamily="Lato">
                  Rp.100.000
                </Text>
              </HStack>
            </VStack>
          </Box>
          {/* </ImageBackground> */}

          <Text color={textColor} mt={20} fontFamily="Lato" fontWeight={"$bold"}>
            Metode Transfer
          </Text>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}
            mx={10}
            bgColor={"transparent"}
            >
            <VStack space="md" m={10}>
              <HStack justifyContent="space-between">
                <HStack space="md">
                  <Image
                    size="xs"
                    source={require("@/assets/images/bank/mandiri.png")}
                    alt="mandiri"
                    borderRadius={10}
                    mt={"-5%"}
                    />
                  <Text color={textColor} fontFamily="Lato">
                    Transfer Mandiri
                  </Text>
                </HStack>
                <RadioGroup>
                  <Radio
                    value="change"
                    size="md"
                    isInvalid={false}
                    isDisabled={false}
                    onChange={() => setSelected(true)}
                    >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} color={colors.primary} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
              <Divider bgColor={dividerColor} />
              <Text color={textColor} fontFamily="Lato">
                Mohon masukkan nominal beserta kode unik di halaman selanjutnya
                ketika akan Transfer.
              </Text>
            </VStack>
          </Box>
        </VStack>

        <Divider />
        <HStack justifyContent="space-between" m={20}>
          <VStack>
            <Text fontFamily="Lato">Total Transfer</Text>
            <Text
              color={textColor}
              fontWeight={"$semibold"}
              fontFamily="Lato"
            >
              Rp.100.000
            </Text>
          </VStack>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            onPress={() => router.push("/transferNow")}
          >
            <Text color="white" fontFamily="Lato">
              Selanjutnya
            </Text>
          </Button>
        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MetodeBayar;
