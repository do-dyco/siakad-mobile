import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { VStack, Box, HStack, Text } from "@gluestack-ui/themed";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function SaldoScreen({
  data = { id: 0, saldo: "0" },
}: {
  data: { id: number; saldo: string };
}) {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width * 0.9;

  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const getMaskedAmount = () => "Rp.••••••••";

  const formatRupiah = (value: number | string) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("id-ID").format(numericValue);
  };

  const safeSaldo = data?.saldo ?? "0";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      <VStack>
        {/* Card Container */}
        <Box borderTopRadius={16} borderWidth={1} borderColor="transparent">
          {/* Image Background */}
          <ImageBackground
            source={require("@/assets/images/One.png")}
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
              {/* Title */}
              <Text m={16} fontSize={16} color="white" fontFamily="Lato">
                Total Saldo Anda
              </Text>

              {/* Amount and Optional Action */}
              <HStack m={16} justifyContent="space-between" mb={40}>
                <HStack space="md" alignItems="center">
                  <Text fontFamily="Lato-Black" color="white" fontSize={24}>
                    {visible
                      ? `Rp ${formatRupiah(safeSaldo)}`
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

          {/* Footer Box */}
          <Box
            borderRadius={16}
            backgroundColor={"#506A7A"}
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
    </ScrollView>
  );
}
