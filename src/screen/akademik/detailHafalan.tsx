import colors from "@/src/config/colors";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import CustomBadge from "@/components/CustomBadge";

const DetailHafalan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  const ayatData = [
    {
      number: 1,
      arabic: "الم",
      translation: "Alif laam miim.",
      status: "Sudah Setor",
      lastUpdated: "18 Oct 2024",
    },
    {
      number: 2,
      arabic: "ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ",
      translation:
        "Kitab (Al Quran) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,",
      status: "Sudah Setor",
      lastUpdated: "18 Oct 2024",
    },
  ];

  return (
    <ScrollView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
        <TouchableOpacity onPress={() => router.back()}>
          <HStack m={5}>
            <MaterialIcons
              name="chevron-left"
              color={mode === "dark" ? "white" : "black"}
              size={30}
            />
            <Center flex={1} mr={20}>
              <Text color={mode === "dark" ? "white" : "black"} size="sm">
                Al-Baqarah
              </Text>
            </Center>
          </HStack>
        </TouchableOpacity>
      </Box>

      <VStack mx={10}>
        {ayatData.map((item, index) => (
          <Box
            key={index}
            mt={20}
            borderRadius={10}
            overflow="hidden"
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            backgroundColor={mode === "dark" ? "#1a1a1a" : "white"}
          >
            {/* Body */}
            <VStack px={15} py={10} space="sm">
              <HStack
                alignItems="center"
                space="md"
                justifyContent="space-between"
                mb={10}
              >
                <Box
                  width={30}
                  height={30}
                  borderRadius={15}
                  backgroundColor={colors.primary}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color="white" fontWeight="$bold" fontSize={14}>
                    {item.number}
                  </Text>
                </Box>
                <Text
                  fontSize={18}
                  color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato"
                >
                  {item.arabic}
                </Text>
              </HStack>

              <Text
                fontSize={14}
                color={mode === "dark" ? "gray.300" : "gray.800"}
              >
                {item.translation}
              </Text>
            </VStack>

            {/* Footer */}
            <HStack
              px={15}
              py={10}
              justifyContent="space-between"
              alignItems="center"
              backgroundColor={mode === "dark" ? "#22262F" : "#F5F5F5"}
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}
            >
              <CustomBadge
                variant={mode === "dark" ? "success2" : "success"}
                label="Sudah Setor"
              />
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontFamily="Lato"
                fontSize={12}
              >
                Terakhir diperbarui: {item.lastUpdated}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default DetailHafalan;
