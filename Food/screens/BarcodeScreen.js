import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import Button from "react-native-button";
import { Buy } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class BarcodeScreen extends Component {
  constructor() {
    super();
    this.state = {
      buttonActive: true,
      imageBarcodeShow: 0
    };
  }
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Code";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/barcode.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Barcode";
    let headerStyle = { backgroundColor: "#FEF7EF" };
    let headerTitleStyle = {
      flex: 1,
      fontSize: 24,
      color: "#DF6F51",
      textAlign: "center"
    };
    return {
      tabBarLabel,
      tabBarIcon,
      headerTitle,
      headerStyle,
      headerTitleStyle
    };
  };
  barcodeSmall() {
    this.setState({ buttonActive: true });
  }
  barcodeLarge() {
    this.setState({ buttonActive: false });
  }
  imageBarcode() {
    this.setState({ imageBarcodeShow: this.state.imageBarcodeShow + 1 });
    if (this.state.imageBarcodeShow == 1) {
      this.props.navigation.navigate(Buy);
    }
  }
  render() {
    var image = [];
    if (this.state.buttonActive) {
      image.push(
        <View key={"1"}>
          <Button onPress={() => this.imageBarcode()}>
            {this.state.imageBarcodeShow == 1 ? (
              <Image
                source={require("../assets/images/barcode.png")}
                style={styles.barcode}
              />
            ) : null}
            <Image
              source={require("../assets/images/barcodeFrameSmall.png")}
              style={styles.barcodeFrameSmall}
            />
          </Button>
          <Text style={styles.titleText}>Chọn món ăn bằng cách quét mã</Text>
        </View>
      );
    } else {
      image.push(
        <Image
          key={"2"}
          source={require("../assets/images/barcodeFrameLarge.png")}
          style={styles.barcodeFrameLarge}
        />
      );
    }
    return (
      <View style={styles.container}>
        {image}
        <View style={styles.buttonContainer}>
          <Button
            style={
              this.state.buttonActive ? styles.buttonActive : styles.button
            }
            onPress={() => this.barcodeSmall()}
          >
            Small
          </Button>
          <Button
            style={
              this.state.buttonActive ? styles.button : styles.buttonActive
            }
            onPress={() => this.barcodeLarge()}
          >
            Large
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 34 : 0,
    backgroundColor: "#383838",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: "#DF6F51"
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 2
  },
  button: {
    padding: 10,
    width: screen.width / 2,
    height: 45,
    backgroundColor: "white",
    fontSize: 18,
    color: "#DE6F51"
  },
  buttonActive: {
    padding: 10,
    width: screen.width / 2,
    height: 45,
    fontSize: 18,
    backgroundColor: "#DE6F51",
    color: "white"
  },
  barcodeFrameSmall: {
    width: screen.width - screen.width / 10,
    height: screen.width - screen.width / 10
  },
  barcodeFrameLarge: {
    flex: 1,
    width: screen.width - screen.width / 10,
    marginVertical: 10
  },
  barcode: {
    width: screen.width / 2,
    height: screen.width / 2,
    position: "absolute",
    zIndex: 1,
    marginHorizontal: "22%"
  },
  titleText: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center"
  }
});
