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
  Spinner,
  Center,
} from "@gluestack-ui/themed";
import React, { useState, useRef, useMemo } from "react";
import {
  Dimensions,
  useColorScheme,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  status?: string;
  created_at?: string;
  updated_at?: string;
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
  onReload?: () => Promise<void> | void;
  onLoadMore?: () => Promise<void> | void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  isRefreshing?: boolean;
  initialScrollOffset?: number;
  onScrollPositionChange?: (offset: number) => void;
  currentTab?: string; // Tab info untuk navigation
};

const Berlangsung = ({
  data = [],
  onReload,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isRefreshing = false,
  initialScrollOffset = 0,
  onScrollPositionChange,
  currentTab = "0", // Default tab Sedang Berlangsung
}: Props) => {
  const mode = useColorScheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 768;
  const bottomSpace = isTablet ? 32 : 16;

  const flatListRef = useRef<FlatList<ItemType>>(null);

  const [checkedValue, setCheckedValue] = useState<string[]>([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  const { setSelectedTagihan } = useTagihanStore();
  

  // ✅ Dedup data biar key FlatList unik
  const uniqueData = useMemo(() => {
    const seen = new Set<string>();
    return data.filter((item) => {
      const key = `${item.id}-${item.no_tagihan}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data]);

  // ✅ Format Rupiah
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  // ✅ Checkbox handler
  const handleCheckboxChange = (value: string) => {
    setCheckedValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ Refresh handler (reset hanya saat reload total)
  const handleRefresh = async () => {
    if (onReload) {
      await onReload();
      setCheckedValue([]); // reset setelah reload
    }
  };

  // ✅ Infinite scroll handler
  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore && onLoadMore && scrollDirection === "down") {
      onLoadMore();
    }
  };

  // ✅ Scroll tracking
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    onScrollPositionChange?.(currentScrollY);

    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection("up");
    }

    setLastScrollY(currentScrollY);
  };

  // ✅ Submit invoice handler
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

      // Simpan tagihan terpilih di store
      const selectedData = uniqueData.filter((item) =>
        checkedValue.includes(item.id)
      );
      setSelectedTagihan(selectedData);

      // Hit API create invoice
      const payload = { tagihanUserIds: checkedValue };
      const response = await apiService.createInvoiceNumber(payload);

      console.log("Create Invoice Response:", response);
      
      const inv: InvoiceTagihan = response?.data?.invoice_tagihan ?? {};

      if (!inv?.no_invoice) throw new Error("Nomor invoice tidak tersedia");

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

      if (onReload) await onReload();
      setCheckedValue([]); // reset setelah sukses
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

  // ✅ Footer loader / info
  const renderFooter = () => {
    if (isLoadingMore && hasMore) {
      return (
        <Center py={30}>
          <Spinner size="large" color={colors.primary} />
          <Text
            mt={12}
            fontSize={14}
            fontFamily="Lato"
            fontWeight="$medium"
            color={mode === "dark" ? "white" : "black"}
          >
            Memuat tagihan lainnya...
          </Text>
        </Center>
      );
    }

    if (!hasMore && uniqueData.length > 0) {
      return (
        <Center py={20}>
          <Text
            fontSize={12}
            fontFamily="Lato"
            color={
              mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
            }
          >
            Semua data sudah dimuat
          </Text>
        </Center>
      );
    }

    return null;
  };

  // ✅ Early return jika kosong
  if (!uniqueData || uniqueData.length === 0) {
    return (
      <NoData
        title="Belum ada tagihan berlangsung"
        desc="Tagihan yang sedang berlangsung akan muncul di sini"
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <FlatList
        ref={flatListRef}
        data={uniqueData}
        keyExtractor={(item, index) =>
          `${item.id || "noid"}-${item.no_tagihan || "notag"}-${index}`
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 100,
          flexGrow: 1,
        }}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => {
          const [tanggal, jam] = item.expire_at?.split(" ") ?? ["-", "-"];

          return (
            <Box
              mb={20}
              borderWidth={1}
              borderRadius={10}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
            >
              {/* Header box */}
              <Box
                borderTopRightRadius={10}
                borderTopLeftRadius={10}
                bgColor={mode === "light" ? colors.gray.light[200] : colors.box}
              >
                <HStack justifyContent="space-between" m={10}>
                  <HStack space="md">
                    {/* Checkbox */}
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

                    {/* Icon */}
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
                        color="white"
                      />
                    </Box>

                    <Text
                      fontSize={14}
                      fontFamily="Lato"
                      fontWeight="$semibold"
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Tagihan
                    </Text>
                  </HStack>

                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    {item.no_tagihan}
                  </Text>
                </HStack>
              </Box>

              {/* Body */}
              <HStack justifyContent="space-between" mt={10} m={10}>
                <VStack space="md">
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
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
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Nama Tagihan
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    {item.master_tagihan?.nama ?? "-"}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between" mt={10}>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Nominal Tertagih
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                    color={mode === "dark" ? "white" : "black"}
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
        bottom={30}
        left={0}
        right={0}
        padding={16}
        backgroundColor="transparent"
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