import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Box,
  HStack,
  Badge,
  Center,
  Image,
  Divider,
  Avatar,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
} from "@gluestack-ui/themed";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";

const StatusTransaksi = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const toggleActionsheet = () => setShowActionsheet(!showActionsheet);
  const textColor = mode === "dark" ? "white" : "black";
  const bgColor = mode === "dark" ? "black" : "white";

  return (
    <SafeAreaView flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} backgroundColor={bgColor} height={screenHeight}>
        <Header data="Status Transaksi" />

        <VStack space="md" flex={1} m={10}>
          {/* Status Box */}
          <Box borderRadius={10} borderWidth={1} borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}>
            <VStack space="md" m={10}>
              {/* Status Icon */}
              <HStack justifyContent="center" space="xs">
                <Avatar bgColor="#065F46" size="sm" borderRadius="$full">
                  <MaterialCommunityIcons name="check" size={18} color={colors.primary} />
                </Avatar>
                <Divider width="25%" mt={15} bgColor="#13161B" />
                <Avatar bgColor="#065F46" size="sm" borderRadius="$full">
                  <MaterialCommunityIcons name="text-box-search-outline" size={18} color={colors.primary} />
                </Avatar>
                <Divider width="25%" mt={15} bgColor="#13161B" />
                <Avatar bgColor="#22262F" size="sm" borderRadius="$full">
                  <Ionicons name="send" size={18} color="#717680" />
                </Avatar>
              </HStack>

              <DashedDivider />

              <HStack justifyContent="space-between">
                <Text mx={20} color={textColor} fontFamily="Lato">Sedang Mengecek</Text>
                <Badge size="md" variant="solid" borderRadius={12} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]} width="30%">
                  <HStack space="xs" m={5}>
                    <Text color={mode === "dark" ? "white" : "black"} size="xs" fontFamily="Lato">TF25592952</Text>
                    <Ionicons name="copy-outline" size={20} color="#373A41" />
                  </HStack>
                </Badge>
              </HStack>

              {/* Bank Info */}
              <HStack space="md">
                <Image
                  size="xs"
                  source={require("@/assets/images/bank/mandiri.png")}
                  alt="mandiri"
                  borderRadius={10}
                />
                <VStack>
                  <Text color={textColor} fontFamily="Lato">Bank Mandiri</Text>
                  <Text color={textColor} fontFamily="Lato">AL-FUADIYAH</Text>
                </VStack>
              </HStack>

              {/* Jumlah Transfer */}
              <Text color={textColor} fontFamily="Lato">Jumlah Transfer</Text>
              <Box borderWidth={1} borderRadius={10} borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]}>
                <HStack justifyContent="space-between" p={10}>
                  <Text mx={20} color={textColor} fontFamily="Lato">Rp.100.122</Text>
                  <Text mx={20} color={textColor} fontFamily="Lato">Copy</Text>
                </HStack>
              </Box>

              <DashedDivider />
              <Text fontFamily="Lato">Hari ini, 21 Okt 2024</Text>
              <Text color={textColor} size="sm" fontFamily="Lato">
                Admin sedang mengecek transaksi Anda, mohon untuk menunggu.
              </Text>
              <Text color={textColor} fontWeight="$bold" size="xl" fontFamily="Lato">09:59</Text>
            </VStack>
          </Box>

          {/* Detail Transaksi */}
          <TouchableOpacity onPress={toggleActionsheet}>
            <Box borderRadius={10} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]}>
              <HStack justifyContent="space-between" m={10}>
                <HStack space="md">
                  <MaterialCommunityIcons name="text-box-outline" size={20} color={textColor} />
                  <Text color={textColor} fontFamily="Lato">Detail Transaksi</Text>
                </HStack>
                <MaterialCommunityIcons name="chevron-right" size={20} color={textColor} />
              </HStack>
            </Box>
          </TouchableOpacity>

          {/* Bantuan */}
          <Box borderRadius={10} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]}>
            <HStack justifyContent="space-between" m={10}>
              <HStack space="md">
                <MaterialCommunityIcons name="help-circle-outline" size={20} color={textColor} />
                <Text color={textColor} fontFamily="Lato">Butuh Bantuan ?</Text>
              </HStack>
              <MaterialCommunityIcons name="chevron-right" size={20} color={textColor} />
            </HStack>
          </Box>

          {/* Batalkan Transaksi */}
          <Center>
            <Text color={colors.primary} fontFamily="Lato">Batalkan Transaksi</Text>
          </Center>
        </VStack>
      </ScrollView>

      {/* ActionSheet Detail Transaksi */}
      <Actionsheet isOpen={showActionsheet} onClose={toggleActionsheet} zIndex={999} trapFocus={false}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="50%" zIndex={999} backgroundColor={bgColor}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <HStack justifyContent="space-between" mt={10} width="100%">
            <Text color={textColor} fontWeight="$bold" size="lg" mt={2} fontFamily="Lato">Detail Transaksi</Text>
            <Badge size="md" variant="solid" borderRadius={12} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]} width="30%">
              <HStack space="xs">
                <Text color={mode === "dark" ? "white" : "black"} size="xs" fontFamily="Lato">TF25592952</Text>
                <Ionicons name="copy-outline" size={20} color="#373A41" />
              </HStack>
            </Badge>
          </HStack>

          <Divider mt={10} bgColor={colors.border} />

          {/* Pengirim */}
          <Box borderRadius={10} bgColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]} m={10} w="100%">
            <HStack space="md" m={5}>
              <Box backgroundColor={colors.primary} borderRadius={8} mt={10}>
                <MaterialIcons name="person-outline" size={20} color="white" style={{ margin: 5 }} />
              </Box>
              <Text mt={10} color={textColor} fontFamily="Lato">Muhammad Robby</Text>
            </HStack>
            <Divider bgColor={colors.border} mt={5} />
            <HStack justifyContent="space-between" m={10}>
              <Text fontFamily="Lato">Jumlah isi ulang saldo</Text>
              <Text color={textColor} fontFamily="Lato">Rp.100.000</Text>
            </HStack>
          </Box>

          <Divider bgColor={colors.border} mt={10} />

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">Bank Mandiri</Text>
            <Text color={textColor} size="xs" fontFamily="Lato">Transfer Bank Mandiri</Text>
          </HStack>

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">Kode Unik</Text>
            <Text color={textColor} size="xs" fontFamily="Lato">Rp.122</Text>
          </HStack>

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">Total Transfer</Text>
            <Text color={textColor} size="xs" fontFamily="Lato">Rp.100.122</Text>
          </HStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default StatusTransaksi;
