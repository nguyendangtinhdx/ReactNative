/*
MovieComponent - Examle of Redux Saga with Movie List App
*/
import React, { Component } from "react";
import Button from "react-native-button";
import FlatListItem from "./FlatListItem";
import EditModal from "./EditModal";

import {
  Text,
  View,
  Image,
  Alert,
  Platform,
  TextInput,
  FlatList
} from "react-native";

console.disableYellowBox = true;

export default class MovieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { movieName: "", releaseYear: "" };
  }
  componentDidMount() {
    this.props.onFetchMovies("asc");
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 34 : 0 }}>
        <Text
          style={{
            margin: 10,
            fontWeight: "bold",
            color: "forestgreen",
            fontSize: 20
          }}
        >
          Redux Saga
        </Text>
        <View style={{ height: 100, margin: 10 }}>
          <TextInput
            style={{
              flex: 1,
              margin: 5,
              padding: 10,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ movieName: text })}
            value={this.state.movieName}
            placeholder="Nhập tên"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={{
              flex: 1,
              margin: 5,
              padding: 10,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ releaseYear: text })}
            value={this.state.releaseYear}
            placeholder="Nhập năm"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{ height: 70, flexDirection: "row" }}>
          {/* <Button
            containerStyle={{
              padding: 10,
              margin: 10,
              width: 150,
              height: 45,
              borderRadius: 10,
              backgroundColor: "darkviolet"
            }}
            style={{ fontSize: 18, color: "white" }}
            onPress={() => {
              this.props.onFetchMovies("asc");
            }}
          >
            Show list
          </Button> */}
          <Button
            containerStyle={{
              padding: 10,
              margin: 10,
              width: 150,
              height: 45,
              borderRadius: 10,
              backgroundColor: "darkviolet"
            }}
            style={{ fontSize: 18, color: "white" }}
            onPress={() => {
              const { movieName, releaseYear } = this.state;
              if (!movieName.length || !releaseYear.length) {
                alert("Tên và năm không được để trống");
                return;
              }
              this.props.onAddMovie({
                name: movieName,
                releaseYear: releaseYear
              });
            }}
          >
            Thêm
          </Button>
        </View>
        <FlatList
          data={this.props.movies}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <FlatListItem {...item} itemIndex={index} movieComponent={this} />
          )}
        />
        <EditModal ref={"editModal"} movieComponent={this} />
      </View>
    );
  }
}
