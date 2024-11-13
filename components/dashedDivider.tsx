import React from "react";
import { View, StyleSheet } from "react-native";

const DashedDivider = () => {
  return <View style={styles.dashedLine} />;
};

const styles = StyleSheet.create({
  dashedLine: {
    borderBottomColor: "gray", // Warna garis
    borderBottomWidth: 1, // Ketebalan garis
    borderStyle: "dashed", // Jenis garis
    marginVertical: 10, // Jarak vertikal
    width: "100%", // Lebar penuh
  },
});

export default DashedDivider;
