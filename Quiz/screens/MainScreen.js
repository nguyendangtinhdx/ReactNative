import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  BackHandler
} from "react-native";
// import firebase from "react-native-firebase";
// import { AccessToken, LoginManager, LoginButton } from "react-native-fbsdk";

import { GameScreen } from "../utils/ScreenNames";

export default class MainScreen extends Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }
  ExitApp = () => {
    Alert.alert(
      "Thoát trò chơi",
      "Bạn có chắc chắn muốn thoát không?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  };
  // onLoginFacebook = () => {
  //   LoginManager.logInWithReadPermissions(["public_profile", "email"])
  //     .then(result => { // khi thành công => lấy được token
  //       if (result.isCancelled) {
  //         return Promise.reject(new Error( "The user cancelled the request"));
  //       }
  //       console.log(
  //         `Login success with permissions: ${result.grantedPermissions.toString()}`
  //       );
  //       // get the access token
  //       return AccessToken.getCurrentAccessToken();
  //     })
  //     .then(data => {  // tạo credential tự accessToken (mở login vào firebase)
  //       const credential = firebase.auth.FacebookAuthProvider.credential(
  //         data.accessToken
  //       );
  //       return firebase.auth().signInWithCredential(credential); // login vào firebase
  //     })
  //     .then(currentUser => { // thông tin đối tượng login
  //       console.log(
  //         `Facebook Login with user : ${JSON.stringify(currentUser.toJSON())}`
  //       );
  //     })
  //     .catch(error => {
  //       console.log(`Facebook login fail with error: ${error}`);
  //     });
  // };

  static navigationOptions = ({ navigation }) => {
    let headerTitle = "Trò chơi câu đố";
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
          source={require("../assets/images/backgroundMain.png")}
          resizeMode="cover"
        >
          <View style={styles.imageButtonContainer}>
            <View style={styles.buttonStart}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate(GameScreen);
                }}
              >
                <Image source={require("../assets/images/buttonStart.png")} />
              </Button>
            </View>
            <View style={styles.buttonExit}>
              <Button onPress={this.ExitApp}>
                <Image source={require("../assets/images/buttonExit.png")} />
              </Button>
            </View>
          </View>
          {/* <Button
          containerStyle={{
            padding: 10,
            width: 150,
            margin: 20,
            borderRadius: 4,
            backgroundColor: "rgb(73,104,173)"
          }}
          style={{ fontSize: 18, color: "white" }}
          onPress={this.onLoginFacebook}
        >
          Login Facebook
        </Button> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
    // alignItems: "center"
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  imageButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%"
  },
  buttonStart: {
    marginTop: 70
  },
  buttonScore: {
    marginTop: 250
  },
  buttonExit: {
    marginBottom: 80
  }
});
