import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  SectionList,
  Alert,
  TouchableOpacity
} from "react-native";
import Button from "react-native-button";

import InfoList from "../components/InfoList";
import { InfoData } from "../data/InfoData";
import { InfoDetail } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Info";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/notification.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Món ăn các miền";
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
  renderHeader = ({ section }) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };
  renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            let sendInfoDetail = {
              name: item.name,
              description: item.description,
              image: item.image
            };
            this.props.navigation.navigate(InfoDetail, sendInfoDetail);
          }}
        >
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemTextName}>{item.name}</Text>
            <View style={styles.rightArrowContainer}>
              <Image
                source={require("../assets/icons/right-arrow.png")}
                style={styles.rightArrow}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.borderBottom} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <InfoList /> */}
        <SectionList
          renderItem={({ item, index }) => {
            return this.renderItem((item = { item }), (index = { index }));
          }}
          renderSectionHeader={({ section }) => {
            return this.renderHeader((section = { section }));
          }}
          stickySectionHeadersEnabled={true}
          sections={InfoData}
          keyExtractor={(item, index) => item.name}
        />
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
  header: {
    flex: 1,
    backgroundColor: "rgb(77,120, 140)"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    margin: 10
  },
  itemNameContainer: {
    backgroundColor: "rgb(98, 197, 184)",
    width: screen.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemTextName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(173, 252, 250)",
    marginLeft: 20,
    marginVertical: 5
  },
  rightArrowContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
    marginVertical: 5
  },
  rightArrow: {
    height: 10
  },
  itemDescriptionContainer: {
    backgroundColor: "#e97600",
    width: screen.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemTextDescription: {
    fontSize: 16,
    color: "rgb(173, 252, 250)",
    marginHorizontal: 20
  },
  borderBottom: {
    backgroundColor: "rgb(77,120,140)",
    height: 1
  }
});
