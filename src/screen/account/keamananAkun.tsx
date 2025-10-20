import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Box, Button, HStack, Input, InputField, InputSlot, SafeAreaView, ScrollView, Text, VStack, useToast } from '@gluestack-ui/themed';


const KeamananAkun = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleSubmit = () => {
    if (!passwordBaru || !konfirmasiPassword) {
      Alert.alert("Error", "Silakan isi semua kolom password baru.");
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      Alert.alert("Error", "Konfirmasi password tidak cocok.");
      return;
    }

    Alert.alert("Sukses", "Kata sandi berhasil diganti!");
    router.push("/(tabs)");
  };

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Keamanan Akun"} />

        <VStack space="md">
          <Box
            mx={40}
            borderWidth={1}
            borderColor="transparent"
            borderRadius={10}
            bgColor={mode === "dark" ? "#22262F" : "white"}
            mt={20}
            width={"80%"}
          >
            <VStack space="2xl" p={10} my={20}>
              {/* Password Lama */}
              <Input variant="outline" size="md" borderRadius={8}>
                <InputField
                  placeholder="Kata sandi lama"
                  secureTextEntry={secureOld}
                  onChangeText={setPasswordLama}
                />
                <InputSlot mx={10} onPress={() => setSecureOld(!secureOld)}>
                  <Entypo
                    name={secureOld ? "eye-with-line" : "eye"}
                    size={22}
                    color={"#535862"}
                  />
                </InputSlot>
              </Input>

              {/* Password Baru */}
              <Input variant="outline" size="md" borderRadius={8}>
                <InputField
                  placeholder="Kata sandi baru"
                  secureTextEntry={secureNew}
                  onChangeText={setPasswordBaru}
                />
                <InputSlot mx={10} onPress={() => setSecureNew(!secureNew)}>
                  <Entypo
                    name={secureNew ? "eye-with-line" : "eye"}
                    size={22}
                    color={"#535862"}
                  />
                </InputSlot>
              </Input>

              {/* Konfirmasi Password */}
              <Input variant="outline" size="md" borderRadius={8}>
                <InputField
                  placeholder="Konfirmasi kata sandi baru"
                  secureTextEntry={secureConfirm}
                  onChangeText={setKonfirmasiPassword}
                />
                <InputSlot
                  mx={10}
                  onPress={() => setSecureConfirm(!secureConfirm)}
                >
                  <Entypo
                    name={secureConfirm ? "eye-with-line" : "eye"}
                    size={22}
                    color={"#535862"}
                  />
                </InputSlot>
              </Input>

              <Button
                size="md"
                variant="solid"
                action="primary"
                bgColor={colors.primary}
                borderRadius={10}
                mt={20}
                mx={30}
                onPress={handleSubmit}
              >
                <HStack space="md">
                  <Text color="#ffffff">Ganti Kata Sandi</Text>
                </HStack>
              </Button>
            </VStack>
          </Box>
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default KeamananAkun;
