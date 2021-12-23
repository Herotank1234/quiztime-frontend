import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

function Answer({ index, title, highlight, onPress }) {
  console.log(index);
  return (
    <TouchableOpacity
      style={
        highlight[index] == 0
          ? styles.containerNoHighlight
          : highlight[index] == 1
          ? styles.containerCorrect
          : styles.containerCorrect
      }
      onPress={onPress}
    >
      <Text style={styles.answer}>{title}</Text>
    </TouchableOpacity>
  );
}

const container = {
  flex: 1,
  borderWidth: 1,
  justifyContent: "center",
  borderRadius: 8,
  width: "100%",
  marginVertical: 5,
};

const styles = StyleSheet.create({
  containerNoHighlight: {
    ...container,
  },
  containerCorrect: {
    ...container,
    backgroundColor: "green",
  },
  containerIncorrect: {
    ...container,
    backgroundColor: "red",
  },
  answer: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Answer;
