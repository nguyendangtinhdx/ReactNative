import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";

import { Book } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class BookDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Book";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/star.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Chi tiết món ăn";
    let headerStyle = { backgroundColor: "#FEF7EF" };
    let headerTitleStyle = {
      flex: 1,
      fontSize: 24,
      color: "#DF6F51",
      textAlign: "center"
    };
    let headerRight = (
      <View>
        <Image
          source={require("../assets/icons/star-navigation.png")}
          style={styles.imageStartHeader}
        />
      </View>
    );
    return {
      tabBarLabel,
      tabBarIcon,
      headerTitle,
      headerStyle,
      headerTitleStyle,
      headerRight
    };
  };
  render() {
    let receiveFoodDetail = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: receiveFoodDetail.image
          }}
          style={styles.image}
        />
        {/* <Text style={styles.nameText}>{receiveFoodDetail.name}</Text> */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              this.props.navigation.navigate(Book);
            }}
          >
            <Text style={styles.buttonText}>
              <Image source={require("../assets/icons/star-button.png")} />
              &nbsp;Book
            </Text>
          </Button>
          <Button
            onPress={() => {
              this.props.navigation.navigate(Book);
            }}
          >
            <Text style={styles.buttonText}>
              <Image source={require("../assets/icons/share-button.png")} />
              &nbsp;Share
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 34 : 0
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: "#DF6F51"
  },
  image: {
    width: screen.width,
    height: screen.width / 2
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 22
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonText: {
    paddingTop: 5,
    marginTop: 5,
    width: 180,
    height: 40,
    fontSize: 20,
    color: "#939396",
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#939396"
  },
  imageStartHeader: {
    tintColor: "#FFB400",
    marginRight: 10
  }
});
