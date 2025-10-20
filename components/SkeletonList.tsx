import colors from "@/src/config/colors";
import { Box, VStack } from '@gluestack-ui/themed';
import { Skeleton } from "moti/skeleton";
import React from "react";
import { useColorScheme } from "react-native";

type SkeletonListProps = {
  items?: number;
  gap?: number; // jarak antar skeleton (px)
};

const SkeletonList: React.FC<SkeletonListProps> = ({ items = 4, gap = 16 }) => {
  const mode = useColorScheme();
  const colorMode = mode === "dark" ? "dark" : "light";

  return (
    <VStack px={10} py={8}>
      {Array.from({ length: items }).map((_, idx) => (
        <Box
          key={idx}
          borderRadius={10}
          borderWidth={1}
          borderColor={mode === "dark" ? colors.border : colors.gray.light[200]}
          p={12}
          bgColor={mode === "dark" ? "black" : "white"}
          mb={idx !== items - 1 ? gap : 0} // ⬅️ jarak antar skeleton
        >
          <Skeleton
            colorMode={colorMode}
            width="60%"
            height={16}
            radius={6}
            style={{ marginBottom: 12 }}
          />
          <Skeleton
            colorMode={colorMode}
            width="100%"
            height={1}
            radius={0}
            style={{ marginVertical: 12 }}
          />
          <Skeleton
            colorMode={colorMode}
            width="30%"
            height={14}
            radius={6}
            style={{ marginBottom: 12 }}
          />
          <Skeleton
            colorMode={colorMode}
            width="50%"
            height={14}
            radius={6}
            style={{ marginTop: 8 }}
          />
        </Box>
      ))}
    </VStack>
  );
};

export default SkeletonList;
