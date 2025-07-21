import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { useTagihanStore } from "@/src/store/tagihanStore";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  Radio,
  RadioIndicator,
  RadioGroup,
  RadioIcon,
  CircleIcon,
  Button,
  Image,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const MetodeBayar = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);
  const { invoice } = useLocalSearchParams();
  const { selectedTagihan } = useTagihanStore();

  const textColor = mode === "dark" ? "white" : "black";
  const dividerColor = mode === "dark" ? "#373A41" : colors.gray.light[300];

  const totalNominal = selectedTagihan.reduce(
    (total, item) => total + parseInt(item.nominal || 0),
    0
  );

  const handleRadioClick = (value: string) => {
    setSelected((prev) => (prev === value ? null : value));
  };

  const handleNext = () => {
    if (!selected) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    switch (selected) {
      case "saldo":
        router.push("/bayarSaldo");
        break;
      case "mandiri-transfer":
        router.push("/transferNow");
        break;
      case "mandiri-va":
        router.push("/bayarMandiriVa");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data="Pilih Metode Bayar" />

        <VStack space="md" m={10} flex={1}>
          {/* Invoice Box */}
          <Box
            mt={20}
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            overflow="hidden"
          >
            <Box p={10} backgroundColor={mode === "dark" ? "black" : "white"}>
              <HStack space="md" alignItems="center">
                <Box
                  height={30}
                  width={30}
                  borderRadius={10}
                  bgColor={colors.boxWarning}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color="white"
                  />
                </Box>
                <Text color={textColor} fontFamily="Lato">
                  {invoice}
                </Text>
              </HStack>
            </Box>

            <Divider bgColor={dividerColor} />

            <Box backgroundColor={colors.gray.light[300]} p={10}>
              <HStack justifyContent="space-between">
                <Text color="#94979C" fontFamily="Lato">
                  Jumlah isi ulang saldo
                </Text>
                <Text color={textColor} fontFamily="Lato">
                  Rp. {totalNominal.toLocaleString("id-ID")}
                </Text>
              </HStack>
            </Box>
          </Box>

          {/* Judul */}
          <Text color={textColor} mt={20} fontFamily="Lato" fontWeight="$bold">
            Metode Pembayaran
          </Text>

          {/* Metode Saldo */}
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            mx={10}
            bgColor="transparent"
          >
            <VStack space="md" m={10} mt={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
                  <Entypo name="wallet" size={20} color={colors.primary} />
                  <Text color={textColor} fontFamily="Lato">
                    Saldo
                  </Text>
                </HStack>
                <RadioGroup value={selected}>
                  <Radio
                    value="saldo"
                    size="md"
                    isChecked={selected === "saldo"}
                    onPress={() => handleRadioClick("saldo")}
                  >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} color={colors.primary} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
              <Divider bgColor={dividerColor} />
              <Text
                color={textColor}
                fontFamily="Lato-Bold"
                style={{ marginLeft: 30 }}
              >
                Rp. {totalNominal.toLocaleString("id-ID")}
              </Text>
            </VStack>
          </Box>

          {/* Metode Transfer */}
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            mx={10}
            bgColor="transparent"
          >
            <VStack space="md" m={10} mt={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
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
                <RadioGroup value={selected}>
                  <Radio
                    value="mandiri-transfer"
                    size="md"
                    isChecked={selected === "mandiri-transfer"}
                    onPress={() => handleRadioClick("mandiri-transfer")}
                  >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} color={colors.primary} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
              <Divider bgColor={dividerColor} />
              <Text color={textColor} fontFamily="Lato" fontSize={12}>
                Mohon masukkan nominal beserta kode unik di halaman selanjutnya
                ketika akan Transfer.
              </Text>
            </VStack>
          </Box>

          {/* Metode VA */}
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            mx={10}
            bgColor="transparent"
          >
            <VStack space="md" m={10} mt={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack
                  space="md"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack mt={5}>
                    <Image
                      size="xs"
                      source={require("@/assets/images/bank/mandiri.png")}
                      alt="mandiri"
                      borderRadius={10}
                      mt={"-10%"}
                    />
                    <Text color={textColor} fontFamily="Lato">
                      Mandiri VA
                    </Text>
                  </HStack>

                  <Text
                    color={textColor}
                    fontFamily="Lato"
                    fontSize={12}
                    mt={-5}
                    ml={60}
                  >
                    +VA fee Rp.1.500
                  </Text>
                </HStack>
                <RadioGroup value={selected}>
                  <Radio
                    value="mandiri-va"
                    size="md"
                    isChecked={selected === "mandiri-va"}
                    onPress={() => handleRadioClick("mandiri-va")}
                  >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} color={colors.primary} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
            </VStack>
          </Box>
        </VStack>

        {/* Footer */}
        <Divider />
        <HStack justifyContent="space-between" m={20} alignItems="center">
          <VStack>
            <Text fontFamily="Lato">Total Transfer</Text>
            <Text color={textColor} fontWeight="$semibold" fontFamily="Lato">
              Rp.{totalNominal.toLocaleString("id-ID")}
            </Text>
          </VStack>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            onPress={handleNext}
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
