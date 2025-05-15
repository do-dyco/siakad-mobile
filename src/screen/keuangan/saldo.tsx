import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import {
  VStack,
  Text,
  Box,
  HStack,
  SafeAreaView,
  ImageBackground,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ScrollView,
  Center,
  Input,
  InputField,
  Badge,
  BadgeText,
  Switch,
  Radio,
  CircleIcon,
  RadioIndicator,
  RadioIcon,
  RadioGroup,
  Divider,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Button,
} from "@gluestack-ui/themed";
import Header from "@/components/Header";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import SkeletonList from "@/components/SkeletonList";
import { TouchableOpacity } from "react-native";
import colors from "@/src/config/colors";
import { router } from "expo-router";
import CustomBadge from "@/components/CustomBadge";

const Saldo = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [data, setData] = useState("1");
  const [loading, setLoading] = useState("");
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const [chooseDate, setChooseDate] = useState(false);

  return (
    <>
      <ScrollView>
        <SafeAreaView
          backgroundColor={mode === "dark" ? "black" : "white"}
          height={screenHeight}
        >
          <Header data={"Saldo"} />
          <VStack mx={10} space="md">
            <Box
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              borderWidth={1}
              borderColor="transparent"
              mt={20}
              height={screenHeight / 7}
            >
              <ImageBackground
                source={require("@/assets/images/One.png")}
                style={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  width: "auto",
                  height: screenHeight / 7,
                }}
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              >
                <VStack mt={2}>
                  <Text m={10} fontSize={16} fontFamily="Lato" color="white">
                    Total Saldo Anda
                  </Text>
                  <HStack space="md">
                    <HStack
                      m={10}
                      justifyContent="space-between"
                      mr="10%"
                      mb={40}
                    >
                      <HStack space="md">
                        <Text fontWeight={"$bold"} color={"white"} fontSize={24} fontFamily={"$semibold"}>
                          Rp.104.589.000
                        </Text>
                        <Entypo
                          name="eye-with-line"
                          size={25}
                          color={"white"}
                        />
                      </HStack>
                    </HStack>
                  </HStack>
                  <Center>
                    <HStack justifyContent="space-between" space="md" mt={10}>
                      <HStack space="md">
                        <Box backgroundColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[100]} borderRadius={8}>
                          <Entypo
                            name="plus"
                            size={25}
                            color={mode === "dark" ? "white" : "black"}
                            style={{ margin: 5 }}
                          />
                        </Box>
                        <Text
                          mt={10}
                          fontFamily="Lato"
                          fontSize={12}
                          fontWeight={"$semibold"}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Top Up
                        </Text>
                      </HStack>
                      <Text mt={4} color={mode === "dark" ? "white" : "black"}>
                        {" "}
                        |{" "}
                      </Text>
                      <HStack>
                        <Box backgroundColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[100]} borderRadius={8}>
                          <FontAwesome5
                            name="hand-holding-medical"
                            size={20}
                            color={mode === "dark" ? "white" : "black"}
                            style={{ margin: 5 }}
                          />
                        </Box>
                        <Text
                          mt={10}
                          fontFamily="Lato"
                          fontSize={12}
                          fontWeight={"$semibold"}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          {"  "}
                          Tarik Tunai
                        </Text>
                      </HStack>
                    </HStack>
                  </Center>

                  <HStack mt={15} space="md">
                    <Input
                      variant="rounded"
                      width={"85%"}
                      borderColor={"transparent"}
                      backgroundColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]}
                    >
                      <InputField placeholder="Cari transaksi disini" />
                    </Input>

                    <TouchableOpacity onPress={() => setShowActionsheet(true)}>
                      <Box borderRadius={"$full"} backgroundColor={mode === "light" ? colors.gray.light[200] : colors.gray.dark[800]}>
                        <Ionicons
                          name="filter"
                          size={25}
                          color={mode === 'dark' ? "white" : 'black'}
                          style={{ margin: 8 }}
                        />
                      </Box>
                    </TouchableOpacity>
                  </HStack>

                  <VStack space="md">
                    <Text
                      mt={15}
                      fontFamily="Lato"
                      fontWeight={"$bold"}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Riwayat Transaksi
                    </Text>

                    {loading ? <SkeletonList /> : null}
                    {!data && !loading ? (
                      <Box justifyContent="center" mt={screenHeight / 6}>
                        <Center>
                          <Octicons
                            name="checklist"
                            size={30}
                            color={mode === "dark" ? "white" : "black"}
                          />
                          <Text
                            fontWeight={"$bold"}
                            color={mode === "dark" ? "white" : "black"}
                          >
                            Belum ada data transaksi
                          </Text>
                          <Text size="xs" color={"#94979C"}>
                            Jika Anda sudah memiliki transaksi, transaksi
                            tersebut akan
                          </Text>
                          <Text size="xs" color={"#94979C"}>
                            muncul disini.
                          </Text>
                        </Center>
                      </Box>
                    ) : (
                      <Box>
                        <Text size="xs" color={"#94979C"} mb={10} ontFamily="Lato" fontWeight={"$semibold"}>
                          Minggu, 20 Okt 2024
                        </Text>

                        <TouchableOpacity
                          onPress={() => router.push("/detailTransaksi")}
                        >
                          <Box
                            borderRadius={10}
                            borderWidth={1}
                            borderColor="#373A41"
                          >
                            <HStack justifyContent="space-between" m={10}>
                              <HStack space="md">
                                <Box
                                  borderRadius={10}
                                  backgroundColor="#22262F"
                                >
                                  <MaterialCommunityIcons
                                    name="text-box-outline"
                                    size={30}
                                    color="white"
                                    style={{ margin: 8 }}
                                  />
                                </Box>
                                <VStack space="sm">
                                  <Text
                                    fontSize={16}
                                    fontFamily="Lato" fontWeight={"$bold"}
                                    color={mode === "dark" ? "white" : "black"}
                                  >
                                    Pembayaran Tagihan
                                  </Text>
                                  <Text fontSize={14}
                                    fontFamily="Lato" fontWeight={"$bold"}>20 Oct 2024 | 13.40</Text>
                                </VStack>
                              </HStack>
                              <VStack space="sm">
                                <Text fontFamily="Lato" fontWeight={"$bold"} color={mode === "dark" ? "white" : "black"} fontSize={16}>- Rp. 10.000</Text>
                               
                                <CustomBadge variant="danger2" label="Dana Keluar" />
                              </VStack>
                            </HStack>
                          </Box>
                        </TouchableOpacity>
                      </Box>
                    )}
                  </VStack>
                </VStack>
              </ImageBackground>
            </Box>
          </VStack>
        </SafeAreaView>
      </ScrollView>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ScrollView>
          <ActionsheetContent
            h="90%"
            zIndex={999}
            backgroundColor={mode === "dark" ? "black" : "white"}
          >
            <ActionsheetItem>
              <HStack justifyContent="space-between" mt={10} width={"100%"}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontWeight={"$bold"}
                  size="lg"
                  mt={2}
                >
                  Filter Transaksi
                </Text>
                <MaterialCommunityIcons
                  name="close"
                  size={30}
                  color={mode === "dark" ? "white" : "black"}
                />
              </HStack>
            </ActionsheetItem>
            <ActionsheetItem>
              <Text color={mode === "dark" ? "white" : "black"}>
                Berdasarkan Waktu
              </Text>
            </ActionsheetItem>
            <ActionsheetItem>
              <HStack space="md">
                <Text color={mode === "dark" ? "white" : "black"}>
                  7 Hari Terakhir
                </Text>
                <Switch
                  sx={{
                    _light: {
                      props: {
                        trackColor: {
                          false: "$backgroundLight300",
                          true: "$emerald600",
                        },
                      },
                    },
                    _dark: {
                      props: {
                        trackColor: {
                          false: "$backgroundDark700",
                          true: "$emerald600",
                        },
                      },
                    },
                  }}
                />
              </HStack>
            </ActionsheetItem>
            <ActionsheetItem isDisabled>
              <HStack space="md">
                <Text color={mode === "dark" ? "white" : "black"}>
                  Bulan Ini
                </Text>
                <Switch
                  sx={{
                    _light: {
                      props: {
                        trackColor: {
                          false: "$backgroundLight300",
                          true: "$emerald600",
                        },
                      },
                    },
                    _dark: {
                      props: {
                        trackColor: {
                          false: "$backgroundDark700",
                          true: "$emerald600",
                        },
                      },
                    },
                  }}
                />
              </HStack>
            </ActionsheetItem>
            <ActionsheetItem>
              <HStack justifyContent="space-between" width={"100%"}>
                <Text>Pilih Tanggal</Text>
                <RadioGroup>
                  <Radio
                    value="change"
                    size="md"
                    isInvalid={false}
                    isDisabled={false}
                    onChange={(value) => setChooseDate(value)}
                  >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
            </ActionsheetItem>
            <Divider mt={10} bgColor="#373A41" />
            <ActionsheetItem>
              <VStack>
                <Text color={mode === "dark" ? "white" : "black"}>
                  Tipe Transaksi
                </Text>
              </VStack>
            </ActionsheetItem>
            <ActionsheetItem>
              <HStack space="md">
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={12}
                  backgroundColor={mode === "dark" ? "#373A41" : "#D5D7DA"}
                >
                  <HStack space="sm" m={4}>
                    <MaterialCommunityIcons
                      name="text-box-outline"
                      size={25}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <Text color={mode === "dark" ? "white" : "black"}>
                      Pembayaran Tagihan
                    </Text>
                  </HStack>
                </Badge>
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={12}
                  backgroundColor={mode === "dark" ? "#373A41" : "#D5D7DA"}
                >
                  <HStack space="sm" m={4}>
                    <FontAwesome5
                      name="hand-holding-medical"
                      size={20}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <Text color={mode === "dark" ? "white" : "black"}>
                      Top Up
                    </Text>
                  </HStack>
                </Badge>
              </HStack>
            </ActionsheetItem>
            <ActionsheetItem>
              <Badge
                size="md"
                variant="solid"
                borderRadius={12}
                backgroundColor={mode === "dark" ? "#373A41" : "#D5D7DA"}
              >
                <HStack space="sm" m={4}>
                  <MaterialIcons
                    name="payment"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Pengeluaran
                  </Text>
                </HStack>
              </Badge>
            </ActionsheetItem>
            <Divider mt={10} bgColor="#373A41" />
            <ActionsheetItem>
              <Text color={mode === "dark" ? "white" : "black"}>
                Status Transaksi
              </Text>
            </ActionsheetItem>

            <ActionsheetItem>
              <HStack justifyContent="space-between" width={"100%"}>
                <Text color={mode === "dark" ? "white" : "black"}>
                  Dana Keluar
                </Text>
                <Checkbox
                  value=""
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
              </HStack>
            </ActionsheetItem>

            <ActionsheetItem>
              <HStack justifyContent="space-between" width={"100%"}>
                <Text color={mode === "dark" ? "white" : "black"}>
                  Dana Masuk
                </Text>
                <Checkbox
                  value=""
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
              </HStack>
            </ActionsheetItem>

            <ActionsheetItem>
              <HStack justifyContent="space-between" width={"100%"}>
                <Text color={mode === "dark" ? "white" : "black"}>
                  Dibatalkan
                </Text>
                <Checkbox
                  value=""
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
              </HStack>
            </ActionsheetItem>
            <Divider mt={10} bgColor="#373A41" />

            <ActionsheetItem>
              <HStack justifyContent="space-between" width={"100%"}>
                <Text color={mode === "dark" ? "white" : "black"} mt={8}>
                  Hapus Filter
                </Text>

                <Button
                  size="md"
                  variant="solid"
                  backgroundColor={colors.primary}
                  isDisabled={false}
                  isFocusVisible={false}
                  borderRadius={10}
                >
                  <Text color={"white"}>Gunakan Filter</Text>
                </Button>
              </HStack>
            </ActionsheetItem>
          </ActionsheetContent>
        </ScrollView>
      </Actionsheet>
    </>
  );
};

export default Saldo;
