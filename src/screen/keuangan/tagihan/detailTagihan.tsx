import CustomBadge from "@/components/CustomBadge";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Box, Button, ChevronDownIcon, ChevronUpIcon, Divider, HStack, SafeAreaView, ScrollView, Text, VStack } from '@gluestack-ui/themed';


const DetailTagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const { noInvoice, from, activeTab } = useLocalSearchParams();
  const [dataInvoice, setDataInvoice] = useState({});

  console.log("Params:", { activeTab, from });
  

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(noInvoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
    }
  };

  const handleNext = () => {
    if (!dataInvoice?.no_invoice) {
      console.warn("Invoice belum siap");
      return;
    }

    if (dataInvoice.status === "PAID") {
      router.push({
        pathname: "/bayarInvoice",
        params: {  
          invoice: dataInvoice.no_invoice, 
          from: from,
          activeTab: activeTab, },
      });
      return;
    }

    router.push({
      pathname: "/metodeBayar",
      params: { 
        invoice: dataInvoice.no_invoice, 
        from: from,
        activeTab: activeTab,
      },
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <SafeAreaView
      flex={1}
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        {/* Header dengan tab support - tidak perlu custom onBack lagi */}
        <Header data="Detail Transaksi" backTo={from} activeTab={activeTab} />
        
        <VStack space="md" mx={10}>
          <HStack justifyContent="space-between">
            <Text
              color={colors.gray.light[400]}
              fontSize={14}
              fontFamily="Lato"
              fontWeight={"$semibold"}
            >
              Jumlah Tagihan
            </Text>
            <Text
              color={colors.gray.light[400]}
              fontSize={14}
              fontFamily="Lato"
              fontWeight={"$semibold"}
            >
              Invoice ID
            </Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text
              fontSize={16}
              fontWeight={"$bold"}
              fontFamily="Lato"
              color={mode == "dark" ? "white" : "black"}
            >
              Rp. {formatRupiah(dataInvoice.nominal)}
            </Text>
            <Text
              fontWeight={"$bold"}
              fontFamily="Lato"
              color={mode == "dark" ? "white" : "black"}
            >
              {dataInvoice.no_invoice}
            </Text>
          </HStack>

          <HStack justifyContent="space-between">
            <VStack space="md">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Text
                  color={mode == "dark" ? "white" : "black"}
                  fontSize={14}
                  fontFamily="Lato"
                  fontWeight={"$semibold"}
                >
                  Bayar Sebelum
                </Text>

                <CustomBadge variant="danger" label="05:59:49 " />
              </HStack>
              <Text
                color={mode == "dark" ? "white" : "black"}
                fontSize={12}
                fontFamily="Lato"
              >
                {dataInvoice.created_at}
              </Text>
            </VStack>
          </HStack>
          <Divider bgColor={colors.border} />

          <Text
            color={mode == "dark" ? "white" : "black"}
            fontFamily="Lato"
            fontSize={14}
            mt={10}
            fontWeight={"$semibold"}
          >
            Tagihan
          </Text>

          <Accordion
            width="100%"
            size="md"
            bgColor={mode === "dark" ? colors.box : "white"}
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >
            <AccordionItem
              value="a"
              backgroundColor={mode === "dark" ? "#22262F" : "white"}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <HStack justifyContent="space-between" mx={2}>
                          <HStack space="md">
                            <Box
                              borderWidth={1}
                              borderRadius={6}
                              borderColor={colors.border}
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

                            <Text
                              color={mode === "dark" ? "white" : "black"}
                              fontFamily="Lato"
                              fontSize={14}
                              fontWeight={"$semibold"}
                            >
                              Tagihan{" "}
                              {dataInvoice?.tagihan_users?.[0]?.no_tagihan}
                            </Text>
                          </HStack>
                        </HStack>
                        {isExpanded ? (
                          <AccordionIcon
                            as={ChevronUpIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box
                  borderWidth={1}
                  borderRadius={8}
                  borderColor={
                    mode === "dark" ? colors.border : colors.gray.light[200]
                  }
                  backgroundColor={mode === "dark" ? "black" : "white"}
                >
                  <VStack m={10} space="md">
                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Nama Tagihan
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        {dataInvoice?.tagihan_users?.[0]?.master_tagihan?.nama}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Tanggal
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
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
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Waktu
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        {dataInvoice?.tagihan_users?.[0]?.updated_at
                          ?.split(" ")[1]
                          ?.slice(0, 5)}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Nominal Tertagih
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        Rp.{" "}
                        {formatRupiah(
                          dataInvoice?.tagihan_users?.[0]?.nominal ?? 0
                        )}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </VStack>
      </ScrollView>
      <Divider bgColor={"transparent"} />
      <VStack mt={10} mx={10} mb={20}>
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          mt={4}
          onPress={handleNext}
        >
          <Text color="white" fontFamily="Lato" fontSize={16}>
            Bayar Invoice
          </Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailTagihan;