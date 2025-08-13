import DashedDivider from "@/components/dashedDivider";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  VStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Text,
  Button,
  FlatList,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, useColorScheme, SafeAreaView } from "react-native";
import CustomBadge from "./CustomBadge";
import NoData from "./NoData";
import { useTagihanStore } from "@/src/store/tagihanStore";
import apiService from "@/src/service/apiService";

type ItemType = {
  id: string;
  no_tagihan: string;
  no_invoice: string;
  tagihan_name: string;
  total: string;
  expire_at: string;
  nominal: number;
  master_tagihan?: { nama?: string };
};

type TagihanUser = {
  id: string;
  no_tagihan: string;
  expire_at: string;
  nominal: number;
  master_tagihan?: { nama?: string };
};

type InvoiceTagihan = {
  id?: string;
  no_invoice?: string;
  nominal?: number;
  status?: "PAID" | "UNPAID" | string;
  tagihan_users?: TagihanUser[];
};

type Props = {
  data?: ItemType[];
  onReload?: () => Promise<void> | void; // dipanggil setelah create invoice
};

const Berlangsung = ({ data = [], onReload }: Props) => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const toast = useToast();

  const [checkedValue, setCheckedValue] = useState<string[]>([]);
  const { setSelectedTagihan } = useTagihanStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const handleCheckboxChange = (value: string) => {
    setCheckedValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleRefresh = async () => {
    if (!onReload) return;
    try {
      setRefreshing(true);
      await onReload();
    } finally {
      setRefreshing(false);
    }
  };

  // Create invoice + toast + refresh
  const handleSubmit = async () => {
    if (checkedValue.length === 0) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="warning" variant="solid">
            <VStack space="xs">
              <ToastTitle>Pilih tagihan</ToastTitle>
              <ToastDescription>
                Silakan pilih minimal satu tagihan terlebih dahulu.
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      return;
    }

    try {
      setLoadingCreate(true);

      // kalau masih mau dipakai di screen lain, simpan ke store juga
      const selectedData = data.filter((item) =>
        checkedValue.includes(item.id)
      );
      setSelectedTagihan(selectedData);

      const payload = { tagihanUserIds: checkedValue }; // array id string
      const response = await apiService.createInvoiceNumber(payload);
      const inv: InvoiceTagihan = response?.data?.invoice_tagihan ?? {};

      if (!inv?.no_invoice) {
        throw new Error("Nomor invoice tidak tersedia");
      }

      // Toast sukses
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Berhasil</ToastTitle>
              <ToastDescription>
                Invoice {inv.no_invoice} berhasil dibuat.
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });

      // Refresh data list
      if (onReload) await onReload();

      // Reset pilihan
      setCheckedValue([]);

      // (Opsional) langsung ke detail/metode bayar:
      // router.push({ pathname: "/detailTagihan", params: { no_invoice: inv.no_invoice } });
      // atau:
      // router.push({ pathname: "/metodeBayar", params: { invoice: inv.no_invoice } });
    } catch (error) {
      console.error("Failed to create invoice:", error);
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Gagal</ToastTitle>
              <ToastDescription>
                Pembuatan invoice gagal. Coba lagi nanti.
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } finally {
      setLoadingCreate(false);
    }
  };

  if (!data.length) {
    return (
      <NoData
        title="Belum ada tagihan"
        desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
      />
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, position: "relative" }}
      height={screenHeight + 16}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 100,
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => {
          const [tanggal, jam] = item.expire_at?.split(" ") ?? ["-", "-"];
          return (
            <Box
              borderWidth={1}
              borderRadius={10}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
              mb={20}
            >
              <Box
                borderTopRightRadius={10}
                borderTopLeftRadius={10}
                bgColor={mode === "light" ? colors.gray.light[200] : colors.box}
              >
                <HStack justifyContent="space-between" m={10}>
                  <HStack space="md">
                    <Checkbox
                      size="md"
                      value={item.id}
                      onChange={() => handleCheckboxChange(item.id)}
                      isChecked={checkedValue.includes(item.id)}
                    >
                      <CheckboxIndicator
                        mr="$2"
                        backgroundColor={
                          checkedValue.includes(item.id)
                            ? colors.primary
                            : "transparent"
                        }
                        borderColor="$gray300"
                      >
                        <CheckboxIcon
                          as={CheckIcon}
                          color={
                            checkedValue.includes(item.id)
                              ? "white"
                              : "transparent"
                          }
                        />
                      </CheckboxIndicator>
                    </Checkbox>
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

              <HStack justifyContent="space-between" mt={10} m={10}>
                <VStack space="md">
                  <Text
                    color={mode === "dark" ? "white" : "black"}
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                  >
                    Bayar Sebelum
                  </Text>
                  <Text fontSize={14} fontFamily="Lato" fontWeight="$semibold">
                    {tanggal}
                  </Text>
                </VStack>
                <CustomBadge variant="danger" label={jam} />
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
          );
        }}
      />

      {/* Floating Footer Button */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor={"transparent"}
        padding={16}
        borderTopWidth={1}
        borderColor={"transparent"}
      >
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          onPress={handleSubmit}
          isDisabled={loadingCreate}
        >
          <Text color="white">
            {loadingCreate
              ? "Memproses..."
              : `Bayar ${checkedValue.length} Tagihan`}
          </Text>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Berlangsung;
