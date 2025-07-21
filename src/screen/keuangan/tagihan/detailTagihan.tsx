import Header from "@/components/Header";
import colors from "@/src/config/colors";
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
  AccordionTitleText,
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  AccordionContentText,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const DetailInvoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const { selectedTagihan } = useTagihanStore();
  const totalNominal = selectedTagihan.reduce((total, item) => {
    return total + item.nominal;
  }, 0);

  const generateInvoiceNumber = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000);

    return `INV/${year}${month}${day}${random}`;
  };

  const handleNext = () => {
    router.push({
      pathname: "/metodeBayar",
      params: { invoice: generateInvoiceNumber() },
    });
  };

  return (
    <SafeAreaView
      flex={1}
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Transaksi"} />
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
              Rp. {new Intl.NumberFormat("id-ID").format(totalNominal)}
            </Text>
            <Text
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              {generateInvoiceNumber()}
            </Text>
          </HStack>

          <HStack justifyContent="space-between"></HStack>
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
            type="multiple" // gunakan multiple jika ingin banyak accordion terbuka
            isCollapsible={true}
          >
            {selectedTagihan.map((item, index) => {
              const [tanggal, waktu] = item.expire_at.split(" ");
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
        >
          <Text color="white">Selanjutnya</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailInvoice;
