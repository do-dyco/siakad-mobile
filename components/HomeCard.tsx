import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { VStack, Box, HStack, Text, Center } from "@gluestack-ui/themed";
import { Entypo, MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const saldoData = [
  {
    id: 1,
    title: "Total Saldo Anda",
    amount: "Rp.104.589.000",
    image: require("@/assets/images/One.png"),
    color: "#506A7A",
  },
  {
    id: 2,
    title: "Tagihan Baru",
    amount: "Rp.5.000.000",
    image: require("@/assets/images/Two.png"),
    color: "#232c31",
  },
  {
    id: 3,
    title: "Tagihan Lunas",
    amount: "Rp.12.000.000",
    image: require("@/assets/images/Three.png"),
    color: "#957c32",
  },
  {
    id: 4,
    title: "Total Tagihan",
    amount: "Rp.17.000.000",
    image: require("@/assets/images/Four.png"),
    color: "#606c73",
  },
];

export default function SaldoScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width * 0.9;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 4 }}
    >
      {saldoData.map((item) => (
        <VStack key={item.id}>
          <Box
            borderTopLeftRadius={16}
            borderTopRightRadius={16}
            borderWidth={1}
            borderColor="transparent"
          >
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
                <Text m={16} fontSize={16} color="white">
                  {item.title}
                </Text>
                <HStack m={16} justifyContent="space-between" mr="10%" mb={40}>
                  <HStack space="md">
                    <Text
                      fontWeight="bold"
                      color="white"
                      style={{ fontSize: 24 }}
                    >
                      {item.amount}
                    </Text>
                    <Feather name="eye-off" size={24} color="white" />
                  </HStack>

                  {item.id === 1 && (
                    <HStack space="md">
                      <Text
                        fontWeight="bold"
                        color="white"
                        style={{ fontSize: 24 }}
                      >
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
                            style={{ fontSize: 12 }}
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

            <Box
              borderTopRightRadius={16}
              borderTopLeftRadius={16}
              borderWidth={1}
              backgroundColor={item.color}
              height={50}
              borderColor="transparent"
              mt={-15}
            >
              <HStack justifyContent="space-between" mx={20} my={3} mt={15}>
                <Text color="white">Detail</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </HStack>
            </Box>
          </Box>
        </VStack>
      ))}
    </ScrollView>
  );
}
