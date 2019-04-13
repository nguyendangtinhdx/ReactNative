import React, { Component } from "react";
import Button from "react-native-button";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Modal
} from "react-native";

import bookData from "../data/BookData.json";
import TableList from "../components/TableList";
import { Book } from "../utils/ScreenNames";

var screen = Dimensions.get("window");

export default class BookDetailKindScreen extends Component {
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
    let headerTitle = "Món ăn cùng loại";
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
  renderBookDetailKind = ({ item, index }) => {
    return (
      <View style={styles.bookDetailKindContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          ref={re => (this.scroll = re)}
        >
          <Image
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/6/6e/Lactarius_indigo_48568.jpg"
            }}
            style={styles.imageScroll}
          />
          <Image
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/b/bf/Cornish_cream_tea_2.jpg"
            }}
            style={styles.imageScroll}
          />
          <Image
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Yeolmukimchi_3.jpg"
            }}
            style={styles.imageScroll}
          />
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
            renderItem={item => this.renderBookDetailKind(item)}
            keyExtractor={book => book.id.toString()}
          />
          <View style={styles.subscribeContainer}>
            <Text style={styles.titleText}>
              5 địa điểm thưởng thức món ăn miền Trung chuẩn vị tại TP.HCM
            </Text>
            <Text style={styles.contentText}>
              Ẩm thực miền Trung đa dạng với hương vị đậm đà, thơm ngon. Bạn hãy
              lưu lại 5 địa điểm dưới đây để thỏa sức thưởng thức món ăn miền
              Trung chất lượng.
            </Text>
            <Button>
              <Text style={styles.buttonSubcribeText}>Subscribe</Text>
            </Button>
          </View>
          <TableList />
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
  nameText: {
    fontWeight: "bold",
    fontSize: 22
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 5
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
  bookDetailKindContainer: {
    marginHorizontal: 10
  },
  imageScroll: {
    width: screen.width / 2.5,
    height: screen.width / 3,
    marginRight: 10
  },
  subscribeContainer: {
    padding: 10,
    backgroundColor: "#FFECE8"
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18
  },
  contentText: {
    fontSize: 16
  },
  buttonSubcribeText: {
    paddingTop: 5,
    marginTop: 5,
    width: "100%",
    height: 40,
    fontSize: 20,
    color: "#939396",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#939396"
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
