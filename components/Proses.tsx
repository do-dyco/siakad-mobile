import DashedDivider from "@/components/dashedDivider";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  Spinner,
  Center,
} from "@gluestack-ui/themed";
import React, { useMemo } from "react";
import {
  TouchableOpacity,
  useColorScheme,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import CustomBadge from "./CustomBadge";
import NoData from "./NoData";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

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

type Props = {
  data?: ItemType[];
  onReload?: () => Promise<void> | void;
  onLoadMore?: () => Promise<void> | void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  isRefreshing?: boolean;
  onScrollPositionChange?: (offset: number) => void;
  initialScrollOffset?: number;
  currentTab?: string; // Tab info untuk navigation
};

const Proses = ({
  data = [],
  onReload,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isRefreshing = false,
  onScrollPositionChange,
  currentTab = "1",
}: Props) => {
  const mode = useColorScheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  // ✅ Dedup data
  const uniqueData = useMemo(() => {
    const seen = new Set<string>();
    const filtered = data.filter((item) => {
      const key = `${item.id}-${item.no_invoice}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return filtered;
  }, [data]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Berhasil</ToastTitle>
              <ToastDescription>
                {label} telah disalin ke clipboard
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } catch {
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Gagal menyalin ke clipboard</ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    }
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const handleRefresh = async () => {
    if (onReload) await onReload();
  };

  const loadingRef = React.useRef(false);

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore || loadingRef.current) return;
    loadingRef.current = true;
    try {
      await onLoadMore?.();
    } finally {
      loadingRef.current = false;
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    onScrollPositionChange?.(currentScrollY);
  };

// contoh handle navigate di Proses.tsx
const handleNavigateToDetail = (noInvoice: string) => {
  router.push({
    pathname: "/detailTagihan",
    params: { 
      noInvoice,
      from: "/tagihan",
      activeTab: "1", // ✅ tab "Dalam Proses"
    },
  });
};


  // ✅ Footer Loader & Info
  const renderFooter = () => {
    if (isLoadingMore && hasMore) {
      return (
        <Center py={30}>
          <Spinner size="large" color={colors.primary} />
          <Text
            color={mode === "dark" ? "white" : "black"}
            fontSize={14}
            mt={12}
            fontFamily="Lato"
            fontWeight="$medium"
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
  

  if (!uniqueData || uniqueData.length === 0) {
    return (
      <NoData
        title="Belum ada tagihan dalam proses"
        desc="Tagihan yang sedang dalam proses akan muncul di sini"
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={{
        padding: 16,
        paddingBottom: insets.bottom + 48,
        flexGrow: 1,
      }}
      data={uniqueData}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyExtractor={(item, index) =>
        `${item.id || "noid"}-${item.no_invoice || "noinv"}-${index}`
      }
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleNavigateToDetail(item.no_invoice)}
          onLongPress={() => copyToClipboard(item.no_invoice, "Nomor Invoice")}
        >
          <Box
            borderWidth={1}
            borderRadius={10}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
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
                      color="white"
                    />
                  </Box>
                  <Text
                    color={mode === "dark" ? "white" : "black"}
                    fontSize={14}
                    fontFamily="Lato"
                    fontWeight="$semibold"
                  >
                    Invoice
                  </Text>
                </HStack>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontSize={14}
                  fontFamily="Lato"
                  fontWeight="$semibold"
                >
                  {item.no_invoice}
                </Text>
              </HStack>
            </Box>

            {/* Body */}
            <HStack justifyContent="space-between" mt={10} m={10}>
              <VStack space="md">
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontSize={14}
                  fontFamily="Lato"
                  fontWeight="$semibold"
                >
                  Nama Tagihan
                </Text>
                <Text fontSize={14} fontFamily="Lato" fontWeight="$semibold">
                  {item.master_tagihan?.nama ?? "-"}
                </Text>
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
                  Nominal
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
        </TouchableOpacity>
      )}
    />
  );
};

export default Proses;