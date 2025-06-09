import {
  Input,
  InputField,
  VStack,
  Text,
  Button,
  Center,
  SafeAreaView,
  ScrollView,
  Select,
  SelectPortal,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  HStack,
  Badge,
  Image,
  Box,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { Link, useRouter } from "expo-router";
import { Dimensions, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import Header from "@/components/Header";
import NoData from "@/components/NoData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function akademik() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [selectedKelas, setSelectedKelas] = useState("1"); // Default selected class
  const dataKelas = [
    {
      id: "1",
      kelas: "X - IPA 1",
    },
    {
      id: "2",
      kelas: "VII - C",
    },
    {
      id: "3",
      kelas: "VIII - D",
    },
    {
      id: "4",
      kelas: "IX - G",
    },
    {
      id: "5",
      kelas: "XIII - B",
    },
  ];
  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Center position="relative">
          <Image
            style={{
              position: "absolute",
              top: 0,
              width: screenWidth,
              height: screenHeight / 3 - 30,
              zIndex: -1,
            }}
            alt="Akademik Background"
            resizeMode="cover"
            source={
              mode === "dark"
                ? require("../../assets/images/Akademik & Keuangan/BackgroundAkademik_Dark.png")
                : require("../../assets/images/Akademik & Keuangan/BackgroundAkademik_Light.png")
            }
          />

          {/* Text di atas gambar */}
          <Text
            color={mode === "dark" ? "white" : "black"}
            mt={40}
            font_type={"bold"}
          >
            Akademik
          </Text>
        </Center>

        <VStack space="md" mx={10} mt={40} mb={20}>
          <Text>Kelas saat ini</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5 }}
          >
            <HStack space="sm">
              {dataKelas.map((item, index) => {
                const isSelected = selectedKelas === item.id;
                return (
                  <Pressable
                    key={item.id || index}
                    onPress={() => setSelectedKelas(item.id)}
                  >
                    <Badge
                      size="md"
                      variant="solid"
                      borderRadius={20}
                      backgroundColor={
                        isSelected
                          ? mode === "dark"
                            ? "#073F34"
                            : "#E6F8F2"
                          : mode === "dark"
                          ? "#22262F"
                          : "#F5F5F5"
                      }
                      alignItems="center"
                      justifyContent="center"
                      height={35}
                      px={16}
                      borderWidth={isSelected ? 0 : 1}
                      borderColor={mode === "dark" ? "#333" : "#E0E0E0"}
                    >
                      <Text
                        color={
                          isSelected
                            ? "#0F8B70"
                            : mode === "dark"
                            ? "white"
                            : "black"
                        }
                        fontSize="$sm"
                        fontWeight={isSelected ? "600" : "400"}
                      >
                        {item.kelas}
                      </Text>
                    </Badge>
                  </Pressable>
                );
              })}
            </HStack>
          </ScrollView>
          <Select>
            <SelectTrigger variant="rounded" size="md">
              <SelectInput placeholder="Select option" />
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
                <SelectItem label="Genap" value="genap" />
                <SelectItem label="Ganjil" value="ganjil" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <HStack justifyContent="space-between" mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>Rangking</Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada rangking"
            desc="Pembelajaran masih berlangsung, rangking akan muncul setelah pembelajaran selesai"
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />

          <HStack justifyContent="space-between" mt={20} mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>
              Hafalan Al-Qur'an
            </Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada hafalan Al-Qur'an"
            desc="Hafalan Al-Qur'an akan muncul di sini, ketika anda sudah mensetor hafalan."
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />

          <HStack justifyContent="space-between" mt={20} mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>
              Nilai Rata - Rata
            </Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada Nilai"
            desc="Nila Rata - Rata akan muncul disini, ketika anda sudah mempunyai nilai"
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
