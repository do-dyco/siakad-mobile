import tagihan from "@/app/tagihan";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useTagihanStore } from "@/src/store/tagihanStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  Button,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

type TagihanUser = {
  id: string;
  no_tagihan: string;
  expire_at: string;
  nominal: number;
  master_tagihan?: { nama?: string };
};

type InvoiceTagihan = {
  id?: string;
  no_invoice?: string;
  nominal?: number;
  status?: "PAID" | "UNPAID" | string;
  tagihan_users?: TagihanUser[];
};

const DetailInvoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const { selectedTagihan } = useTagihanStore();
  const { no_invoice } = useLocalSearchParams<{ no_invoice?: string }>();

  const [tagihanData, setTagihanData] = useState<InvoiceTagihan>({});
  const [loadingCreate, setLoadingCreate] = useState(false);

  console.log("Selected Tagihan:", tagihanData);

  const fetchDetail = async (invNo: string) => {
    try {
      const response = await apiService.myInvoiceDetail(invNo);
      const inv: InvoiceTagihan = response?.data?.invoice_tagihan ?? {};
      setTagihanData(inv);
    } catch (error) {
      setTagihanData({});
      console.error("Failed to load:", error);
    }
  };

  const handleNext = async () => {
    // Pastikan sudah ada nomor invoice; kalau belum, buat dulu
    let invNo = tagihanData?.no_invoice;
    if (!invNo) {
      const created = await createInvoice();
      invNo = created?.no_invoice;
      if (!invNo) {
        console.warn("Invoice belum siap / gagal dibuat");
        return;
      }
    }

    router.push({
      pathname: "/metodeBayar",
      params: { invoice: invNo },
    });
  };

  useEffect(() => {
    if (typeof no_invoice === "string" && no_invoice.trim().length > 0) {
      fetchDetail(no_invoice);
      return;
    }
    if ((selectedTagihan || []).length > 0) {
      createInvoice();
      return;
    }
    console.warn("Tidak ada invoice / tagihan terpilih");
  }, []);

  return (
    <SafeAreaView
      flex={1}
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Tagihan"} />
        <VStack space="md" mx={10}>
          <HStack justifyContent="space-between">
            <Text>Jumlah Tagihan</Text>
            <Text>Invoice ID</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text
              fontSize={16}
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(tagihanData?.nominal || 0)}
            </Text>
            <Text
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              {tagihanData?.no_invoice ||
                (loadingCreate ? "Membuat invoice..." : "—")}
            </Text>
          </HStack>

          <Divider
            bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
          />

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
            {(tagihanData?.tagihan_users ?? []).map((item) => {
              const [tanggal = "-", waktu = "-"] = (
                item?.expire_at ?? ""
              ).split(" ");
              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
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
                                Tagihan {item.no_tagihan}
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
                            {item.master_tagihan?.nama ?? "-"}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Tanggal
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {tanggal}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Waktu
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {waktu}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Nominal Tertagih
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Rp{" "}
                            {new Intl.NumberFormat("id-ID").format(
                              item.nominal
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
      </ScrollView>

      <Divider
        bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
      />
      <VStack mt={10} mx={10} mb={20}>
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          mt={4}
          onPress={handleNext}
          isDisabled={loadingCreate || tagihanData?.status === "PAID"}
        >
          <Text color="white">
            {loadingCreate ? "Memproses..." : "Selanjutnya"}
          </Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailInvoice;
