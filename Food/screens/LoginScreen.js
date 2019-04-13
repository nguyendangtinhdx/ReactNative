import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput
} from "react-native";
import { Profile } from "../utils/ScreenNames";

export default class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Profile";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/user.png")}
        style={styles.tabBarIcon}
      />
    );
    let header = null;
    return {
      tabBarLabel,
      tabBarIcon,
      header
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../assets/images/background.png")}
          resizeMode="cover"
        >
          <Text style={styles.titleText}>Đăng nhập hệ thống</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Tên đăng nhập"
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="Mật khẩu"
            />
            <Button
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate(Profile);
              }}
            >
              Đăng nhập
            </Button>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              <Text style={styles.noAccountText}>Chưa có tài khoản?</Text>
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
    marginTop: Platform.OS === "ios" ? 34 : 0,
    backgroundColor: "#fff"
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: "#DF6F51"
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  titleText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold"
  },
  form: {
    width: "90%"
  },
  input: {
    height: 50,
    padding: 10,
    marginBottom: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff"
  },
  button: {
    height: 50,
    paddingTop: 10,
    marginTop: 15,
    fontSize: 20,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff"
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPasswordText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 15
  },
  noAccountText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 15
  }
});
