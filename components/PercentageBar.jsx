import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const PercentageBar = ({
  percentage,
  height,
  backgroundColor,
  level,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.bar,
            { height, backgroundColor: backgroundColor, borderRadius: 1 },
          ]}
        />
        <View
          style={[
            styles.filler,
            { width: percentage ? percentage : "0%", height, borderRadius: 5 },
          ]}
        />
      </View>
      <Text style={styles.levelText}>Level {level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  progressBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    flex: 1,
    marginVertical: 0,
    borderWidth: 1,
  },
  filler: {
    backgroundColor: "#3498db",
    position: "absolute",
    bottom: 0,
  },
  levelText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "700",
    marginTop: 0,
  },
});

export default PercentageBar;
