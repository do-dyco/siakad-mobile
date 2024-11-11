import { Box, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";

const SkeletonList = () => {
  const items = Array.from({ length: 5 });
  return (
    <ScrollView>
      {items.map((_, index) => (
        <MotiView
          key={index}
          style={{ padding: 5, marginRight: 20, marginBottom: 30 }}
        >
          <HStack space="md">
            <Skeleton height={50} width={50} />
            <VStack space="sm">
              <HStack justifyContent="space-between" space="lg">
                <Skeleton radius="square" height={25} width={180} />
                <Skeleton radius="square" height={25} width={80} />
              </HStack>
              <HStack justifyContent="space-between" space="lg">
                <Skeleton radius="square" height={25} width={150} />
                <Skeleton radius="square" height={25} width={80} />
              </HStack>
              <HStack justifyContent="space-between" space="lg">
                <Skeleton radius="square" height={25} width={200} />
                <Skeleton radius="square" height={25} width={80} />
              </HStack>
            </VStack>
          </HStack>
        </MotiView>
      ))}
    </ScrollView>
  );
};

export default SkeletonList;
