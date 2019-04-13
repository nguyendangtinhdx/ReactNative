import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Button from "react-native-button";

import { MainScreen, GameScreen } from "../utils/ScreenNames";
import localData from "../assets/data/Data.json";
import ResultList from "../components/ResultList";

export default class HistoryScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: localData.games
    };
    sizeData = Object.keys(this.state.data).length;
  }

  static navigationOptions = ({ navigation }) => {
    let headerTitle = "Kết quả";
    let headerStyle = { backgroundColor: "lightyellow" };
    let headerTitleStyle = {
      flex: 1,
      fontSize: 24,
      color: "green"
    };
    return { headerTitle, headerStyle, headerTitleStyle };
  };

  render() {
    let receiveNumberAnswerRight = this.props.navigation.state.params;
    var loop = [];
    for (let i = 1; i <= sizeData; i++) {
      if (receiveNumberAnswerRight.array[i] != null) {
        if (
          receiveNumberAnswerRight.array[i].item ==
          receiveNumberAnswerRight.array[i].answer
        ) {
          loop.push(
            <Text style={styles.yourAnswerRightText} key={i}>
              {"  "}
              {receiveNumberAnswerRight.array[i].id}.
              {receiveNumberAnswerRight.array[i].item}
            </Text>
          );
        } else {
          loop.push(
            <Text style={styles.yourAnswerWrongText} key={i}>
              {"  "}
              {receiveNumberAnswerRight.array[i].id}.
              {receiveNumberAnswerRight.array[i].item}
            </Text>
          );
        }
      }
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../assets/images/backgroundHistory.png")}
          resizeMode="cover"
        >
          <View style={styles.answerRight}>
            <Text style={styles.answerRightText}>
              Bạn đã trả lời đúng {receiveNumberAnswerRight.score}/
              {receiveNumberAnswerRight.numberQuestion} câu
            </Text>
            <Text style={styles.answerRightContainer}>{loop}</Text>
          </View>

          <ResultList />

          <View style={styles.imageButtonContainer}>
            <View style={styles.buttonHome}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate(MainScreen);
                }}
              >
                <Image source={require("../assets/images/buttonHome.png")} />
              </Button>
            </View>
            <View style={styles.buttonReplay}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate(GameScreen);
                }}
              >
                <Image source={require("../assets/images/buttonReplay.png")} />
              </Button>
            </View>
          </View>
        </ImageBackground>
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
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    fontSize: 18,
    color: "white",
    padding: 10,
    margin: 10,
    width: 200,
    height: 45,
    borderRadius: 10,
    backgroundColor: "darkviolet"
  },
  imageButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginBottom: 3
  },
  buttonReplay: {},
  buttonHome: {},
  answerRight: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  answerRightText: {
    color: "yellow",
    fontSize: 20,
    fontWeight: "bold"
  },
  yourAnswerRightText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold"
  },
  yourAnswerWrongText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
  }
});
