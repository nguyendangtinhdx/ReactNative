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
import { Barcode, Payment } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class BuyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Code";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/barcode.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Buy";
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
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri:
                "https://ya-webdesign.com/images/miller-lite-bottle-png-8.png"
            }}
            style={styles.image}
          />
          <Text style={styles.titleText}>Bia Huda</Text>
        </View>
        <View>
          <Text style={styles.confirmText}>Bạn có thực sự muốn mua không?</Text>
          <Text style={styles.checkoutText}>Thanh toán bằng Momo</Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonCancel}
              onPress={() => {
                this.props.navigation.navigate(Barcode);
              }}
            >
              Hủy
            </Button>
            <Button
              style={styles.buttonBuy}
              onPress={() => {
                this.props.navigation.navigate(Payment);
              }}
            >
              Mua
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 34 : 0,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: "#DF6F51"
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center"
  },
  confirmText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  },
  checkoutText: {
    fontSize: 22,
    textAlign: "center",
    color: "red"
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonCancel: {
    width: screen.width / 2.2,
    height: 40,
    paddingVertical: 5,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DE6F51",
    color: "#DE6F51"
  },
  buttonBuy: {
    width: screen.width / 2.2,
    height: 40,
    paddingVertical: 5,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#DE6F51",
    color: "#fff"
  },
  image: {
    width: screen.width / 1.5,
    height: screen.width / 1.5
  }
});
