import colors from "@/src/config/colors";
import React from "react";
import { View, StyleSheet } from "react-native";

const DashedDivider = () => {
  return <View style={styles.dashedLine} />;
};

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomColor: colors.gray.light[200],
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 10,
    width: "100%",
  },
});

export default DashedDivider;
