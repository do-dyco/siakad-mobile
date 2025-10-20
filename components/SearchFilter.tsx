import React, { useRef, useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import {
  HStack,
  Input,
  InputField,
  Box,
  Text,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText
} from '@gluestack-ui/themed';
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
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
  enableActionSheet?: boolean;
  filterOptions?: FilterOption[];
  actionSheetTitle?: string;
  actionSheetMessage?: string;
  enableSecondActionSheet?: boolean;
  secondFilterOptions?: FilterOption[];
  secondActionSheetTitle?: string;
  secondActionSheetMessage?: string;
  selectedFilters?: string[];
  selectedSecondFilters?: string[];
  onClearAllFilters?: () => void;
  onRemoveFilter?: (filterLabel: string) => void;
}

type ActionSheetType = "main" | "second" | null;

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
  selectedFilters = [],
  selectedSecondFilters = [],
  onClearAllFilters,
  onRemoveFilter,
}) => {
  const mode = useColorScheme();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeActionSheet, setActiveActionSheet] = useState<ActionSheetType>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => setActiveActionSheet(null);

  const handleFilterPress = () => {
    if (enableActionSheet && filterOptions.length > 0) {
      setActiveActionSheet("main");
    } else {
      onFilterPress?.();
    }
  };

  const handleSecondFilterPress = () => {
    if (enableSecondActionSheet && secondFilterOptions.length > 0) {
      setActiveActionSheet("second");
    } else {
      onSecondFilterPress?.();
    }
  };

  const handleFilterOptionPress = (option: FilterOption, type: ActionSheetType) => {
    option.onPress();
  };

  const handleChangeText = (text: string) => {
    onSearchChange(text);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (debounceDelay > 0) {
      typingTimeoutRef.current = setTimeout(() => {
        onSearchSubmit?.();
      }, debounceDelay);
    }
  };

  const handleSubmit = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onSearchSubmit?.();
  };

  const handleClearAllFilters = () => {
    onClearAllFilters?.();
    handleClose();
  };

  const calculateSearchWidth = () => {
    if (showFilter && showSecondFilter) return "70%";
    if (showFilter || showSecondFilter) return "80%";
    return "100%";
  };

  const dynamicSearchWidth =
    searchWidth === "75%" ? calculateSearchWidth() : searchWidth;

  // Gabungan filter aktif dari props
  const renderActiveFilters = () => {
    const allFilters = [...selectedFilters, ...selectedSecondFilters];

    if (allFilters.length === 0) return null;

    return (
      <ActionsheetItem>
        <HStack space="sm" flexWrap="wrap">
          {allFilters.map((filter, idx) => (
            <Box
              key={idx}
              flexDirection="row"
              alignItems="center"
              py={"$1"}
              px={"$2"}
              borderRadius={18}
              bgColor={
                mode === "dark"
                  ? colors.gray.dark[700]
                  : colors.gray.light[200]
              }
              mb="$2"
            >
              <Text
                mr="$1"
                color={mode === "dark" ? "white" : "black"}
                fontWeight="$semibold"
                fontFamily="lato"
                fontSize={12}
              >
                {filter}
              </Text>
              <TouchableOpacity onPress={() => onRemoveFilter?.(filter)}>
                <Ionicons
                  name="close"
                  size={14}
                  color={mode === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            </Box>
          ))}
        </HStack>
      </ActionsheetItem>
    );
  };

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
              mode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
            }
          />
        </Input>

        {/* Main Filter */}
        {showFilter && (
          <TouchableOpacity onPress={handleFilterPress}>
            <Box
              borderRadius="$full"
              flexDirection="row"
              alignItems="center"
              px="$3"
              py="$2"
              backgroundColor={
                mode === "light" ? colors.gray.light[25] : colors.gray.dark[800]
              }
            >
              <FontAwesome6
                name={"sliders"}
                size={20}
                color={mode === "dark" ? "white" : "black"}
              />
            </Box>
          </TouchableOpacity>
        )}

        {/* Second Filter */}
        {showSecondFilter && (
          <TouchableOpacity onPress={handleSecondFilterPress}>
            <Box
              borderRadius="$full"
              flexDirection="row"
              alignItems="center"
              px="$3"
              py="$2"
              backgroundColor={
                mode === "light" ? colors.gray.light[25] : colors.gray.dark[800]
              }
            >
              <Ionicons
                name={secondFilterIcon}
                size={20}
                color={mode === "dark" ? "white" : "black"}
              />
            </Box>
          </TouchableOpacity>
        )}
      </HStack>

      {/* ActionSheet Main */}
      <Actionsheet isOpen={activeActionSheet === "main"} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {renderActiveFilters()}

          {actionSheetTitle && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$lg" fontWeight="$semibold">
                {actionSheetTitle}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {filterOptions.map((option, index) => (
            <ActionsheetItem
              key={`main-${option.value}-${index}`}
              onPress={() => handleFilterOptionPress(option, "main")}
            >
              <ActionsheetItemText>{option.label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}

          <HStack px="$4" py="$2" space="lg">
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleClearAllFilters}
            >
              <Text color="black" fontWeight="$semibold">Hapus Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: colors.primary,
                alignItems: "center",
              }}
              onPress={handleClose}
            >
              <Text color="white" fontWeight="$semibold">Tutup</Text>
            </TouchableOpacity>
          </HStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* ActionSheet Second */}
      <Actionsheet isOpen={activeActionSheet === "second"} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {renderActiveFilters()}

          {secondActionSheetTitle && (
            <ActionsheetItem>
              <ActionsheetItemText fontSize="$lg" fontWeight="$semibold">
                {secondActionSheetTitle}
              </ActionsheetItemText>
            </ActionsheetItem>
          )}

          {secondFilterOptions.map((option, index) => {
            const isSelected = selectedSecondFilters.includes(option.label);
            return (
              <ActionsheetItem
                key={`second-${option.value}-${index}`}
                onPress={() => handleFilterOptionPress(option, "second")}
              >
                <ActionsheetItemText>
                  {option.label} {isSelected ? "✓" : ""}
                </ActionsheetItemText>
              </ActionsheetItem>
            );
          })}

          <HStack px="$4" py="$2" space="lg">
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleClearAllFilters}
            >
              <Text color="black" fontWeight="$semibold">Hapus Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: colors.primary,
                alignItems: "center",
              }}
              onPress={handleClose}
            >
              <Text color="white" fontWeight="$semibold">Tutup</Text>
            </TouchableOpacity>
          </HStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default SearchFilter;