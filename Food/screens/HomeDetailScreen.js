import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TextInput
} from "react-native";

import bookData from "../data/BookData.json";
import { BookDetail } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class HomeDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData.books
    };
  }

  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "Home";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/home.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = (
      <View style={styles.inputSearchContainer}>
        <TextInput
          style={styles.inputSearch}
          placeholder="Tìm kiếm"
          placeholderTextColor="#DE6F51"
          underlineColorAndroid="transparent"
        />
        <Image
          source={require("../assets/icons/search.png")}
          style={styles.iconSearch}
        />
      </View>
    );
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

  renderBook = ({ item, index }) => {
    return (
      <View style={styles.bookContainer}>
        <View style={styles.headerBookContainer}>
          <View style={styles.headerBookLeft}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.headerBookRight}>
            <Image
              source={require("../assets/icons/star-square.png")}
              style={styles.imageStar}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Button
            onPress={() => {
              let sendFoodDetail = {
                name: item.name,
                description: item.description,
                detail: item.detail,
                image: item.image
              };
              this.props.navigation.navigate(BookDetail, sendFoodDetail);
            }}
          >
            <Image
              source={{
                uri: item.image
              }}
              style={styles.image}
            />
          </Button>
          <Button
            onPress={() => {
              let sendFoodDetail = {
                name: item.name,
                description: item.description,
                detail: item.detail,
                image: item.image2
              };
              this.props.navigation.navigate(BookDetail, sendFoodDetail);
            }}
          >
            <Image
              source={{
                uri: item.image2
              }}
              style={styles.image}
            />
          </Button>
          <Button
            onPress={() => {
              let sendFoodDetail = {
                name: item.name,
                description: item.description,
                detail: item.detail,
                image: item.image3
              };
              this.props.navigation.navigate(BookDetail, sendFoodDetail);
            }}
          >
            <Image
              source={{
                uri: item.image3
              }}
              style={styles.image}
            />
          </Button>
        </View>
        <Text style={styles.detailText}>{item.detail}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={false}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={true}
          legacyImplementation={false}
          data={this.state.data}
          renderItem={item => this.renderBook(item)}
          keyExtractor={book => book.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 34 : 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    tintColor: "#DF6F51"
  },
  bookContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },           // IOS
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 2 // Android
  },
  headerBookContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerBookLeft: {},
  headerBookRight: {
    alignItems: "flex-end"
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000"
  },
  descriptionText: {
    fontSize: 16,
    color: "#000"
  },
  imageStar: {
    tintColor: "#FFB400"
  },
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 5
  },
  image: {
    width: screen.width / 3.5,
    height: screen.width / 3.5,
    marginRight: 1
  },
  detailText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5
  },
  inputSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#DE6F51",
    borderRadius: 5,
    height: 40,
    width: "95%",
    marginLeft: 10
  },
  inputSearch: {
    flex: 1,
    fontSize: 18,
    color: "#DE6F51",
    marginLeft: 5,
    padding: 0
  },
  iconSearch: {
    marginRight: 5,
    tintColor: "#DE6F51"
  }
});
