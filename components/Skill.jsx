import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Skill = ({ item }) => {
  const progressBarWidth = `${(item.level * 100) / 20}%`;

  return (
    <View style={styles.box}>
      <View style={styles.titleRow}>
        <Text style={styles.skillName}>{item.name}</Text>
      </View>
      <View style={styles.progressBarRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
        <Text style={styles.level}>{item.level?.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "95%",
    marginVertical: 10,
    marginHorizontal: "2.5%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 3,
  },
  titleRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  skillName: {
    flex: 1,
    color: "#3498db",
    fontSize: 18,
    overflow: "hidden",
  },
  progressBarRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 4,
    height: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  level: {
    flex: 1,
    fontSize: 18,
    color: "#5cb85c",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Skill;
