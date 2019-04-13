import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  Modal
} from "react-native";
import { Barcode } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Code";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/barcode.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Payment";
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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titlePaymentText}>Phương thức thanh toán</Text>
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
          <Text style={styles.checkoutText}>[Số lượng: 5]</Text>
          <Text style={styles.checkoutText}>
            Thanh toán bằng Momo hoặc thanh toán bằng Card
          </Text>
          <Button
            style={styles.buttonPayment}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            Thanh toán
          </Button>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.viewModalContainer}>
              <Text style={styles.titleModalText}>Bạn đã thanh toán</Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageModal}
                  source={require("../assets/icons/wine-glass.png")}
                />
                <Image
                  style={styles.imageModal}
                  source={require("../assets/icons/wine-glass-full-of-drink.png")}
                />
              </View>
              <Text style={styles.amountModalText}>Số lượng: 5</Text>
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible),
                    this.props.navigation.navigate(Barcode);
                }}
              >
                <Image
                  style={styles.imageModalCancel}
                  source={require("../assets/icons/cancel.png")}
                />
              </Button>
            </View>
          </Modal>
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
  titlePaymentText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
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
  buttonPayment: {
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
  },
  viewModalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "space-around"
  },
  titleModalText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  imageContainer: {
    flexDirection: "row"
  },
  imageModal: {
    width: screen.width / 4,
    height: screen.height / 4,
    tintColor: "#fff"
  },
  amountModalText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  imageModalCancel: {
    tintColor: "#fff"
  }
});
