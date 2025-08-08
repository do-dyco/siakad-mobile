import DashedDivider from "@/components/dashedDivider";
import colors from "@/src/config/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  VStack,
  Box,
  HStack,
  Text,
  FlatList,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import CustomBadge from "./CustomBadge";
import NoData from "./NoData";
import * as Clipboard from "expo-clipboard";

const Proses = ({ data = [] }: { data: any[] }) => {
  const mode = useColorScheme();
  const toast = useToast();

  const copyToClipboard = async (text, label) => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid">
              <VStack space="xs">
                <ToastTitle>Berhasil</ToastTitle>
                <ToastDescription>
                  {label} telah disalin ke clipboard
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack space="xs">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>Gagal menyalin ke clipboard</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const formatTime = (timestamp: string) => {
    if (!timestamp) return "-";
    const [, time] = timestamp.split(" ");
    return time || "-";
  };

  if (!data || data.length === 0) {
    return (
      <NoData
        title="Belum ada tagihan"
        desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={data}
      keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
      renderItem={({ item }) => (
        <Box
          borderWidth={1}
          borderRadius={10}
          borderColor={mode === "dark" ? colors.border : colors.gray.light[200]}
          mb={20}
        >
          {/* Header */}
          <Box
            borderTopRightRadius={10}
            borderTopLeftRadius={10}
            bgColor={mode === "light" ? colors.gray.light[200] : colors.box}
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack space="md">
                <Box
                  borderRadius={8}
                  borderWidth={1}
                  borderColor="transparent"
                  bgColor={colors.boxWarning}
                  height={25}
                  width={25}
                  alignItems="center"
                  justifyContent="center"
                >
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color={"white"}
                  />
                </Box>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontSize={14}
                  fontFamily="Lato"
                  fontWeight="$semibold"
                >
                  Tagihan
                </Text>
              </HStack>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                {item.no_tagihan}
              </Text>
            </HStack>
          </Box>

          {/* Info */}
          <HStack justifyContent="space-between" mt={10} m={10}>
            <VStack space="md">
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                Invoice Number
              </Text>
              <HStack space="xs">
                <Text
                  color={colors.primary}
                  fontSize={14}
                  fontFamily="Lato"
                  fontWeight="$semibold"
                >
                  {item.no_invoice}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(item.no_invoice, "Invoice Number")
                  }
                >
                  <Ionicons
                    name="copy-outline"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </HStack>
            </VStack>
            <CustomBadge variant="warning" label="Dalam Proses" />
          </HStack>

          <DashedDivider />

          <VStack mx={10} mt={10} mb={10}>
            <HStack justifyContent="space-between">
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                Nama Tagihan
              </Text>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                {item.master_tagihan?.nama ?? "-"}
              </Text>
            </HStack>

            <HStack justifyContent="space-between" mt={10}>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                Nominal Tertagih
              </Text>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                fontWeight="$semibold"
              >
                Rp {formatRupiah(item.nominal)}
              </Text>
            </HStack>
          </VStack>
        </Box>
      )}
    />
  );
};

export default Proses;
