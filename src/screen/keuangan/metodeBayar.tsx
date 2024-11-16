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
import { Dimensions, useColorScheme } from "react-native";

const MetodeBayar = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [selected, setSelected] = useState(false);

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
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor="transparent"
            mt={20}
            bgColor="#262729"
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
                <Text color="white">Muhammad Robby</Text>
              </HStack>
              <Divider bgColor="#373A41" />
              <HStack justifyContent="space-between">
                <Text color="#94979C">Jumlah isi ulang saldo</Text>
                <Text color="white">Rp.100.000</Text>
              </HStack>
            </VStack>
          </Box>

          <Text color={mode === "dark" ? "white" : "black"} mt={20}>
            Metode Transfer
          </Text>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={selected === false ? "#373A41" : colors.primary}
            mx={10}
          >
            <VStack space="md" m={10}>
              <HStack justifyContent="space-between">
                <HStack space="md">
                  <Image
                    size="xs"
                    source={require("@/assets/images/bank/mandiri.png")}
                    alt="artikel"
                    borderRadius={10}
                    mt={"-5%"}
                  />
                  <Text color={mode === "dark" ? "white" : "black"}>
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
              <Divider bgColor="#373A41" />
              <Text color={mode === "dark" ? "white" : "black"}>
                Mohon masukkan nominal beserta kode unik di halaman selanjutnya
                ketika akan Transfer.
              </Text>
            </VStack>
          </Box>
        </VStack>
        <Divider />
        <HStack justifyContent="space-between" m={20}>
          <VStack>
            <Text>Total Transfer</Text>
            <Text
              color={mode === "dark" ? "white" : "black"}
              fontWeight={"$semibold"}
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
            <Text color="white">Selanjutnya</Text>
          </Button>
        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MetodeBayar;
