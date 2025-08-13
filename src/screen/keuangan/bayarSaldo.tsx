import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import {
  Entypo,
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Box,
  HStack,
  Badge,
  Center,
  Image,
  Divider,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  ButtonText,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
  Input,
  InputField,
  InputSlot,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionIcon,
  AccordionTrigger,
  AccordionHeader,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";
import CustomActionSheet from "@/components/CustomActionSheet";
import { useTagihanStore } from "@/src/store/tagihanStore";

const BayarSaldo = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [password, setPassword] = useState("");
  const toggleActionsheet = () => setShowActionsheet(!showActionsheet);
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const toast = useToast();
  const { nominal, no_invoice } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const [dataInvoice, setDataInvoice] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setShowActionsheet(false);
  const rawAmount =
    (nominal && nominal !== "0" ? nominal : dataInvoice.nominal) || "0";
  const amount = rawAmount.toString().replace(/\D/g, "").padStart(4, "0");
  const mainPart = amount.slice(0, -3);
  const lastThree = amount.slice(-3);
  const textColor = mode === "dark" ? "white" : "black";
  const bgColor = mode === "dark" ? "black" : "white";

  console.log("Nominal:", dataInvoice);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(no_invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
    }
  };

  const params = {
    invoiceId: dataInvoice.id,
    metode: "saldo",
    // rekeningSekolahId: dataInvoice.id,
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    try {
      const response = apiService.payment(params);
      router.push({
        pathname: "/statusTransaksi",
        params: {
          nominal: nominal,
          no_invoice: dataInvoice.no_invoice,
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal mengirim data");
    } finally {
      setLoading(false);
    }
  };

  if (!dataInvoice || Object.keys(dataInvoice).length === 0) {
    return (
      <SafeAreaView flex={1} justifyContent="center" alignItems="center">
        <Text>Memuat data...</Text>
      </SafeAreaView>
    );
  }
  return (
    <>
      <SafeAreaView flex={1} mb={35}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          backgroundColor={mode === "dark" ? "black" : "white"}
          height={screenHeight}
        >
          <Header data={"Transfer Sekarang"} />
          <VStack space="md" flex={1} m={10}>
            <Text fontFamily="Lato" color={textColor} size="lg">
              Transfer Bank
            </Text>
            <Text fontFamily="Lato" color={textColor}>
              Please Transfer to AL-FUADIYAH Bank Account
            </Text>

            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
            >
              <VStack space="md" m={10}>
                <HStack space="md">
                  <Entypo name="wallet" size={20} color={colors.primary} />
                  <Text color={textColor} fontFamily="Lato">
                    Saldo
                  </Text>
                </HStack>

                <VStack>
                  <Text fontFamily="Lato" color={textColor}>
                    Jumlah Pembayaran
                  </Text>
                </VStack>

                <Box
                  borderWidth={1}
                  borderRadius={16}
                  borderColor="transparent"
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    m={5}
                  >
                    <HStack spacing={0} alignItems="center">
                      <Text fontFamily="Lato" fontSize="$md" color={textColor}>
                        Rp. {formatRupiah(Number(dataInvoice?.nominal) || 0)}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              </VStack>
            </Box>

            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]
              }
            >
              <VStack m={10} space="md">
                <Text
                  fontFamily="Lato"
                  color={textColor}
                  fontWeight={"$semibold"}
                >
                  Masukkan Kata Sandi
                </Text>
                <Text fontFamily="Lato" color={textColor} size="xs">
                  Untuk memproses transaksi ini silakan masukkan kata sandi
                  Anda.
                </Text>

                <Input borderRadius={12}>
                  <InputField
                    placeholder="Kata sandi"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <InputSlot mx={10}>
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Entypo
                        name={showPassword ? "eye" : "eye-with-line"}
                        size={25}
                        color="#535862"
                      />
                    </Pressable>
                  </InputSlot>
                </Input>

                <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                  <Box
                    mt={50}
                    borderRadius={10}
                    bgColor={
                      mode === "dark"
                        ? colors.gray.dark[800]
                        : colors.gray.light[50]
                    }
                    style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 6,
                      elevation: 6,
                      backgroundColor:
                        mode === "dark"
                          ? colors.gray.dark[800]
                          : colors.gray.light[50],
                    }}
                  >
                    <HStack justifyContent="space-between" m={10}>
                      <HStack space="md">
                        <MaterialCommunityIcons
                          name="text-box-outline"
                          size={20}
                          color={textColor}
                        />
                        <Text color={textColor} fontFamily="Lato">
                          Detail Transaksi
                        </Text>
                      </HStack>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={20}
                        color={textColor}
                      />
                    </HStack>
                  </Box>
                </TouchableOpacity>

                {/* Bantuan */}
                <Box
                  borderRadius={10}
                  mt={10}
                  bgColor={
                    mode === "dark"
                      ? colors.gray.dark[800]
                      : colors.gray.light[50]
                  }
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3, // untuk Android
                  }}
                >
                  <HStack justifyContent="space-between" m={10}>
                    <HStack space="md">
                      <MaterialCommunityIcons
                        name="help-circle-outline"
                        size={20}
                        color={textColor}
                      />
                      <Text color={textColor} fontFamily="Lato">
                        Butuh Bantuan ?
                      </Text>
                    </HStack>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color={textColor}
                    />
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>

        <Box bgColor={bgColor}>
          <VStack space="md" m={10}>
            <Center>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text
                  fontFamily="Lato"
                  fontWeight={"$bold"}
                  color={colors.primary}
                >
                  Batalkan Transaksi
                </Text>
              </TouchableOpacity>
            </Center>
            <Divider
              bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
            />
            <Button
              bgColor={colors.primary}
              borderRadius={10}
              mt={4}
              onPress={handleSubmit}
            >
              <Text fontFamily="Lato" color="white">
                Bayar Sekarang
              </Text>
            </Button>
          </VStack>
        </Box>
      </SafeAreaView>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg" color={textColor} fontFamily="Lato">
              Batalkan Transaksi?
            </Heading>
            <MaterialCommunityIcons name="close" size={25} color="#94979C" />
          </ModalHeader>
          <ModalBody>
            <Text fontFamily="Lato" color={textColor} size="xs">
              Jika Anda telah mentransfer uang, silakan hubungi admin untuk
              melakukan pengembalian uang.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => setShowModal(false)}
            >
              <Text fontFamily="Lato" color={textColor}>
                Ya, Batalkan
              </Text>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => setShowModal(false)}
              bgColor={colors.primary}
            >
              <ButtonText fontFamily="Lato">Tidak, kembali</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CustomActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bgColor={
          mode === "dark" ? colors.gray.dark[900] : colors.gray.light[100]
        }
      >
        <HStack justifyContent="space-between" mt={10} width="100%" px={16}>
          <Text
            color={textColor}
            fontWeight="$bold"
            size="lg"
            fontFamily="Lato"
          >
            Detail Transaksi
          </Text>
          <Badge
            size="md"
            variant="solid"
            borderRadius={12}
            bgColor={
              mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]
            }
            width="40%"
          >
            <HStack space="xs">
              <Text
                color={mode === "dark" ? "white" : "black"}
                size="xs"
                fontWeight={"$bold"}
                fontFamily="Lato"
              >
                {dataInvoice?.no_invoice || "-"}
              </Text>
              <Ionicons name="copy-outline" size={20} color="#373A41" />
            </HStack>
          </Badge>
        </HStack>

        <Divider mt={10} bgColor={colors.border} />

        <Box
          borderRadius={10}
          bgColor={
            mode === "dark" ? colors.gray.dark[800] : colors.gray.light[50]
          }
          m={10}
          w="100%"
        >
          <HStack space="md" m={5}>
            <Box backgroundColor={colors.boxWarning} borderRadius={8} mt={10}>
              <MaterialIcons
                name="person-outline"
                size={24}
                color="white"
                style={{ margin: 5 }}
              />
            </Box>
            <Text
              mt={18}
              color={textColor}
              fontFamily="Lato"
              fontSize={16}
              fontWeight="$semibold"
            >
              {dataInvoice?.no_invoice || "-"}
            </Text>
          </HStack>
          <Divider
            bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
            mt={5}
          />
          <HStack justifyContent="space-between" m={10}>
            <Text fontFamily="Lato">Pembayaran</Text>
            <Text color={textColor} fontFamily="Lato">
              Saldo
            </Text>
          </HStack>
          <HStack justifyContent="space-between" m={10}>
            <Text fontFamily="Lato">Total Transfer</Text>
            <Text color={textColor} fontFamily="Lato">
              Rp. {formatRupiah(Number(dataInvoice?.nominal) || 0)}
            </Text>
          </HStack>
        </Box>

        <Divider bgColor={colors.border} mt={10} />

        <VStack space="xs" px={10}>
          <Text color={mode == "dark" ? "white" : "black"} mt={10}>
            Tagihan
          </Text>

          <Accordion
            width="100%"
            size="md"
            bgColor={mode === "dark" ? colors.box : "white"}
            type="multiple"
            isCollapsible={true}
          >
            <AccordionItem
              value="a"
              backgroundColor={mode === "dark" ? "#22262F" : "white"}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      <HStack justifyContent="space-between" mx={2}>
                        <HStack space="md">
                          <Box
                            borderWidth={1}
                            borderRadius={6}
                            borderColor={
                              mode === "dark"
                                ? colors.border
                                : colors.gray.light[200]
                            }
                            justifyContent="center"
                            alignContent="center"
                            backgroundColor={colors.boxWarning}
                            height={20}
                            width={20}
                          >
                            <MaterialCommunityIcons
                              name="text-box-outline"
                              size={16}
                              color={"white"}
                            />
                          </Box>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Tagihan {dataInvoice?.no_tagihan}
                          </Text>
                        </HStack>
                      </HStack>
                      <AccordionIcon
                        as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                        ml="$3"
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>

              <AccordionContent>
                <Box
                  borderWidth={1}
                  borderRadius={6}
                  borderColor={
                    mode === "dark" ? colors.border : colors.gray.light[200]
                  }
                  backgroundColor={mode === "dark" ? "black" : "white"}
                >
                  <VStack m={10} space="md">
                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Nama Tagihan
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {dataInvoice?.tagihan_users[0]?.master_tagihan?.nama ??
                          "-"}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Tanggal
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {new Date(
                          dataInvoice?.tagihan_users?.[0]?.updated_at?.split(
                            " "
                          )[0]
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Waktu
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {dataInvoice?.tagihan_users?.[0]?.updated_at
                          ?.split(" ")[1]
                          ?.slice(0, 5)}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Nominal Tertagih
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          dataInvoice?.nominal
                        )}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </VStack>
      </CustomActionSheet>
    </>
  );
};

export default BayarSaldo;
