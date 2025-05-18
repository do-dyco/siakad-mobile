import React from "react";
import {
  Box,
  VStack,
  Text,
  Image,
  FlatList,
} from "@gluestack-ui/themed";
import { Dimensions, useColorScheme } from "react-native";
import Header from "@/components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import colors from "@/src/config/colors";

const articles = [
  {
    id: "1",
    title: "Tesla Launching AI Robot",
    description:
      "Untuk keamanan akun anda, kami sarankan untuk mengganti kata sandi secara berkala, minimal 4 bulan sekali.",
    image: require("@/assets/images/artikel1.jpg"),
  },
  {
    id: "2",
    title: "OpenAI Releases GPT-5",
    description:
      "Model terbaru dari OpenAI kini mendukung pemrosesan video dan 3D modeling langsung.",
    image: require("@/assets/images/artikel1.jpg"),
  },
  {
    id: "3",
    title: "iOS 19 Launches Worldwide",
    description:
      "Apple resmi merilis iOS 19 dengan fitur baru berbasis AI dan keamanan yang ditingkatkan.",
    image: require("@/assets/images/artikel1.jpg"),
  },
  {
    id: "4",
    title: "SpaceX Misi Mars Berhasil",
    description:
      "Misi pertama SpaceX ke Mars sukses mendarat tanpa kendala besar.",
    image: require("@/assets/images/artikel1.jpg"),
  },
  {
    id: "5",
    title: "Netflix Luncurkan Game Streaming",
    description:
      "Netflix kini menyediakan layanan streaming game langsung tanpa instalasi.",
    image: require("@/assets/images/artikel1.jpg"),
  },
  {
    id: "6",
    title: "Startup Lokal Raup 1T",
    description:
      "Startup lokal Indonesia berhasil mendapat pendanaan sebesar 1 Triliun.",
    image: require("@/assets/images/artikel1.jpg"),
  },
];

const ArticleScreen = () => {
  const colorMode = useColorScheme();
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 40) / 2;

  const renderItem = ({ item }: { item: typeof articles[0] }) => (
    <TouchableOpacity onPress={() => router.push("/detailArticle")}>
      <Box
        width={cardWidth}
        height={250}
        borderRadius={10}
        bgColor={"transparent"}
        borderWidth={1}
        borderColor={colorMode === 'dark' ? colors.border : colors.gray.light[200]}
        m={10}
        shadowColor={colorMode === "dark" ? "white" : "gray"}
        shadowOpacity={0.1}
        shadowRadius={4}
        overflow="hidden"
      >
        <Image
          source={item.image}
          alt="artikel"
          width="100%"
          height={100}
          resizeMode="cover"
        />
        <VStack space="sm" p={10} flex={1}>
          <Text
            fontSize={14}
            color={colorMode === "dark" ? "white" : "black"}
            fontFamily="Lato-Bold"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            fontSize={12}
            color={colorMode === "dark" ? "white" : "black"}
            fontFamily="Lato"
            numberOfLines={3}
          >
            {item.description}
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <>
      <Header data={"Artikel"} />
      <FlatList
        data={articles}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );
};

export default ArticleScreen;
