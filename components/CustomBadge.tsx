import React from 'react';
import { Badge, Text } from '@gluestack-ui/themed';
import colors from '@/src/config/colors';

type Variant = 'success' | 'danger' | 'warning';

interface CustomBadgeProps {
  variant: Variant;
  label: string;
}

const badgeStyles = {
  success: {
    bg: colors.success[50],
    color: colors.success[700],
  },
  danger: {
    bg: colors.error[50],
    color:  colors.error[700],
  },
  warning: {
    bg:  colors.warning[50],
    color:  colors.warning[700],
  },
  danger2: {
    bg: colors.error[950],
    color:  colors.error[300],
  }, 
  warning2: {
    bg: colors.warning[950],
    color:  colors.warning[300],
  },
  primary: {
    bg: colors.gray.light[200],
    color:  "black",
  },
};

const CustomBadge: React.FC<CustomBadgeProps> = ({ variant, label }) => {
  const { bg, color } = badgeStyles[variant];

  return (
    <Badge
      borderRadius={12}
      backgroundColor={bg}
      px={6}
      py={1}
      alignSelf="flex-start"
      
    >
      <Text fontSize={14} fontWeight="bold" color={color} fontFamily="Lato" m={2}>
        {label}
      </Text>
    </Badge>
  );
};

export default CustomBadge;
