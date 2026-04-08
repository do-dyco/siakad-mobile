import CustomBadge from "@/components/CustomBadge";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
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
  AccordionTitleText,
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  AccordionContentText,
  Button,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { useTagihanStore, DetailTagihanItem } from "@/src/store/tagihanStore";

const DetailTagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const { from, activeTab, id } = useLocalSearchParams();
  const { detailItem } = useTagihanStore();
  const [dataInvoice, setDataInvoice] = useState<DetailTagihanItem | null>(
    null,
  );

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  console.log("inv", dataInvoice);

  // Ambil data dari store
  useEffect(() => {
    // Reset dulu untuk force re-render
    setDataInvoice(null);

    // Set data dari store
    if (detailItem) {
      setDataInvoice({ ...detailItem });
    } else {
      setDataInvoice(null);
    }
  }, [detailItem, id]);

  const handleNext = () => {
    console.log("=== HANDLE NEXT CLICKED ===");
    console.log("dataInvoice:", dataInvoice);
    console.log("dataInvoice.no_invoice:", dataInvoice?.no_invoice);
    console.log("dataInvoice.status:", dataInvoice?.status);
    console.log("from:", from);
    console.log("activeTab:", activeTab);

    if (!dataInvoice?.no_invoice) {
      console.error("no_invoice is null/undefined");
      return;
    }

    const params = {
      invoice: dataInvoice.no_invoice,
      from: from || "/tagihan",
      activeTab: activeTab || "1",
    };

    console.log("Navigating with params:", params);

    if (dataInvoice.status === "PAID") {
      console.log("Status is PAID, going to /bayarInvoice");
      router.push({
        pathname: "/bayarInvoice",
        params,
      });
      return;
    }

    console.log("Status is NOT PAID, going to /metodeBayar");
    router.push({
      pathname: "/metodeBayar",
      params,
    });
  };

  // Tampilkan loading jika data belum tersedia
  if (!dataInvoice) {
    return (
      <SafeAreaView
        flex={1}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data="Detail Transaksi" backTo={from} activeTab={activeTab} />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color={mode === "dark" ? "white" : "black"}>
            Memuat data...
          </Text>
        </Box>
      </SafeAreaView>
    );
  }

  // Parse expire_at untuk tanggal dan waktu
  const [tanggal, waktu] = dataInvoice.expire_at?.split(" ") ?? ["-", "-"];

  return (
    <SafeAreaView
      flex={1}
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        {/* Header dengan tab support */}
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

                <CustomBadge variant="danger" label={waktu} />
              </HStack>
              <Text
                color={mode == "dark" ? "white" : "black"}
                fontSize={12}
                fontFamily="Lato"
              >
                {tanggal}
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
            defaultIsOpen={true}
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
                              Tagihan {dataInvoice?.no_tagihan}
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
                        {dataInvoice.master_tagihan?.nama ?? "-"}
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
                        {tanggal}
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
                        {waktu}
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
                        Rp. {formatRupiah(dataInvoice.nominal ?? 0)}
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
      <VStack mt={10} mx={10} mb={40}>
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
