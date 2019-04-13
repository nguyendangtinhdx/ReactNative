import React, { Component } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import Button from "react-native-button";
import { InfoData } from "../data/InfoData";

var screen = Dimensions.get("window");

class SectionListItem extends Component {
  constructor() {
    super();
    this.state = {
      page: 1
    };
  }
  toViewDescription() {
    this.scroll.scrollTo({ x: this.state.page * screen.width });
  }
  render() {
    return (
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          ref={re => (this.scroll = re)}
        >
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemTextName}>{this.props.item.name}</Text>
            <View style={styles.rightArrowContainer}>
              <Button onPress={() => this.toViewDescription()}>
                <Image
                  source={require("../assets/icons/right-arrow.png")}
                  style={styles.rightArrow}
                />
              </Button>
            </View>
          </View>
          <View style={styles.itemDescriptionContainer}>
            <Text style={styles.itemTextDescription}>
              {this.props.item.description}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.borderBottom} />
      </View>
    );
  }
}
class SectionHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.section.title}</Text>
      </View>
    );
  }
}
export default class InfoList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item, index }) => {
            return <SectionListItem item={item} index={index} />;
          }}
          renderSectionHeader={({ section }) => {
            return <SectionHeader section={section} />;
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
    width: "100%"
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
  itemDescriptionContainer: {
    backgroundColor: "#e97600",
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
