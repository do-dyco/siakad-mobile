import React, { useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputField,
  InputSlot,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import SkeletonList from "@/components/SkeletonList";
import { router } from "expo-router";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import CustomBadge from "@/components/CustomBadge";

const AbsensiHp = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const [data, setData] = useState("1");
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
          <TouchableOpacity onPress={() => router.back()}>
            <HStack m={5} alignItems="center">
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
                  fontFamily="Lato"
                >
                  Absensi Hp
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowActionsheet(true)}>
            <Input
              variant="outline"
              size="md"
              isDisabled={true}
              borderRadius={8}
              mt={10}
              mx={10}
              borderColor="transparent"
            >
              <InputField placeholder="Pilih Tanggal" fontFamily="Lato" />
              <InputSlot mx={10}>
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={25}
                  color={"#535862"}
                />
              </InputSlot>
            </Input>
          </TouchableOpacity>

          <Divider mt={20} bgColor="#3a3a3b" />
        </Box>

        <Text color={mode === "dark" ? "white" : "black"} m={10} fontFamily="Lato">
          Oktober 2024
        </Text>

        {loading && <SkeletonList />}

        {!data && !loading ? (
          <NoData
            title="Belum ada data absensi hp"
            desc="Jika Anda sudah absen, absen tersebut akan muncul di sini."
          />
        ) : (
          <>
            <HStack space="md" m={10} justifyContent="space-between" alignItems="flex-start">
              {/* Tanggal Box */}
              <HStack space="md">
                <VStack height={70} width={50}>
                  <Box
                    bgColor="#373A41"
                    borderTopRightRadius={10}
                    borderTopLeftRadius={10}
                  >
                    <Center>
                      <Text color="#94979C" fontFamily="Lato">Oct</Text>
                    </Center>
                  </Box>
                  <Divider bgColor="#22262F" />
                  <Box
                    bgColor="#22262F"
                    borderBottomRightRadius={10}
                    borderBottomLeftRadius={10}
                  >
                    <Center>
                      <Text
                        fontWeight="$bold"
                        color={mode === "dark" ? "white" : "black"}
                        mb={2}
                        fontFamily="Lato"
                      >
                        1
                      </Text>
                    </Center>
                  </Box>
                </VStack>

                {/* Label Keterangan */}
                <VStack justifyContent="space-between">
                  <Text color="#94979C" fontFamily="Lato">Merk Hp</Text>
                  <Text color="#94979C" fontFamily="Lato">Waktu Menyerahkan</Text>
                  <Text color="#94979C" fontFamily="Lato">Status</Text>
                  <Text color="#94979C" fontFamily="Lato">Waktu Pengambilan</Text>
                </VStack>
              </HStack>

              {/* Isi Keterangan */}
              <VStack alignItems="flex-end" justifyContent="space-between">
                <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato">
                  Iphone 11, Ungu
                </Text>
                <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato">
                  12:24:33
                </Text>
                <CustomBadge variant="danger2" label="05:59:59" />
                <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato">
                  -
                </Text>
              </VStack>
            </HStack>

            <Divider bgColor={colors.border} />

            {/* Action Sheet */}
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
              <ActionsheetBackdrop />
              <ActionsheetContent h="$72" zIndex={999}>
                <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText fontFamily="Lato">Share</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText fontFamily="Lato">Play</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText fontFamily="Lato">Favourite</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText fontFamily="Lato">Cancel</ActionsheetItemText>
                </ActionsheetItem>
              </ActionsheetContent>
            </Actionsheet>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default AbsensiHp;
