import DashedDivider from "@/components/dashedDivider";
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
} from "@gluestack-ui/themed";
import React from "react";

const Berlangsung = () => {
  return (
    <ScrollView>
      <VStack m={10}>
        <Box borderWidth={1} borderRadius={10} borderColor="transparent">
          <Box borderTopRightRadius={10} borderTopLeftRadius={10}>
            <HStack justifyContent="space-between">
              <HStack space="md">
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  value={""}
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                </Checkbox>
                <Box borderRadius={8} borderWidth={1} borderColor="transparent">
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color={"white"}
                  />
                </Box>
                <Text>Tagihan</Text>
              </HStack>
              <Text>TG00294581</Text>
            </HStack>
          </Box>

          <HStack justifyContent="space-between">
            <VStack space="md">
              <Text>Bayar Sebelum</Text>
              <Text>INV/20241022 16:49</Text>
            </VStack>
            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              bgColor="#22262F"
              width={"30%"}
            >
              <HStack space="xs">
                <Text color="white" size="xs">
                  05:59:49
                </Text>
              </HStack>
            </Badge>
          </HStack>
          <DashedDivider />
          <HStack justifyContent="space-between">
            <Text>Nama Tagihan</Text>
            <Text>Pembelian Buku</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text>Nominal Tertagih</Text>
            <Text>Rp.100.000</Text>
          </HStack>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default Berlangsung;
