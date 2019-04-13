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
import InfoList from "../components/InfoList";

var screen = Dimensions.get("window");

export default class InfoDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Info";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/notification.png")}
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
    return {
      tabBarLabel,
      tabBarIcon,
      headerTitle,
      headerStyle,
      headerTitleStyle
    };
  };

  render() {
    let receiveInfoDetail = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: receiveInfoDetail.image
          }}
          style={styles.image}
        />
        <Text style={styles.nameText}>{receiveInfoDetail.name}</Text>
        <Text style={styles.descriptionText}>{receiveInfoDetail.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 34 : 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff"
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
    marginVertical: 10,
    fontSize: 22,
    fontWeight: "bold"
  },
  descriptionText: {
    fontSize: 20,
    marginHorizontal: 20,
  }
});
