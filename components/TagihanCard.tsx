import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { VStack, Box, HStack, Text } from "@gluestack-ui/themed";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

// Tipe data tunggal
type TagihanItem = {
  id: number;
  label: string;
  saldo: string;
};

// Bisa berupa array atau object (raw)
type Props = {
  data?: TagihanItem[] | Record<string, string>;
};

export default function TagihanCard({ data = [] }: Props) {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width * 0.9;
  const [visible, setVisible] = useState(true);
  const toggleVisibility = () => setVisible((prev) => !prev);
  const getMaskedAmount = () => "Rp. • • • •";

  const imageSources = [
    require("@/assets/images/Three.png"),
    require("@/assets/images/Two.png"),
    require("@/assets/images/One.png"),
  ];

  const detailColor = ["#7c6300", "#1f1f1f", "#506A7A"];

  // Format angka menjadi rupiah
  const formatRupiah = (value: number | string) => {
    if (value === null || value === undefined || value === "") return "0";
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numericValue)) return "0";
    return new Intl.NumberFormat("id-ID").format(numericValue);
  };

  // Normalisasi jika data bukan array
  const normalizeData = (): TagihanItem[] => {
    if (Array.isArray(data)) return data;

    return Object.entries(data).map(([key, value], index) => ({
      id: index + 1,
      label: key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      saldo: value,
    }));
  };

  const tagihanList = normalizeData();

  if (tagihanList.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      <HStack space="md">
        {tagihanList.map((item, index) => (
          <VStack key={item.id}>
            <Box borderTopRadius={16} borderWidth={1} borderColor="transparent">
              <ImageBackground
                source={imageSources[index % imageSources.length]}
                style={{
                  width: screenWidth,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  overflow: "hidden",
                }}
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <VStack>
                  {/* Label */}
                  <Text m={16} fontSize={16} color="white" fontFamily="Lato">
                    {item.label}
                  </Text>

                  {/* Saldo */}
                  <HStack m={16} justifyContent="space-between" mb={40}>
                    <HStack space="md" alignItems="center">
                      <Text fontFamily="Lato-Black" color="white" fontSize={24}>
                        {visible
                          ? `Rp ${formatRupiah(item.saldo)}`
                          : getMaskedAmount()}
                      </Text>
                      <TouchableOpacity
                        onPress={toggleVisibility}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Feather
                          name={visible ? "eye" : "eye-off"}
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </HStack>

                    {/* Top Up Button */}
                    <HStack space="md" alignItems="center">
                      <Text fontFamily="Lato-Bold" color="white" fontSize={24}>
                        |
                      </Text>
                      <TouchableOpacity onPress={() => router.push("/topUp")}>
                        <VStack alignItems="center">
                          <Box borderRadius={6} backgroundColor="white" p={3}>
                            <MaterialIcons name="add" size={20} color="black" />
                          </Box>
                          <Text
                            mt={1}
                            textAlign="center"
                            color="white"
                            fontFamily="Lato"
                            fontSize={12}
                          >
                            Top Up
                          </Text>
                        </VStack>
                      </TouchableOpacity>
                    </HStack>
                  </HStack>
                </VStack>
              </ImageBackground>

              {/* Footer */}
              <Box
                borderRadius={16}
                backgroundColor={detailColor[index % detailColor.length]}
                height={50}
                mt={-20}
                justifyContent="center"
              >
                <HStack justifyContent="space-between" px={20}>
                  <Text color="white" fontFamily="Lato-Bold">
                    Detail
                  </Text>
                  <AntDesign name="arrowright" size={20} color="white" />
                </HStack>
              </Box>
            </Box>
          </VStack>
        ))}
      </HStack>
    </ScrollView>
  );
}
