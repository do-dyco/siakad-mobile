import Header from "@/components/Header";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  ChevronDownIcon,
  HStack,
  Icon,
  Input,
  InputField,
  InputSlot,
  SafeAreaView,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const JadwalPelajaran = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState("1");
  const item = [
    {
      mapel: "Matematika",
      nilai: "87",
    },
    {
      mapel: "Pendidikan Pancasila dan Kewarganegaraan",
      nilai: "96",
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data="Jadwal Pelajaran" />
        <VStack space="md" mx={10}>
          <HStack space="md" mx={10}>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              borderRadius={8}
              mt={10}
              width={"70%"}
            >
              <InputField placeholder="Pilih Tahun" />
              <InputSlot mr={10}>
                <MaterialCommunityIcons
                  name="calendar-outline"
                  size={25}
                  color={"#535862"}
                />
              </InputSlot>
            </Input>

            <Select width={"30%"} mt={10}>
              <SelectTrigger variant="outline" size="md" borderRadius={8}>
                <SelectInput />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} style={{ marginRight: 3 }} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Ganjil" value="ganjil" />
                  <SelectItem label="Genap" value="genap" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </HStack>

          {!data ? (
            <NoData
              title="Belum ada jadwal pelajaran"
              desc="Jika Anda sudah memiliki jadwal pelajaran, jadwal pelajaran tersebut akan muncul disini"
              icon={
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={40}
                  color={mode === "dark" ? "white" : "black"}
                />
              }
            />
          ) : (
            <VStack space="md">
              <Box
                ml={"-5%"}
                width={"120%"}
                backgroundColor={mode === "dark" ? colors.box : "white"}
              >
                <VStack mx={20} space="md">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Nilai Rata - Rata
                  </Text>

                  <ScrollView horizontal={true}>
                    {item.map((data, index) => (
                      <Box
                        key={index}
                        borderWidth={1}
                        borderColor="transparent"
                        borderRadius={10}
                        backgroundColor={mode === "dark" ? "black" : "white"}
                        mb={20}
                        mr={10}
                      >
                        <VStack space="md" mx={10} mt={10}>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {data.mapel}
                          </Text>
                          <Text
                            size="3xl"
                            fontWeight={"$bold"}
                            color={colors.primary}
                          >
                            {data.nilai} <Text>dari 100</Text>
                          </Text>
                        </VStack>
                      </Box>
                    ))}
                  </ScrollView>
                </VStack>
              </Box>

              <Text color={mode === "dark" ? "white" : "black"}>
                Jadwal Pelajaran
              </Text>
              <Text>Kelas 12 . IPA - 1</Text>
            </VStack>
          )}
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default JadwalPelajaran;
