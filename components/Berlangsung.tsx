import DashedDivider from "@/components/dashedDivider";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  VStack,
  Box,
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Text,
  Badge,
  Button,
  FlatList,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import CustomBadge from "./CustomBadge";

type ItemType = {
  id: string;
  no_tagihan: string;
  no_invoice: string;
  tagihan_name: string;
  total: string;
};

const Berlangsung = (props: any) => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const data: ItemType[] = props.data;
  const [checkedValue, setCheckedValue] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    setCheckedValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <ScrollView flex={1}>
        <VStack m={10} mt={20}>
          <FlatList
            data={data}
            renderItem={({ item }: any) => (
              <Box
                borderWidth={1}
                borderRadius={10}
                borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}
                mb={20}
              >
                <Box
                  borderTopRightRadius={10}
                  borderTopLeftRadius={10}
                  bgColor={mode === 'light' ? colors.gray.light[200] : colors.box}
                >
                  <HStack justifyContent="space-between" m={10}>
                    <HStack space="md">
                      <Checkbox
                        size="md"
                        isInvalid={false}
                        isDisabled={false}
                        value={item.id} // Use item.id here for individual checkbox
                        onChange={() => handleCheckboxChange(item.id)} // Handle item id
                      >
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                      </Checkbox>
                      <Box
                        borderRadius={8}
                        borderWidth={1}
                        borderColor="transparent"
                        bgColor={colors.boxWarning}
                        height={25}
                        width={25}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MaterialCommunityIcons
                          name="text-box-outline"
                          size={20}
                          color={"white"}
                        />
                      </Box>
                      <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                        Tagihan
                      </Text>
                    </HStack>
                    <Text color={mode === "dark" ? "white" : "black"}  fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      {item.no_tagihan}
                    </Text>
                  </HStack>
                </Box>

                <HStack justifyContent="space-between" mt={10} m={10}>
                  <VStack space="md">
                    <Text color={mode === "dark" ? "white" : "black"}  fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Bayar Sebelum
                    </Text>
                    <Text fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>{item.no_invoice} 16:49</Text>
                  </VStack>
                  <CustomBadge variant="danger" label="05:59:49 " />
                </HStack>
                <DashedDivider />
                <VStack mx={10} mt={10} mb={10}>
                  <HStack justifyContent="space-between">
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Nama Tagihan
                    </Text>
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      {item.tagihan_name}
                    </Text>
                  </HStack>

                  <HStack justifyContent="space-between" mt={10}>
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Nominal Tertagih
                    </Text>
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Rp.{item.total}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </VStack>
      </ScrollView>
      <Button
        bgColor={colors.primary}
        borderRadius={10}
        mt={4}
        onPress={() => router.push("/detailTagihan")}
      >
        <Text color="white">Bayar {checkedValue.length} Tagihan</Text>
      </Button>
    </>
  );
};

export default Berlangsung;
