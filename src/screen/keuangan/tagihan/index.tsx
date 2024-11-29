import Header from "@/components/Header";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputField,
  InputSlot,
  SafeAreaView,
  Text,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const Tagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [data, setData] = useState("1");

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Box backgroundColor={mode === "dark" ? "black" : "white"}>
          <TouchableOpacity onPress={() => router.back()}>
            <HStack m={5}>
              <MaterialIcons
                name="chevron-left"
                color={mode === "dark" ? "white" : "black"}
                size={30}
              />
              <Center flex={1} mr={20}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  size="sm"
                  mr={20}
                >
                  Tagihan
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          <HStack mt={15} space="md" m={5}>
            <Input
              variant="rounded"
              width={"85%"}
              borderColor={"transparent"}
              backgroundColor={mode === "dark" ? "#13161B" : "white"}
            >
              <InputField placeholder="Cari transaksi disini" />
            </Input>

            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
              <Box
                borderRadius={"$full"}
                backgroundColor={"transparent"}
                borderWidth={1}
                borderColor={colors.border}
              >
                <Ionicons
                  name="filter"
                  size={25}
                  color="white"
                  style={{ margin: 8 }}
                />
              </Box>
            </TouchableOpacity>
          </HStack>
          <Divider mt={20} bgColor="#3a3a3b" />
        </Box>

        <VStack m={10}>
          {!data ? (
            <NoData
              title="Belum ada tagihan"
              desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
            />
          ) : (
            <>
              {/* <Stack>
                <Stack.Screen name="(top-tabs)" />
              </Stack> */}
            </>
          )}
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Tagihan;
