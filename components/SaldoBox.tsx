import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { VStack, Box, HStack, Text } from "@gluestack-ui/themed";
import { Entypo, MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

const saldoData = [
  {
    id: 1,
    title: "Total Saldo Anda",
    amount: "Rp.104.589.000",
    image: require("@/assets/images/One.png"),
    color: "#506A7A",
  },
];

export default function SaldoBox() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width * 0.9;

  const [visibleAmounts, setVisibleAmounts] = useState<Record<number, boolean>>(
    saldoData.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const toggleAmountVisibility = (itemId: number) => {
    setVisibleAmounts((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getMaskedAmount = (amount: string) => {
    return "Rp." + "•".repeat(8);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 4 }}
    >
      {saldoData.map((item) => (
        <VStack key={item.id}>
          {/* Card Container */}
          <Box
            borderTopLeftRadius={16}
            borderTopRightRadius={16}
            borderWidth={1}
            borderColor="transparent"
          >
            {/* Image Background */}
            <ImageBackground
              source={item.image}
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
                  {item.title}
                </Text>

                {/* Amount and Optional Action */}
                <HStack m={16} justifyContent="space-between" mr="10%" mb={40}>
                  <HStack space="md" alignItems="center">
                    <Text fontFamily="Lato-Black" color="white" fontSize={24}>
                      {visibleAmounts[item.id]
                        ? item.amount
                        : getMaskedAmount(item.amount)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleAmountVisibility(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Feather
                        name={visibleAmounts[item.id] ? "eye" : "eye-off"}
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </HStack>

                  {/* Only show Top Up button on first item */}
                  {item.id === 1 && (
                    <HStack space="md">
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
                  )}
                </HStack>
              </VStack>
            </ImageBackground>

            {/* Footer Box */}
            <Box
              borderRadius={16}
              borderWidth={1}
              backgroundColor={item.color}
              height={50}
              borderColor="transparent"
              mt={-20}
            >
              <HStack justifyContent="space-between" mx={20} my={3} mt={15}>
                <Text color="white" fontFamily="Lato-Bold">
                  Detail
                </Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </HStack>
            </Box>
          </Box>
        </VStack>
      ))}
    </ScrollView>
  );
}
