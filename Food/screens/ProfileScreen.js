import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Button from "react-native-button";
import DropDownItem from "react-native-drop-down-item";

import { DropdownData } from "../data/DropdownData";
import { Login } from "../utils/ScreenNames";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      dropdownData: DropdownData.contents
    };
  }
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "User";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/user.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Thông tin cá nhân";
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
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/icons/profile.png")} />
            <Text style={styles.nameText}>Nguyễn Đăng Tỉnh</Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.imageOptionContainer}>
            <Image source={require("../assets/icons/fork-and-knife.png")} />
            <Text style={styles.optionText}>Món ăn</Text>
          </View>
          <View style={styles.imageOptionContainer}>
            <Image source={require("../assets/icons/wine-bottle.png")} />
            <Text style={styles.optionText}>Nước uống</Text>
          </View>
          <View style={styles.imageOptionContainer}>
            <Image source={require("../assets/icons/setting.png")} />
            <Text style={styles.optionText}>Tùy chọn</Text>
          </View>
        </View>
        <ScrollView>
          {this.state.dropdownData
            ? this.state.dropdownData.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={require("../assets/icons/down-arrow.png")}
                    visibleImage={require("../assets/icons/up-arrow.png")}
                    header={
                      <View style={styles.header}>
                        <Text style={styles.headerText}>{param.title}</Text>
                      </View>
                    }
                  >
                    <Text style={styles.contentText}>{param.content}</Text>
                    <Text style={styles.contentText}>{param.content2}</Text>
                    <Text style={styles.contentText}>{param.content3}</Text>
                  </DropDownItem>
                );
              })
            : null}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate(Login);
            }}
          >
            <Text style={styles.buttonText}>Đăng xuất</Text>
            <View style={styles.imageLogout}>
              <Image source={require("../assets/icons/logout.png")} />
            </View>
          </TouchableOpacity>
        </ScrollView>
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
  profileContainer: {
    margin: 20
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 20
  },
  optionContainer: {
    marginHorizontal: 20,
    marginTop: 15
  },
  imageOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 25
  },
  optionText: {
    fontSize: 20,
    marginLeft: 20
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: 45,
    backgroundColor: "#ddd"
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    marginLeft: 10
  },
  imageLogout: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10
  },
  dropDownItem: {
    borderBottomColor: "rgb(77,120,140)",
    borderBottomWidth: 1
  },
  header: {
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    marginVertical: 8,
    marginHorizontal: 20,
    fontSize: 20
  },
  contentText: {
    marginHorizontal: 30,
    fontSize: 20
  }
});
