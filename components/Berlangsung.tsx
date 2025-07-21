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
import NoData from "./NoData";
import { useTagihanStore } from "@/src/store/tagihanStore";

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
  const { setSelectedTagihan } = useTagihanStore();

  console.log("cek", checkedValue);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const handleCheckboxChange = (value: string) => {
    setCheckedValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const selectedData = data.filter((item) => checkedValue.includes(item.id));
    setSelectedTagihan(selectedData);
    router.push("/detailTagihan");
  };

  if (data.length === 0) {
    return (
      <NoData
        title="Belum ada tagihan"
        desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
      />
    );
  }

  return (
    <>
      <ScrollView flex={1}>
        <VStack m={10} mt={20}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const [tanggal, jam] = item.expire_at.split(" ");

              return (
                <Box
                  borderWidth={1}
                  borderRadius={10}
                  borderColor={
                    mode === "dark" ? colors.border : colors.gray.light[200]
                  }
                  mb={20}
                >
                  <Box
                    borderTopRightRadius={10}
                    borderTopLeftRadius={10}
                    bgColor={
                      mode === "light" ? colors.gray.light[200] : colors.box
                    }
                  >
                    <HStack justifyContent="space-between" m={10}>
                      <HStack space="md">
                        <Checkbox
                          size="md"
                          value={item.id}
                          onChange={() => handleCheckboxChange(item.id)}
                          isChecked={checkedValue.includes(item.id)}
                        >
                          <CheckboxIndicator
                            mr="$2"
                            backgroundColor={
                              checkedValue.includes(item.id)
                                ? colors.primary
                                : "transparent"
                            }
                            borderColor="$gray300"
                          >
                            <CheckboxIcon
                              as={CheckIcon}
                              color={
                                checkedValue.includes(item.id)
                                  ? "white"
                                  : "transparent"
                              }
                            />
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
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          Tagihan
                        </Text>
                      </HStack>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        {item.no_tagihan}
                      </Text>
                    </HStack>
                  </Box>

                  <HStack justifyContent="space-between" mt={10} m={10}>
                    <VStack space="md">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Bayar Sebelum
                      </Text>
                      <Text
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        {tanggal}
                      </Text>
                    </VStack>
                    <CustomBadge variant="danger" label={jam} />
                  </HStack>

                  <DashedDivider />

                  <VStack mx={10} mt={10} mb={10}>
                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Nama Tagihan
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        {item.master_tagihan?.nama ?? "-"}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between" mt={10}>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Nominal Tertagih
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Rp {formatRupiah(item.nominal)}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </VStack>
      </ScrollView>

      <Button
        bgColor={colors.primary}
        borderRadius={10}
        mt={4}
        mx={10}
        onPress={handleSubmit}
      >
        <Text color="white">Bayar {checkedValue.length} Tagihan</Text>
      </Button>
    </>
  );
};

export default Berlangsung;
