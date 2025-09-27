import React, { useRef } from "react";
import {
  TouchableOpacity,
  Share,
  Linking,
  Alert,
  useColorScheme,
} from "react-native";
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import CustomActionSheet from "@/components/CustomActionSheet";

type ShareSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
  textColor?: string;
  invoice?: string;
  nominal?: number;
};

// ✅ Komponen invoice preview (hanya ditampilkan, tidak dipakai untuk share)
const InvoicePreview = React.forwardRef<any, ShareSheetProps>(
  ({ invoice, nominal }, ref) => (
    <ViewShot ref={ref} options={{ format: "png", quality: 0.9 }} style={{backgroundColor: mode === isDark ? "black" : "white", borderRadius: 16}}>
      <VStack
        p={20}
        bg="white"
        borderRadius={12}
        borderWidth={1}
        borderColor="#ccc"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize={18} mb={5}>
          Invoice #{invoice}
        </Text>
        <Text fontSize={16}>Total: Rp. {nominal?.toLocaleString("id-ID")}</Text>
      </VStack>
    </ViewShot>
  )
);

export default function ShareSheet({
  isOpen,
  onClose,
  bgColor = "white",
  textColor = "black",
  invoice,
  nominal,
}: ShareSheetProps) {
  
    const viewShotRef = useRef<any>(null);
    const mode = useColorScheme();

  // 📤 Share invoice sebagai teks (via native share sheet)
  const shareAsText = async () => {
    try {
      const message = `📄 Invoice #${invoice}\nTotal: Rp. ${nominal?.toLocaleString(
        "id-ID"
      )}\n\nTerima kasih telah melakukan pembayaran.`;

      await Share.share({
        message,
        title: "Bagikan Invoice",
      });
    } catch (e) {
      console.error("Gagal share:", e);
    }
    onClose();
  };

  const openWhatsApp = (message: string) => {
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "WhatsApp tidak terpasang di perangkat ini")
    );
  };

  const openInstagram = () => {
    const url = "instagram://app";
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Instagram tidak terpasang di perangkat ini")
    );
  };

  const openTelegram = (message: string) => {
    const url = `tg://msg?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Telegram tidak terpasang di perangkat ini")
    );
  };

  const openEmail = (subject: string, body: string) => {
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Tidak dapat membuka aplikasi email")
    );
  };

  const defaultMessage = `📄 Invoice #${invoice}\nTotal: Rp. ${nominal?.toLocaleString(
    "id-ID"
  )}`;

  return (
    <CustomActionSheet isOpen={isOpen} onClose={onClose} bgColor={bgColor}>
      {/* Preview invoice */}
      <VStack space="md">
        <Center>

        <Text 
            color={mode === "dark" ? "white" : "black"}
            fontFamily="Lato"
            fontSize={14}
            fontWeight={"$semibold"}>
            Share dengan
        </Text>
        </Center>

            {/* Bagian share icons */}
            <HStack
                w="100%"
                justifyContent="space-around"
                alignItems="center"
                mt={5}
            >
                <TouchableOpacity onPress={() => openWhatsApp(defaultMessage)}>
                <VStack alignItems="center">
                    <MaterialCommunityIcons name="whatsapp" size={32} color="green" />
                    <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                    WhatsApp
                    </Text>
                </VStack>
                </TouchableOpacity>

                <TouchableOpacity onPress={openInstagram}>
                <VStack alignItems="center">
                    <MaterialCommunityIcons name="instagram" size={32} color="#C13584" />
                    <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                    Instagram
                    </Text>
                </VStack>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openTelegram(defaultMessage)}>
                <VStack alignItems="center">
                    <MaterialCommunityIcons name="telegram" size={32} color="#0088cc" />
                    <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                    Telegram
                    </Text>
                </VStack>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => openEmail("Invoice Pembayaran", defaultMessage)}
                >
                <VStack alignItems="center">
                    <MaterialCommunityIcons
                    name="email-outline"
                    size={32}
                    color="#ff9900"
                    />
                    <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                    Email
                    </Text>
                </VStack>
                </TouchableOpacity>
            </HStack>
        </VStack>
    </CustomActionSheet>
  );
}
