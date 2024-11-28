import { Octicons } from "@expo/vector-icons";
import { Box, Center, Text } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const NoData = (props: any) => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const icon = props.icon;

  return (
    <Box justifyContent="center" mt={screenHeight / 3}>
      <Center>
        {props.icon === "" ? (
          <Octicons
            name="checklist"
            size={30}
            color={mode === "dark" ? "white" : "black"}
          />
        ) : (
          props.icon
        )}

        <Text fontWeight={"$bold"} color={mode === "dark" ? "white" : "black"}>
          {props.title}
        </Text>
        <Text
          color={mode === "dark" ? "white" : "black"}
          size="sm"
          w={"80%"}
          textAlign="center"
        >
          {props.desc}
        </Text>
      </Center>
    </Box>
  );
};

export default NoData;
