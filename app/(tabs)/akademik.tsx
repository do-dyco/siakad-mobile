import {
  Input,
  InputField,
  VStack,
  Text,
  Button,
  Center,
  SafeAreaView,
  ScrollView,
  Select,
  SelectPortal,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  HStack,
  Badge,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { Link, useRouter } from "expo-router";
import { Dimensions, Pressable, useColorScheme } from "react-native";
import Header from "@/components/Header";
import NoData from "@/components/NoData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function akademik() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const dataKelas = [
    {
      id: "1",
      kelas: "X - IPA 1",
    },
    {
      id: "2",
      kelas: "VII - C",
    },
    {
      id: "3",
      kelas: "VIII - D",
    },
    {
      id: "4",
      kelas: "IX - G",
    },
    {
      id: "5",
      kelas: "XIII - B",
    },
  ];
  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Center>
          <Text
            color={mode === "dark" ? "white" : "black"}
            mt={40}
            font_type={"bold"}
          >
            Akademik
          </Text>
        </Center>

        <VStack space="md" mx={10} mt={10}>
          <Text>Kelas saat ini</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {dataKelas.map((item, index) => (
              <Badge
                key={item.id || index}
                size="md"
                variant="solid"
                borderRadius={20}
                backgroundColor={mode === "dark" ? "#22262F" : "white"}
                alignItems="center"
                justifyContent="center"
                height={30}
                px={4}
              >
                <Text color={mode === "dark" ? "white" : "black"}>
                  {item.kelas}
                </Text>
              </Badge>
            ))}
          </ScrollView>
          <Select>
            <SelectTrigger variant="rounded" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon>
                <Icon as={ChevronDownIcon} style={{ marginRight: 3 }} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Genap" value="genap" />
                <SelectItem label="Ganjil" value="ganjil" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <HStack justifyContent="space-between" mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>Rangking</Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada rangking"
            desc="Pembelajaran masih berlangsung, rangking akan muncul setelah pembelajaran selesai"
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />

          <HStack justifyContent="space-between" mt={20} mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>
              Hafalan Al-Qur'an
            </Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada hafalan Al-Qur'an"
            desc="Hafalan Al-Qur’an akan muncul di sini, ketika anda sudah mensetor hafalan."
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />

          <HStack justifyContent="space-between" mt={20} mb={-150}>
            <Text color={mode === "dark" ? "white" : "black"}>
              Nilai Rata - Rata
            </Text>
            <Text>Lihat Detail</Text>
          </HStack>
          <NoData
            title="Belum ada Nilai"
            desc="Nila Rata - Rata akan muncul disini, ketika anda sudah mempunyai nilai"
            icon={
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={40}
                color={mode === "dark" ? "white" : "black"}
              />
            }
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
