import colors from "@/src/config/colors";
import {
  Entypo,
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
      <Box
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        borderWidth={1}
        borderColor="transparent"
        mt={60}
        height={screenHeight / 5}
        position="absolute"
        width="95%"
        mx={10}
      >
        <ImageBackground
          source={require("@/assets/images/One.png")}
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            width: "auto",
            height: screenHeight / 5,
          }}
          imageStyle={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        >
          <VStack mt={2}>
            <Text m={10} fontSize={12} color="white">
              Total Saldo Anda
            </Text>
            <HStack space="md">
              <HStack m={10} justifyContent="space-between" mr="10%" mb={40}>
                <HStack space="md">
                  <Text fontWeight={"$bold"} color={"white"}>
                    Rp.104.589.000
                  </Text>
                  <Entypo name="eye-with-line" size={25} color={"white"} />
                </HStack>
              </HStack>
            </HStack>
          </VStack>
        </ImageBackground>
      </Box>
    </>
  );
};

export default SaldoBox;
