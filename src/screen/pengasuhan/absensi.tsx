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
import Header from "@/components/Header";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Dimensions,
  Touchable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import SkeletonList from "@/components/SkeletonList";
import { router } from "expo-router";
import NoData from "@/components/NoData";

const absensi = () => {
  const mode = useColorScheme();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView
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
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  size="sm"
                  mr={20}
                >
                  Absensi
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowActionsheet(true)}>
            <Input
              variant="outline"
              size="md"
              isDisabled={true}
              isInvalid={false}
              isReadOnly={false}
              borderRadius={8}
              mt={10}
              mx={10}
              borderColor="transparent"
            >
              <InputField placeholder="Pilih Tanggal" />
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

        <Text color={mode === "dark" ? "white" : "black"} m={10}>
          Oktober 2024
        </Text>

        {loading ? <SkeletonList /> : null}
        {!data && !loading ? (
          <NoData
            title="Belum ada data absensi"
            desc="Jika Anda sudah absen, absen tersebut akan muncul di sini."
          />
        ) : (
          <>
            <HStack space="md" m={10} justifyContent="space-between">
              <HStack space="md">
                <VStack height={70} width={50}>
                  <Box
                    bgColor="#373A41"
                    borderTopRightRadius={10}
                    borderTopLeftRadius={10}
                  >
                    <Center>
                      <Text color="#94979C">Oct</Text>
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
                        fontWeight={"$bold"}
                        color={mode === "dark" ? "white" : "black"}
                        mb={2}
                      >
                        1
                      </Text>
                    </Center>
                  </Box>
                </VStack>

                <VStack>
                  <Text color="#94979C">Berangkat Sekolah</Text>
                  <Text color="#94979C">Pulang Sekolah</Text>
                  <Text color="#94979C">Sholat Berjamaah</Text>
                </VStack>
              </HStack>

              <VStack>
                <Text color={mode === "dark" ? "white" : "black"}>
                  06:40:22
                </Text>
                <Text color={mode === "dark" ? "white" : "black"}>
                  12:24:33
                </Text>
                <Text color={mode === "dark" ? "white" : "black"}>
                  11:47:22
                </Text>
              </VStack>
            </HStack>

            <Actionsheet
              isOpen={showActionsheet}
              onClose={handleClose}
              zIndex={999}
            >
              <ActionsheetBackdrop />
              <ActionsheetContent h="$72" zIndex={999}>
                <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem onPress={handleClose}></ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Share</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Play</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Favourite</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetItemText>Cancel</ActionsheetItemText>
                </ActionsheetItem>
              </ActionsheetContent>
            </Actionsheet>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default absensi;
