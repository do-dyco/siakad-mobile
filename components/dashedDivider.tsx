import React from "react";
import { View, StyleSheet } from "react-native";

const DashedDivider = () => {
  return <View style={styles.dashedLine} />;
};

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: 10,
    width: "100%",
  },
});

export default DashedDivider;
