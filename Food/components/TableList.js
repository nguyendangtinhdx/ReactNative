import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, Dimensions } from "react-native";
import Table from "react-native-simple-table";

import DataTable from "../data/DataTable";
var screen = Dimensions.get("window");

class TableList extends Component {
  render() {
    let columns = DataTable.generateColumns().columns;
    let dataSource = DataTable.generateData().data;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <Table style={styles.table} columns={columns} dataSource={dataSource} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 160
  },
  table: {
    width: screen.width
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center"
  }
});

export default TableList;
