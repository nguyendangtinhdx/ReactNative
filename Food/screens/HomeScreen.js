import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal
} from "react-native";
import Button from "react-native-button";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import { HomeDetail, BookDetail } from "../utils/ScreenNames";
import bookData from "../data/BookData.json";
import { RadioData } from "../data/RadioData";

var screen = Dimensions.get("window");

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: bookData.books,
      modalVisible: false,
      radioData: RadioData.contents,
      value: 1
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
      <TextInput
        placeholder="this is placeholder"
        placeholder="search"
        placeholderTextColor="gray"
        style={{
          height: 50,
          width: 415,
          borderColor: "black"
        }}
      />
    );
    let headerStyle = { backgroundColor: "#FEF7EF" };
    let headerTitleStyle = {
      flex: 1,
      fontSize: 24,
      color: "#DF6F51",
      textAlign: "center"
    };
    let header = null;
    return {
      tabBarLabel,
      tabBarIcon,
      headerTitle,
      headerStyle,
      headerTitleStyle,
      header
    };
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  renderBook = ({ item, index }) => {
    return (
      <View style={styles.bookContainer}>
        <View style={styles.headerBookContainer}>
          <View style={styles.headerBookLeft}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.headerBookRight} />
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
        </View>
        <Text style={styles.detailText}>{item.detail}</Text>
        <TouchableOpacity
          style={styles.buttonStar}
          activeOpacity={0.5}
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
            style={styles.imageStar}
            source={require("../assets/icons/star-navigation.png")}
          />
          <Text style={styles.buttonStarText}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={true}
          ref={re => (this.scroll = re)}
        >
          <View style={styles.headerContainer}>
            <View style={styles.inputSearchContainer}>
              <TextInput
                style={styles.inputSearch}
                placeholder="Tìm kiếm"
                placeholderTextColor="#DE6F51"
                underlineColorAndroid="transparent"
                onFocus={() => {
                  this.props.navigation.navigate(HomeDetail);
                }}
              />
              <Image
                source={require("../assets/icons/search.png")}
                style={styles.iconSearch}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.imageButtonContainer}>
                  <Image
                    style={styles.imageButton}
                    source={require("../assets/icons/target.png")}
                  />
                  <Text style={styles.buttonText}>Giảm giá</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.borderRight} />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.imageButtonContainer}>
                  <Image
                    style={styles.imageButton}
                    source={require("../assets/icons/wine.png")}
                  />
                  <Text style={styles.buttonText}>Rượu</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.borderRight} />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.imageButtonContainer}>
                  <Image
                    style={styles.imageButton}
                    source={require("../assets/icons/knife.png")}
                  />
                  <Text style={styles.buttonText}>Món ăn</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.borderRight} />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.imageButtonContainer}>
                  <Image
                    style={styles.imageButton}
                    source={require("../assets/icons/map.png")}
                  />
                  <Text style={styles.buttonText}>Bản đồ</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
              <View style={styles.viewModalContainer}>
                <Text style={styles.titleModalText}>
                  Chọn mã món ăn: {this.state.value}
                </Text>
                <RadioForm
                  style={styles.radioButton}
                  radio_props={this.state.radioData}
                  initial={0}
                  formHorizontal={false}
                  labelHorizontal={true}
                  onPress={value => {
                    this.setState({ value: value });
                  }}
                  labelStyle={{ fontSize: 20, color: "#fff" }}
                  buttonSize={10}
                  buttonOuterSize={30}
                  // buttonColor={"red"}
                />
                <View style={styles.buttonModalContainer}>
                  <Button
                    style={styles.buttonModalCancel}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    style={styles.buttonConfirm}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      this.props.navigation.navigate(HomeDetail);
                    }}
                  >
                    Xác nhận
                  </Button>
                </View>
              </View>
            </Modal>
            <View style={styles.borderBottom} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Món ăn ưu thích</Text>
            <ScrollView
              horizontal={true}
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={re => (this.scroll = re)}
            >
              <FlatList
                horizontal={true}
                legacyImplementation={false}
                data={this.state.data}
                renderItem={item => this.renderBook(item)}
                keyExtractor={book => book.id.toString()}
              />
            </ScrollView>
            <Text style={styles.titleText}>Món ăn bán chạy nhất</Text>
            <ScrollView
              horizontal={true}
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={re => (this.scroll = re)}
            >
              <FlatList
                horizontal={true}
                legacyImplementation={false}
                data={this.state.data}
                renderItem={item => this.renderBook(item)}
                keyExtractor={book => book.id.toString()}
              />
            </ScrollView>
          </View>
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
  headerContainer: {
    margin: 5
  },
  inputSearchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#DE6F51",
    borderRadius: 5,
    height: 50
  },
  inputSearch: {
    flex: 1,
    fontSize: 20,
    color: "#DE6F51"
  },
  iconSearch: {
    marginRight: 5,
    tintColor: "#DE6F51"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5
  },
  button: {
    padding: 10,
    width: screen.width / 4.1,
    height: 80
  },
  imageButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageButton: {
    tintColor: "#DE6F51",
    width: 40,
    height: 40
  },
  buttonText: {
    fontSize: 16,
    color: "#DE6F51"
  },
  borderRight: {
    borderRightColor: "#DE6F51",
    borderRightWidth: 3
  },
  borderBottom: {
    backgroundColor: "rgb(77,120,140)",
    height: 1
  },
  contentContainer: {
    margin: 5
  },
  bookContainer: {
    width: (screen.width * 2) / 3,
    margin: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },           // IOS
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 2 // Android // shadow
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
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 5
  },
  image: {
    width: screen.width / 3.3,
    height: screen.width / 3.3,
    marginRight: 1
  },
  detailText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
    width: (screen.width * 2) / 3.5,
    height: 45
  },
  buttonStar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    height: 45,
    borderColor: "#FFB400",
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: 5
  },
  buttonStarText: {
    fontSize: 20,
    color: "#FFB400",
    marginLeft: 10
  },
  imageStar: {
    tintColor: "#FFB400"
  },
  titleText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5
  },
  viewModalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  },
  titleModalText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  buttonModalContainer: {
    flexDirection: "row"
  },
  buttonModalCancel: {
    width: screen.width / 2.2,
    height: 40,
    paddingVertical: 5,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff"
  },
  buttonConfirm: {
    width: screen.width / 2.2,
    height: 40,
    paddingVertical: 5,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#DE6F51",
    color: "#fff"
  },
  radioButton: {
    marginVertical: 20
  }
});
