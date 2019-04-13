/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  Button
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const URL_API = "http://192.168.70.197:4000/api/users/";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      newApiData: [],
      id: "",
      name: "",
      email: "",
      phone: "",
      checkValidateInputName: true,
      checkValidateInputEmail: true,
      checkValidateInputPhone: true
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    fetch(URL_API, {
      method: "GET"
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ apiData: jsonData });
        console.log(this.state.apiData);
      })
      .done();
    this.clear();
  };

  validate() {
    if (this.state.name == "") {
      this.setState({ checkValidateInputName: false });
      return false;
    } else {
      this.setState({ checkValidateInputName: true });
    }
    if (this.state.email == "") {
      this.setState({ checkValidateInputEmail: false });
      return false;
    } else {
      this.setState({ checkValidateInputEmail: true });
    }
    if (this.state.phone == "") {
      this.setState({ checkValidateInputPhone: false });
      return false;
    } else {
      this.setState({ checkValidateInputPhone: true });
    }
    return true;
  }
  save = () => {
    if (!this.validate()) {
      return;
    }
    fetch(URL_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      })
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ newApiData: jsonData });
        console.log(this.state.newApiData);
      })
      .done();
    this.clear();
    this.loadData();
  };

  search = () => {
    fetch(URL_API + this.state.name, {
      method: "GET"
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ apiData: jsonData });
        console.log(this.state.apiData);
      })
      .done();
    this.id = null;
  };

  update = () => {
    fetch(URL_API, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        id: this.state.id
      })
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ newApiData: jsonData });
        console.log(this.state.newApiData);
      })
      .done();
    this.loadData();
  };

  delete = () => {
    // alert(id);
    fetch(URL_API + this.state.id, {
      method: "DELETE"
    })
      .then(responseData => {
        console.log(responseData.rows);
      })
      .done();
    this.clear();
    this.loadData();
  };

  deleteData() {
    Alert.alert("You tapped the button!");
    console.log("FOOOBAAR");
  }

  clear = () => {
    this.setState({
      id: "",
      name: "",
      email: "",
      phone: "",
      checkValidateInputName: true,
      checkValidateInputEmail: true,
      checkValidateInputPhone: true
    });
  };

  render() {
    const data = this.state.apiData;
    let dataDisplay = data.map(function(jsonData) {
      return (
        <View key={jsonData.id}>
          <View style={styles.dataTable}>
            <Text style={styles.dataColumn}>{jsonData.id}</Text>
            <Text style={styles.dataColumn}>{jsonData.name}</Text>
            <Text style={styles.dataColumn}>{jsonData.email}</Text>
            <Text style={styles.dataColumn}>{jsonData.phone}</Text>
            {/* <TouchableHighlight onPress={this.deleteData}>
              <Text style = {{color: "red"}}> Delete </Text>
            </TouchableHighlight> */}
          </View>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Manager User</Text> */}
        {/* <View style={styles.lineBreak} /> */}

        {/* <TextInput
          style={styles.input}
          placeholder="Enter Id"
          onChangeText={text => this.setState({ id: text })}
          value={this.state.id}
        /> */}

        <TextInput
          style={
            this.state.checkValidateInputName ? styles.input : styles.inputErr
          }
          placeholder="Enter Name"
          onChangeText={text => this.setState({ name: text })}
          value={this.state.name}
        />
        <TextInput
          style={
            this.state.checkValidateInputEmail ? styles.input : styles.inputErr
          }
          placeholder="Enter Emal"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={
            this.state.checkValidateInputPhone ? styles.input : styles.inputErr
          }
          placeholder="Enter Phone"
          onChangeText={text => this.setState({ phone: text })}
          value={this.state.phone}
        />
        <TouchableHighlight style={styles.button} onPress={this.loadData}>
          <Text style={styles.contentButton}>View</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.save}>
          <Text style={styles.contentButton}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.search}>
          <Text style={styles.contentButton}>Search</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.update}>
          <Text style={styles.contentButton}>Update</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.delete}>
          <Text style={styles.                 contentButton}>Delete</Text>
        </TouchableHighlight>
        <ScrollView contentContainerStyle={styles.dataRow}>
          <Text>   ID Name                Email                                 Phone</Text>
          {dataDisplay}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5
  },
  lineBreak: {
    height: 2,
    backgroundColor: "#CCCCCC",
    width: "90%",
    marginBottom: 10
  },
  input: {
    textAlign: "center",
    height: 40,
    width: "90%",
    padding: 4,
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#841584",
    borderRadius: 5
  },
  inputErr: {
    textAlign: "center",
    height: 40,
    width: "90%",
    padding: 4,
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red"
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    width: "90%",
    backgroundColor: "#841584"
  },
  contentButton: {
    color: "#fff",
    textAlign: "center"
  },
  dataTable: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  dataColumn: {
    color: "#000",
    marginLeft: 10
  },
  dataRow: {}
});
