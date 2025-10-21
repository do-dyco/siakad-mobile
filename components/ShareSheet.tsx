import React from "react";
import {
  TouchableOpacity,
  Alert,
  useColorScheme,
  Share,
  Linking,
  Platform,
} from "react-native";
import { Center, HStack, Text, VStack, Image } from "@gluestack-ui/themed";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomActionSheet from "@/components/CustomActionSheet";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

type ShareSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
  textColor?: string;
  imageUri?: string; // hasil tangkapan ViewShot (file://...)
  invoice?: string;
  nominal?: number | string;
};

export default function ShareSheet({
  isOpen,
  onClose,
  bgColor = "white",
  textColor = "black",
  imageUri,
  invoice,
  nominal,
}: ShareSheetProps) {
  const mode = useColorScheme();

  // 📤 Share gambar ke aplikasi lain (WhatsApp, Telegram, Instagram, dll)
  const shareImage = async () => {
    if (!imageUri) {
      Alert.alert("Gagal", "Gambar invoice belum tersedia untuk dibagikan.");
      return;
    }

    try {
      // Pastikan URI valid dan berbentuk file://
      const shareData = {
        title: "Bagikan Invoice",
        message: `📄 Invoice Pembayaran Anda\n\nInvoice: ${
          invoice || "-"
        }\nTotal: Rp. ${Number(nominal || 0).toLocaleString("id-ID")}`,
        url: imageUri, // hasil ViewShot (file://...)
      };

      const result = await Share.share(shareData);

      if (result.action === Share.sharedAction) {
        console.log("Berhasil dibagikan");
      } else if (result.action === Share.dismissedAction) {
        console.log("Dibatalkan pengguna");
      }
    } catch (e) {
      console.error("Gagal share gambar:", e);
      Alert.alert(
        "Gagal",
        "Tidak dapat membagikan gambar invoice. Silakan coba simpan manual ke galeri."
      );
    }

    onClose();
  };

  // 📧 Buka email langsung dengan subject, body, dan lampiran gambar
  const openEmail = async () => {
    if (!imageUri) {
      Alert.alert("Gagal", "Gambar invoice belum tersedia untuk dilampirkan.");
      return;
    }

    // Fallback ke mailto secara langsung untuk menghindari dialog ganda
    const subject = `Invoice Pembayaran #${invoice || ""}`;
    const body = `Halo,\n\nBerikut rincian pembayaran Anda:\n\nInvoice: ${
      invoice || "-"
    }\nTotal: Rp. ${Number(nominal || 0).toLocaleString(
      "id-ID"
    )}\n\nGambar invoice terlampir. Terima kasih.`;

    const emailUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        // Jika mailto tidak didukung, coba menggunakan Share API untuk mengirim file
        const shareData = {
          title: "Kirim Invoice via Email",
          message: `Halo,\n\nBerikut rincian pembayaran Anda:\n\nInvoice: ${
            invoice || "-"
          }\nTotal: Rp. ${Number(nominal || 0).toLocaleString(
            "id-ID"
          )}\n\nTerima kasih.`,
          url: imageUri, // lampirkan gambar invoice
        };

        const result = await Share.share(shareData);

        if (result.action === Share.sharedAction) {
          console.log("Email berhasil dikirim");
        } else if (result.action === Share.dismissedAction) {
          console.log("Pembagian email dibatalkan pengguna");
        }
      }
    } catch (e) {
      console.error("Gagal membuka email:", e);
      Alert.alert("Gagal", "Tidak dapat membuka aplikasi email.");
    }

    onClose();
  };

  return (
    <CustomActionSheet isOpen={isOpen} onClose={onClose} bgColor={bgColor}>
      <VStack space="md" alignItems="center">
        {/* Judul */}
        <Center>
          <Text
            color={mode === "dark" ? "white" : "black"}
            fontFamily="Lato"
            fontSize={14}
            fontWeight="$semibold"
          >
            Bagikan Invoice Sebagai Gambar
          </Text>
        </Center>

        {/* Preview Thumbnail */}
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            alt="Invoice Preview"
            width={200}
            height={120}
            borderRadius={12}
            mt={10}
          />
        ) : (
          <Text fontSize={12} color={mode === "dark" ? "#AAA" : "#666"} mt={10}>
            Gambar belum tersedia
          </Text>
        )}

        {/* Barisan ikon share */}
        <HStack
          w="100%"
          justifyContent="space-around"
          alignItems="center"
          mt={15}
        >
          {/* WhatsApp */}
          <TouchableOpacity onPress={shareImage} activeOpacity={0.7}>
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="whatsapp"
                size={36}
                color="#25D366"
              />
              <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                WhatsApp
              </Text>
            </VStack>
          </TouchableOpacity>

          {/* Instagram */}
          <TouchableOpacity onPress={shareImage} activeOpacity={0.7}>
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="instagram"
                size={36}
                color="#C13584"
              />
              <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                Instagram
              </Text>
            </VStack>
          </TouchableOpacity>

          {/* Telegram */}
          <TouchableOpacity onPress={shareImage} activeOpacity={0.7}>
            <VStack alignItems="center">
              <MaterialIcons name="telegram" size={36} color="#0088cc" />
              <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                Telegram
              </Text>
            </VStack>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity onPress={openEmail} activeOpacity={0.7}>
            <VStack alignItems="center">
              <MaterialCommunityIcons
                name="email-outline"
                size={36}
                color="#FFA500"
              />
              <Text mt={2} fontSize={14} color={textColor} fontFamily="Lato">
                Email
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>

        {/* Tombol tutup */}
        <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
          <Text
            mt={20}
            fontSize={14}
            fontFamily="Lato-Bold"
            color={mode === "dark" ? "#AAA" : "#555"}
          >
            Tutup
          </Text>
        </TouchableOpacity>
      </VStack>
    </CustomActionSheet>
  );
}
