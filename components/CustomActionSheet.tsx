import React, { ReactNode } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@gluestack-ui/themed";

interface CustomActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
  zIndex?: number;
  bgColor?: string;
}

const CustomActionSheet: React.FC<CustomActionSheetProps> = ({
  isOpen,
  onClose,
  children,
  zIndex = 999,
  bgColor,
}) => {
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      trapFocus={false}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={zIndex} backgroundColor={bgColor}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default CustomActionSheet;
