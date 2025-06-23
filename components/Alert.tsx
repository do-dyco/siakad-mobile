import React from "react";
import { Alert, Box, Text, VStack } from "@gluestack-ui/themed";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type AlertCustomProps = {
  title: string;
  message: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  boxBgColor?: string;
  borderColorLight?: string;
  borderColorDark?: string;
  backgroundColorLight?: string;
  backgroundColorDark?: string;
};

const AlertCustom: React.FC<AlertCustomProps> = ({
  title,
  message,
  iconName = "info-outline",
  iconColor,
  boxBgColor = "$white",
  borderColorLight = "#E0E0E0",
  borderColorDark = "#333",
  backgroundColorLight = "$white",
  backgroundColorDark = "$black",
}) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <Box
      borderWidth={1}
      borderColor={isDark ? borderColorDark : borderColorLight}
      borderRadius={16}
      width={"$full"}
    >
      <Alert
        mx="$2.5"
        bgColor={isDark ? backgroundColorDark : backgroundColorLight}
        variant="solid"
        flexDirection="row"
        alignItems="flex-start"
        gap="$3"
        py="$3"
        px="$3"
      >
        <Box bgColor={boxBgColor} p="$1" borderRadius={999}>
          <MaterialIcons
            name={iconName}
            size={24}
            color={iconColor || (isDark ? "#fff" : "#000")}
          />
        </Box>
        <VStack flex={1} space="md">
          <Text
            color={isDark ? "$white" : "$black"}
            fontSize={14}
            fontFamily="Lato"
            fontWeight="$bold"
          >
            {title}
          </Text>
          <Text
            color={isDark ? "$white" : "$black"}
            fontSize={14}
            fontFamily="Lato"
            flexWrap="wrap"
          >
            {message}
          </Text>
        </VStack>
      </Alert>
    </Box>
  );
};

export default AlertCustom;
