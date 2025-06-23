import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Badge, Text } from "@gluestack-ui/themed";
import colors from "@/src/config/colors";

type Variant =
  | "success"
  | "success2"
  | "danger"
  | "warning"
  | "danger2"
  | "warning2"
  | "primary";

interface CustomBadgeProps {
  variant: Variant;
  label: string;
  style?: StyleProp<ViewStyle>;
}

const badgeStyles = {
  success: {
    bg: colors.success[50],
    color: colors.success[700],
  },
  success2: {
    bg: colors.success[950],
    color: colors.success[300],
  },
  danger: {
    bg: colors.error[50],
    color: colors.error[700],
  },
  warning: {
    bg: colors.warning[50],
    color: colors.warning[700],
  },
  danger2: {
    bg: colors.error[950],
    color: colors.error[300],
  },
  warning2: {
    bg: colors.warning[950],
    color: colors.warning[300],
  },
  primary: {
    bg: colors.gray.light[200],
    color: "black",
  },
};

const CustomBadge: React.FC<CustomBadgeProps> = ({ variant, label, style }) => {
  const { bg, color } = badgeStyles[variant];

  return (
    <Badge
      borderRadius={12}
      backgroundColor={bg}
      px={6}
      py={1}
      alignSelf="flex-start"
      style={style} // menerima style dari luar
    >
      <Text
        fontSize={14}
        fontWeight="bold"
        color={color}
        fontFamily="Lato"
        m={2}
      >
        {label}
      </Text>
    </Badge>
  );
};

export default CustomBadge;
