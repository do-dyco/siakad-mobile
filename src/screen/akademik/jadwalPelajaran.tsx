import DashedDivider from "@/components/dashedDivider";
import DashedVertical from "@/components/dashedVertikal";
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
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Touchable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const JadwalPelajaran = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState(true); // Mengubah menjadi boolean untuk mencerminkan apakah ada data
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

  const data_mapel = [
    {
      day: "senin",
      mata_pelajaran: [
        { nama: "Matematika", waktu: "08:00 - 09:00" },
        { nama: "Bahasa Indonesia", waktu: "09:15 - 10:15" },
        { nama: "IPA", waktu: "10:30 - 11:30" },
      ],
    },
    {
      day: "selasa",
      mata_pelajaran: [
        { nama: "Bahasa Inggris", waktu: "08:00 - 09:00" },
        { nama: "IPS", waktu: "09:15 - 10:15" },
        { nama: "PJOK", waktu: "10:30 - 11:30" },
      ],
    },
    {
      day: "rabu",
      mata_pelajaran: [
        { nama: "Matematika", waktu: "08:00 - 09:00" },
        { nama: "IPA", waktu: "09:15 - 10:15" },
        { nama: "Bahasa Indonesia", waktu: "10:30 - 11:30" },
      ],
    },
    {
      day: "kamis",
      mata_pelajaran: [
        { nama: "IPS", waktu: "08:00 - 09:00" },
        { nama: "Bahasa Inggris", waktu: "09:15 - 10:15" },
        { nama: "Seni Budaya", waktu: "10:30 - 11:30" },
      ],
    },
    {
      day: "jumat",
      mata_pelajaran: [
        { nama: "Pendidikan Agama", waktu: "08:00 - 09:00" },
        { nama: "PJOK", waktu: "09:15 - 10:15" },
        { nama: "Matematika", waktu: "10:30 - 11:30" },
      ],
    },
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
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

                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
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

              {data_mapel.map((data, index) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Text
                      fontWeight="bold"
                      color={mode === "dark" ? "white" : "black"}
                    >
                      {data.day.charAt(0).toUpperCase() + data.day.slice(1)}
                    </Text>
                  </Box>

                  <DashedVertical />

                  <VStack width={"55%"}>
                    {data.mata_pelajaran.map((pelajaran, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => router.push("/detailMapel")}
                      >
                        <Box
                          p={10}
                          mt={10}
                          width={"100%"}
                          borderWidth={1}
                          borderRadius={8}
                          borderColor={mode === "dark" ? colors.box : "#ddd"}
                          backgroundColor={
                            mode === "dark" ? colors.box : "#f9f9f9"
                          }
                        >
                          <HStack justifyContent="space-between">
                            <VStack>
                              <Text
                                color={mode === "dark" ? "white" : "black"}
                                fontWeight="medium"
                              >
                                {pelajaran.nama}
                              </Text>
                              <Text fontWeight="medium">{pelajaran.waktu}</Text>
                            </VStack>
                            <MaterialCommunityIcons
                              name="chevron-right"
                              size={15}
                              color={mode === "dark" ? "white" : "black"}
                              style={{ marginTop: 10 }}
                            />
                          </HStack>
                        </Box>
                      </TouchableOpacity>
                    ))}
                  </VStack>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JadwalPelajaran;
