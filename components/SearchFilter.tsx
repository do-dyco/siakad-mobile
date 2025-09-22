import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import {
  HStack,
  Input,
  InputField,
  Box,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed";
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import colors from "@/src/config/colors";

export interface FilterOption {
  label: string;
  value: string;
  onPress: () => void;
}

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (text: string) => void;
  onFilterPress?: () => void;
  onSecondFilterPress?: () => void;
  onSearchSubmit?: () => void;
  placeholder?: string;
  searchWidth?: string;
  showFilter?: boolean;
  showSecondFilter?: boolean;
  filterIcon?: keyof typeof Ionicons.glyphMap;
  secondFilterIcon?: keyof typeof Ionicons.glyphMap;
  debounceDelay?: number;
  style?: object;
  // ActionSheet props for main filter
  enableActionSheet?: boolean;
  filterOptions?: FilterOption[];
  actionSheetTitle?: string;
  actionSheetMessage?: string;
  // ActionSheet props for second filter
  enableSecondActionSheet?: boolean;
  secondFilterOptions?: FilterOption[];
  secondActionSheetTitle?: string;
  secondActionSheetMessage?: string;
}

type ActionSheetType = 'main' | 'second' | null;

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue,
  onSearchChange,
  onFilterPress,
  onSecondFilterPress,
  onSearchSubmit,
  placeholder = "Cari disini",
  searchWidth = "75%",
  showFilter = true,
  showSecondFilter = false,
  filterIcon = "filter",
  secondFilterIcon = "options",
  debounceDelay = 3000,
  style,
  enableActionSheet = false,
  filterOptions = [],
  actionSheetTitle = "Pilih Filter",
  actionSheetMessage,
  enableSecondActionSheet = false,
  secondFilterOptions = [],
  secondActionSheetTitle = "Pilih Opsi",
  secondActionSheetMessage,
}) => {
  const mode = useColorScheme();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeActionSheet, setActiveActionSheet] = useState<ActionSheetType>(null);

  useEffect(() => {
    // cleanup saat unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => setActiveActionSheet(null);

  const handleFilterPress = () => {
    if (enableActionSheet && filterOptions.length > 0) {
      setActiveActionSheet('main');
    } else {
      onFilterPress?.();
    }
  };

  const handleSecondFilterPress = () => {
    if (enableSecondActionSheet && secondFilterOptions.length > 0) {
      setActiveActionSheet('second');
    } else {
      onSecondFilterPress?.();
    }
  };

  const handleFilterOptionPress = (option: FilterOption) => {
    option.onPress();
    handleClose();
  };

  const handleChangeText = (text: string) => {
    onSearchChange(text);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout for debounce
    if (debounceDelay > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        console.log("Search triggered:", text);
        onSearchSubmit?.();
      }, debounceDelay);
    }
  };

  const handleSubmit = () => {
    // Clear timeout on manual submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onSearchSubmit?.();
  };

  // Calculate dynamic search width based on visible filters
  const calculateSearchWidth = () => {
    if (showFilter && showSecondFilter) return "70%";
    if (showFilter || showSecondFilter) return "80%";
    return "100%";
  };

  const dynamicSearchWidth = searchWidth === "75%" ? calculateSearchWidth() : searchWidth;

  return (
    <>
      <HStack space="md" alignItems="center" style={style}>
        <Input
          variant="rounded"
          width={dynamicSearchWidth}
          borderColor="transparent"
          backgroundColor={
            mode === "dark" ? colors.gray.dark[800] : colors.gray.light[25]
          }
        >
          <InputField
            placeholder={placeholder}
            value={searchValue}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            placeholderTextColor={
              mode === "dark"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(0, 0, 0, 0.6)"
            }
          />
        </Input>

        {/* Main Filter Button */}
        {showFilter && (
          <TouchableOpacity onPress={handleFilterPress}>
            <Box
              borderRadius="$full"
              backgroundColor={
                mode === "light"
                  ? colors.gray.light[25]
                  : colors.gray.dark[800]
              }
            >
              <FontAwesome6
                name={"sliders"}
                size={25}
                color={mode === "dark" ? "white" : "black"}
                style={{ margin: 8 }}
              />
            </Box>
          </TouchableOpacity>
        )}

        {/* Second Filter Button */}
        {showSecondFilter && (
          <TouchableOpacity onPress={handleSecondFilterPress}>
            <Box
              borderRadius="$full"
              backgroundColor={
                mode === "light"
                  ? colors.gray.light[25]
                  : colors.gray.dark[800]
              }
            >
              <Ionicons
                name={secondFilterIcon}
                size={25}
                color={mode === "dark" ? "white" : "black"}
                style={{ margin: 8 }}
              />
            </Box>
          </TouchableOpacity>
        )}
      </HStack>

      {/* Main Filter ActionSheet */}
      <Actionsheet 
        isOpen={activeActionSheet === 'main'} 
        onClose={handleClose} 
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          
          {/* Title */}
          {actionSheetTitle && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$lg" fontWeight="$semibold">
                {actionSheetTitle}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {/* Message */}
          {actionSheetMessage && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$sm" color="$textLight500">
                {actionSheetMessage}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {/* Filter Options */}
          {filterOptions.map((option, index) => (
            <ActionsheetItem
              key={`main-${option.value}-${index}`}
              onPress={() => handleFilterOptionPress(option)}
            >
              <ActionsheetItemText>{option.label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}

          {/* Cancel Button */}
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText color="$red500">Batal</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      {/* Second Filter ActionSheet */}
      <Actionsheet 
        isOpen={activeActionSheet === 'second'} 
        onClose={handleClose} 
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          
          {/* Title */}
          {secondActionSheetTitle && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$lg" fontWeight="$semibold">
                {secondActionSheetTitle}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {/* Message */}
          {secondActionSheetMessage && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$sm" color="$textLight500">
                {secondActionSheetMessage}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {/* Second Filter Options */}
          {secondFilterOptions.map((option, index) => (
            <ActionsheetItem
              key={`second-${option.value}-${index}`}
              onPress={() => handleFilterOptionPress(option)}
            >
              <ActionsheetItemText>{option.label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}

          {/* Cancel Button */}
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText color="$red500">Batal</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default SearchFilter;