import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Modal
} from "react-native";

import bookData from "../data/BookData.json";
import { Book } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class BookDetailRelatedScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData.books,
      modalVisible: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    let tabBarLabel = "";
    let tabBarIcon = () => (
      <Image
        source={require("../assets/icons/star.png")}
        style={styles.tabBarIcon}
      />
    );
    let headerTitle = "Món ăn liên quan";
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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  renderBookDetailRelated = ({ item, index }) => {
    return (
      <View style={styles.bookDetailRelatedContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          ref={re => (this.scroll = re)}
        >
          <View style={styles.imageScrollContainer}>
            <Image
              source={{
                uri:
                  "https://ya-webdesign.com/images/miller-lite-bottle-png-8.png"
              }}
              style={styles.imageScroll}
            />
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.imageScrollContainer}>
            <Image
              source={{
                uri: "http://product.hstatic.net/1000205756/product/tiger.png"
              }}
              style={styles.imageScroll}
            />
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.imageScrollContainer}>
            <Image
              source={{
                uri: "http://pluspng.com/img-png/beer-bottle-png-hd--400.png"
              }}
              style={styles.imageScroll}
            />
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  render() {
    let receiveFoodDetail = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={true}
          ref={re => (this.scroll = re)}
        >
          <Image
            source={{
              uri: receiveFoodDetail.image
            }}
            style={styles.image}
          />
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
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={styles.buttonText}>
                <Image source={require("../assets/icons/share-button.png")} />
                &nbsp;Share
              </Text>
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
                <Text style={styles.titleModalText}>Chia sẻ</Text>
                <ScrollView
                  style={styles.imageModalScroll}
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  ref={re => (this.scroll = re)}
                >
                  <Image
                    style={styles.imageShareModal}
                    source={require("../assets/icons/gmail.png")}
                  />
                  <Image
                    style={styles.imageShareModal}
                    source={require("../assets/icons/facebook.png")}
                  />
                  <Image
                    style={styles.imageShareModal}
                    source={require("../assets/icons/instagram.png")}
                  />
                  <Image
                    style={styles.imageShareModal}
                    source={require("../assets/icons/google-plus.png")}
                  />
                  <Image
                    style={styles.imageShareModal}
                    source={require("../assets/icons/line.png")}
                  />
                </ScrollView>
                <Button
                  style={styles.buttonModal}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  Đóng
                </Button>
              </View>
            </Modal>
          </View>
          <FlatList
            horizontal={false}
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={this.state.data}
            renderItem={item => this.renderBookDetailRelated(item)}
            keyExtractor={book => book.id.toString()}
          />
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
  image: {
    width: screen.width,
    height: screen.width / 2
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
  },
  bookDetailRelatedContainer: {
    margin: 10
  },
  imageScrollContainer: {
    flexDirection: "column"
  },
  imageScroll: {
    width: screen.width / 2.2,
    height: screen.width / 3
  },
  descriptionText: {
    fontSize: 20,
    width: screen.width / 2,
    textAlign: "center",
    marginLeft: -10
  },
  viewModalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 450
  },
  titleModalText: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10
  },
  buttonModal: {
    backgroundColor: "#F4F4F4",
    paddingVertical: 15,
    color: "#000",
    fontSize: 22
  },
  imageModalScroll: {
    margin: 20
  },
  imageShareModal: {
    marginRight: 15
  }
});
