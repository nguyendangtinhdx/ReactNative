import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import Sound from "react-native-sound";

import { HistoryScreen } from "../utils/ScreenNames";
import localData from "../assets/data/Data.json";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TIME = 10;

Sound.setCategory("Playback");
const soundSuccess = new Sound("sound_success.mp3");
const soundError = new Sound("sound_error.mp3");

export default class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: localData.games,
      time: TIME,
      score: 0,
      page: 0,
      checkAnswerCorrect: false,
      checkAnswerWrong: false,
      checkNotPress: false,
      isMounted: false,
      array: {}
    };
    sizeData = Object.keys(this.state.data).length;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.startTime();
  }
  startTime() {
    this.inte = setInterval(() => this.timeCap(), 1000);
  }
  restartTime() {
    if (this.state.page != sizeData) {
      this.setState({
        time: TIME
      });
    } else {
      this.callRedirect();
    }
  }
  timeCap() {
    if (this.mounted) {
      this.setState({
        time: this.state.time - 1
      });
    }
    if (this.state.time < 1) {
      this.toNextPage();
    }
  }
  callRedirect() {
    clearInterval(this.inte); // set time stop at 0
    let sendNumberAnswerRight = {
      numberQuestion: sizeData,
      score: this.state.score,
      array: this.state.array
    };
    this.props.navigation.navigate(HistoryScreen, sendNumberAnswerRight);
  }
  countPoints() {
    if (this.state.score < sizeData) {
      this.setState({
        score: this.state.score + 1
      });
    }
  }
  chooseAnswer(item, id, answer, yourAnswerText) {
    this.state.array[id] = { id: "", item: "", answer: "", yourAnswerText: "" };
    this.state.array[id].id = id;
    this.state.array[id].item = item;
    this.state.array[id].answer = answer;
    this.state.array[id].yourAnswerText = yourAnswerText;

    if (item === answer) {
      soundSuccess.play();
      this.countPoints();
      this.setState({
        checkAnswerCorrect: true,
        checkAnswerWrong: false,
        checkNotPress: true,
        time: 2
      });
    } else {
      soundError.play();
      this.setState({
        checkAnswerWrong: true,
        checkAnswerCorrect: false,
        checkNotPress: true,
        time: 2
      });
    }
  }
  toNextPage() {
    this.setState({ page: this.state.page + 1 });
    this.scroll.scrollTo({ x: this.state.page * SCREEN_WIDTH });
    this.restartTime();
    this.setState({
      checkAnswerCorrect: false,
      checkAnswerWrong: false,
      checkNotPress: false
    });
  }

  renderQuiz = ({ item, index }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Câu hỏi số {item.id}</Text>
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.question}>
            <Text style={styles.questionText}>{item.question}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonAnswer}
            onPress={() => this.chooseAnswer("A", item.id, item.answer, item.A)}
          >
            <Text style={styles.buttonAnswerText}>A. {item.A}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAnswer}
            onPress={() => this.chooseAnswer("B", item.id, item.answer, item.B)}
          >
            <Text style={styles.buttonAnswerText}>B. {item.B}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAnswer}
            onPress={() => this.chooseAnswer("C", item.id, item.answer, item.C)}
          >
            <Text style={styles.buttonAnswerText}>C. {item.C}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAnswer}
            onPress={() => this.chooseAnswer("D", item.id, item.answer, item.D)}
          >
            <Text style={styles.buttonAnswerText}>D. {item.D}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  static navigationOptions = ({ navigation }) => {
    let headerTitle = "Chọn câu trả lời đúng nhất";
    let headerStyle = { backgroundColor: "lightyellow" };
    let headerTitleStyle = {
      flex: 1,
      fontSize: 24,
      color: "green"
    };
    return { headerTitle, headerStyle, headerTitleStyle };
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../assets/images/backgroundGame.png")}
          resizeMode="cover"
        >
          <View style={styles.navContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>
                Số câu đúng:{" "}
                <Text style={styles.colorRed}>{this.state.score}</Text>/
                {sizeData}
              </Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                Thời gian:{" "}
                <Text style={styles.colorRed}>{this.state.time}</Text>s
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            ref={re => (this.scroll = re)}
          >
            <FlatList
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              legacyImplementation={false}
              data={this.state.data}
              renderItem={item => this.renderQuiz(item)}
              keyExtractor={quiz => quiz.id.toString()}
            />
          </ScrollView>

          <View style={styles.iconCorrect}>
            <Image
              source={
                this.state.checkAnswerCorrect
                  ? require("../assets/images/correct.png")
                  : null
              }
            />
            <Image
              source={
                this.state.checkAnswerWrong
                  ? require("../assets/images/wrong.png")
                  : null
              }
            />
          </View>
        </ImageBackground>

        <ImageBackground
          style={
            this.state.checkNotPress
              ? styles.imageBackgroundNull
              : styles.iconCorrect
          }
          source={
            this.state.checkNotPress
              ? require("../assets/images/backgroundNull.png")
              : null
          }
          resizeMode="cover"
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
  content: {
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  button: {
    fontSize: 18,
    color: "white",
    padding: 10,
    margin: 20,
    width: 200,
    height: 45,
    borderRadius: 10,
    backgroundColor: "darkviolet"
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  imageBackgroundNull: {
    height: "80%",
    width: "100%",
    position: "absolute",
    zIndex: 1
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#00BCD4",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#fff",
    margin: 8
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16
  },
  question: {
    padding: 12,
    marginBottom: 8,
    alignSelf: "stretch",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#fff",
    justifyContent: "center",
    backgroundColor: "yellow"
  },
  questionText: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  buttonAnswer: {
    flexDirection: "row",
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#051620",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ffffff",
    margin: 8,
    width: "100%"
  },
  buttonAnswerText: {
    fontSize: 24,
    color: "#fff"
  },
  navContainer: {
    flexDirection: "row"
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    marginLeft: 10,
    flex: 5
  },
  score: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold"
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
    marginRight: 10,
    flex: 5
  },
  time: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold"
  },
  colorRed: {
    color: "red"
  },
  iconCorrect: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 200
  }
});
