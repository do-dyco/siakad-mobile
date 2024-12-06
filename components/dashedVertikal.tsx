import React from "react";
import { View, StyleSheet } from "react-native";

const DashedVertical = () => {
  return <View style={styles.dashedLine} />;
};

const styles = StyleSheet.create({
  dashedLine: {
    position: "absolute",
    left: "30%",
    borderRightColor: "gray",
    borderRightWidth: 2,
    borderStyle: "dashed",
    height: "100%",
    marginHorizontal: 10,
  },
});

export default DashedVertical;
