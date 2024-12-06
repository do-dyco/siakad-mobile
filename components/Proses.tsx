import DashedDivider from "@/components/dashedDivider";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  VStack,
  Box,
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Text,
  Badge,
  BadgeText,
  FlatList,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const Proses = (props: any) => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const data = props.data;
  return (
    <ScrollView>
      <VStack m={10} mt={20}>
        <FlatList
          data={data}
          renderItem={({ item }: any) => (
            <Box
              borderWidth={1}
              borderRadius={10}
              borderColor={colors.border}
              mb={20}
            >
              <Box
                borderTopRightRadius={10}
                borderTopLeftRadius={10}
                bgColor={colors.box}
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
                    <Text color={mode === "dark" ? "white" : "black"}>
                      Tagihan
                    </Text>
                  </HStack>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    {item.no_tagihan}
                  </Text>
                </HStack>
              </Box>

              <HStack justifyContent="space-between" mt={10} m={10}>
                <VStack space="md">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Invoice Number
                  </Text>
                  <Text color={colors.primary}>{item.no_invoice} 16:49</Text>
                </VStack>
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={20}
                  backgroundColor={"#451A03"}
                  alignContent="center"
                  justifyContent="center"
                  height={30}
                >
                  <Text color="#FCD34D">05:59:49</Text>
                </Badge>
              </HStack>
              <DashedDivider />
              <VStack mx={10} mt={10} mb={10}>
                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Nama Tagihan
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    {item.tagihan_name}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Nominal Tertagih
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Rp.{item.total}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          )}
          keyExtractor={(item): any => item.id}
        />
      </VStack>
    </ScrollView>
  );
};

export default Proses;
