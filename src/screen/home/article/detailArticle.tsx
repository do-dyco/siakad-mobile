import React from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Image,
  ScrollView,
  Pressable,
  Icon,
  Center,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import colors from "@/src/config/colors";
import Header from "@/components/Header";

const ArticleDetail = () => {
  const router = useRouter();
  const mode = useColorScheme();

  return (
    <ScrollView>
      <VStack px={16} pb={20} bg={mode === "dark" ? "black" : "white"}>
        {/* Header */}
        <Header data={"TESLA launchinh Ai Robot"}/>

        {/* Article Image */}
        <Image
          source={require("@/assets/images/artikel1.jpg")}
          alt="Article Image"
          borderRadius={12}
          width="100%"
          height={200}
          mb={16}
        />

        {/* Tag + Meta Info */}
        <HStack alignItems="center" mb={4} flexWrap="wrap">
          <Box
            borderRadius={4}
            bgColor="#E5E7EB"
            px={8}
            py={4}
            mr={8}
          >
            <Text fontSize={10} fontFamily="Lato" color="black">
              Teknologi
            </Text>
          </Box>
        </HStack>
          <Text fontSize={12} color={colors.gray.light[400]} fontFamily="Lato">
            by <Text fontWeight="bold">Admin</Text> • 18 October 2024 • 6 min read
          </Text>

        {/* Title */}
        <Text
          fontSize={20}
          fontFamily="Lato-Bold"
          mb={10}
          mt={10}
          color={mode === "dark" ? "white" : "black"}
        >
          Tesla launching AI Robot
        </Text>

        {/* Body */}
        <Text
          fontSize={14}
          fontFamily="Lato"
          lineHeight={22}
          color={mode === "dark" ? "white" : "black"}
          mb={16}
        >
          Tesla, the renowned electric vehicle and clean energy company led by CEO Elon Musk, 
          has consistently pushed the boundaries of technology and innovation. 
          From revolutionizing electric vehicles to building sustainable energy solutions, 
          Tesla has often led the charge toward a tech-driven future.
        </Text>

        {/* Subtitle */}
        <Text
          fontSize={16}
          fontFamily="Lato-Bold"
          mb={8}
          color={mode === "dark" ? "white" : "black"}
        >
          1. The Birth of Tesla’s AI Robot
        </Text>

        {/* Section Text */}
        <Text
          fontSize={14}
          fontFamily="Lato"
          lineHeight={22}
          color={mode === "dark" ? "white" : "black"}
        >
          Tesla announced its AI robot project, known as Optimus or the Tesla Bot, 
          with the vision of creating a humanoid robot that could undertake repetitive 
          or dangerous tasks in various environments. This announcement sparked 
          widespread interest and discussion, given the company's history of innovation.
        </Text>

    <Center>
        <Text
          fontSize={14}
          fontFamily="Lato"
          lineHeight={22}
          mt={20}
          color={mode === "dark" ? "white" : "black"}
          >
            Share this on
        </Text>
        <HStack space="md" mt={10}>
            <Entypo name="instagram" size={20}color={mode === "dark" ? "white" : "black"} />
            <Ionicons name="logo-facebook" size={20} color={mode === "dark" ? "white" : "black"}/>
            <Ionicons name="logo-twitter" size={20} color={mode === "dark" ? "white" : "black"}/>
            <Ionicons name="logo-pinterest" size={20} color={mode === "dark" ? "white" : "black"}/>
            <Entypo name="link" size={20} color={mode === "dark" ? "white" : "black"}/>
        </HStack>
    </Center>
      </VStack>
    </ScrollView>
  );
};

export default ArticleDetail;
