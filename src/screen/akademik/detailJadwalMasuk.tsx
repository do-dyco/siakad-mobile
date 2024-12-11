import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
  VStack,
  Text,
  Heading,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

const detailJadwalMasuk = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const data = [
    { value: 80, color: "#10B981" },
    { value: 10, color: "#EF4444" },
    { value: 5, color: "#F59E0B" },
    { value: 5, color: "#61656C" },
  ];
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const data_jadwal = [
    {
      id: "1",
      date: "3",
      month: "Okt",
      status: "Hadir",
      time: "07:01:12",
    },
    {
      id: "2",
      date: "7",
      month: "Okt",
      status: "Hadir",
      time: "07:00:56",
    },
    {
      id: "3",
      date: "10",
      month: "Okt",
      status: "Tidak Hadir",
      time: "",
    },
    {
      id: "4",
      date: "14",
      month: "Okt",
      status: "Izin Sakit",
      time: "",
    },
    {
      id: "5",
      date: "14",
      month: "Okt",
      status: "Hadir",
      time: "07:02:12",
    },
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "$black" : "$white"}
      height={screenHeight}
    >
      <ScrollView>
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
                  Jadwal Masuk
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
            >
              <InputField placeholder="Pilih Tanggal" />
              <InputSlot mx={10}>
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={25}
                  color={mode === "dark" ? "white" : "black"}
                />
              </InputSlot>
            </Input>
          </TouchableOpacity>
          <Divider mt={20} bgColor="#3a3a3b" />
        </Box>
        <VStack space="md" mx={10} mt={20}>
          <Center>
            <PieChart
              data={data}
              donut
              innerCircleColor={mode === "dark" ? "black" : "white"}
              innerRadius={80}
            />
          </Center>

          <HStack justifyContent="space-between" mx={20} mt={10}>
            <VStack>
              <Box
                backgroundColor="#10B981"
                height={20}
                width={20}
                borderRadius={5}
                ml={"15%"}
              />
              <Text color={mode === "dark" ? "white" : "black"}>Hadir</Text>
            </VStack>

            <VStack>
              <Box
                backgroundColor="#EF4444"
                height={20}
                width={20}
                borderRadius={5}
                ml={"40%"}
              />
              <Text color={mode === "dark" ? "white" : "black"}>
                Tidak Hadir
              </Text>
            </VStack>

            <VStack>
              <Box
                backgroundColor="#F59E0B"
                height={20}
                width={20}
                borderRadius={5}
              />
              <Text color={mode === "dark" ? "white" : "black"}>Izin</Text>
            </VStack>

            <VStack>
              <Box
                backgroundColor="#61656C"
                height={20}
                width={20}
                borderRadius={5}
                ml={"40%"}
              />
              <Text color={mode === "dark" ? "white" : "black"}>
                Belum Absen
              </Text>
            </VStack>
          </HStack>

          <Box py="$10">
            <Heading size="xl" p="$4" pb="$3">
              Inbox
            </Heading>

            <FlatList
              data={data_jadwal}
              renderItem={({ item }: { item: any }) => (
                <Box
                  borderBottomWidth="$1"
                  borderColor="$trueGray800"
                  $dark-borderColor="$trueGray100"
                  $base-pl={0}
                  $base-pr={0}
                  $sm-pl="$4"
                  $sm-pr="$5"
                  py="$2"
                >
                  <HStack space="md" justifyContent="space-between">
                    <VStack height={70} width={50}>
                      <Box
                        bgColor="#373A41"
                        borderTopRightRadius={10}
                        borderTopLeftRadius={10}
                      >
                        <Center>
                          <Text color="#94979C">{item.month}</Text>
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
                            {item.date}
                          </Text>
                        </Center>
                      </Box>
                    </VStack>
                    <VStack>
                      <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        $dark-color="$warmGray100"
                      >
                        {item.status}
                      </Text>
                    </VStack>
                    <Text
                      color="$coolGray800"
                      alignSelf="flex-start"
                      $dark-color="$warmGray100"
                    >
                      {item.time}
                    </Text>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item, index) => item.id || index.toString()}
            />
          </Box>
        </VStack>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default detailJadwalMasuk;
