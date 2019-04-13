import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";

import localData from "../assets/data/Data.json";

export default class ResultList extends Component {
  constructor() {
    super();
    this.state = {
      data: localData.games
    };
  }

  renderResult = ({ item, index }) => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <Text style={styles.questionText}>
            Câu {item.id} :{item.question}
          </Text>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Đáp án: {item.answer}. {item.answerText}
            </Text>
            <Text
              style={styles.explain}
              onPress={() => Alert.alert(`${item.explain}`)}
            >
              Giải thích
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={false}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={true}
          legacyImplementation={false}
          data={this.state.data}
          renderItem={item => this.renderResult(item)}
          keyExtractor={quiz => quiz.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8
  },
  question: {
    padding: 12,
    marginBottom: 8,
    alignSelf: "stretch",
    maxHeight: 280,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#fff",
    justifyContent: "center",
    backgroundColor: "lightyellow"
  },
  questionText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold"
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  answerText: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold"
  },
  explain: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});
