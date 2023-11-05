import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Project = ({ item }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.projectName}>{item.project.name}</Text>
      <View style={styles.resultContainer}>
        <Text
          style={item["validated?"] ? styles.validResult : styles.invalidResult}
        >
          {item.final_mark}
        </Text>
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
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 3,
  },
  projectName: {
    color: "#3498db",
    fontSize: 18,
    flex: 1,
    overflow: "hidden",
  },
  resultContainer: {
    width: 45,
    height: 45,
    backgroundColor: "#f3f3f3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  validResult: {
    color: "#5cb85c",
    fontSize: 18,
    fontWeight: "bold",
  },
  invalidResult: {
    color: "#D8636F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Project;
