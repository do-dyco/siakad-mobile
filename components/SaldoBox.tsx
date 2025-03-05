import colors from "@/src/config/colors";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Box,
  HStack,
  ImageBackground,
  VStack,
  Text,
  Center,
  Input,
  InputField,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  ScrollView,
  Switch,
  Radio,
  CircleIcon,
  RadioIndicator,
  RadioIcon,
  RadioGroup,
  Divider,
  Badge,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const SaldoBox = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const [chooseDate, setChooseDate] = useState(false);

  return (
    <>
      <VStack>
        <Box
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          borderWidth={1}
          borderColor="transparent"
          mx={20}
        >
          <ImageBackground
            source={require("@/assets/images/One.png")}
            style={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: "hidden",
            }}
            imageStyle={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <VStack>
              <Text m={16} fontSize={16} color="white">
                Total Saldo Anda
              </Text>
              <HStack m={16} justifyContent="space-between" mr="10%" mb={40}>
                <HStack space="md">
                  <Text
                    fontWeight="bold"
                    color="white"
                    style={{ fontSize: 24 }}
                  >
                    Rp.104.589.000
                  </Text>
                  <Feather name="eye-off" size={24} color="white" />
                </HStack>

                <HStack space="md">
                  <Text
                    fontWeight="bold"
                    color="white"
                    style={{ fontSize: 24 }}
                  >
                    |
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/topUp")}>
                    <VStack alignItems="center">
                      <Box borderRadius={6} backgroundColor="white" p={3}>
                        <MaterialIcons name="add" size={20} color="black" />
                      </Box>
                      <Text
                        mt={1}
                        textAlign="center"
                        color="white"
                        style={{ fontSize: 12 }}
                      >
                        Top Up
                      </Text>
                    </VStack>
                  </TouchableOpacity>
                </HStack>
              </HStack>
            </VStack>
          </ImageBackground>
        </Box>

        <Box
          borderRadius={10}
          borderWidth={1}
          backgroundColor={"#506A7A"}
          height={50}
          borderColor="transparent"
          mt={-10}
          mx={20}
        >
          <HStack justifyContent="space-between" mx={20} my={3} mt={15}>
            <Text color="white">Detail</Text>
            <AntDesign name="arrowright" size={20} color="white" />
          </HStack>
        </Box>
      </VStack>
    </>
  );
};

export default SaldoBox;
