import React, { Component } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { Divider, Card, Title } from "react-native-paper";
import Route from "react-native-elements";
import { theme } from "../theme/Index";

import * as firebase from "firebase";
import "firebase/firestore";

class Drug extends Component {
  state = {
    drugData: []
  };
  componentDidMount() {
    this.getDataFromFirebase();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>sdasda</Text>
        <p>asasas</p>\n<p><br></p>\n<p>s</p>\n<p><br></p>\n<p><br></p>\n<p><br></p>\n<ul>\n  <li>asdasdas</li>\n  <li>sadasda</li>\n  <li>sad</li>\n  <li>ad</li>\n  <li>asd</li>\n  <li>sa</li>\n  <li>da</li>\n  <li>d</li>\n  <li>asd</li>\n  <li>sa</li>\n  <li>d</li>\n  <li>sad</li>\n  <li>a</li>\n</ul>
        <Text
          title="click me"
          onPress={() => {
            Linking.openURL("https://google.com");
          }}
        >
          asas
        </Text>
      </View>
    );
  }

  getDataFromFirebase() {
    let data = [];
    let drugs = firebase
      .firestore()
      .collection("Drugs")
      .orderBy("date", "desc")
      .limit(3)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          //console.log(doc);
          this.setState({ drugData: [...this.state.drugData, doc.data()] });
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: "center",
    //  justifyContent: "center"
  },
  title: {
    color: theme.colors.accent,
    margin: 5
  }
});

export default Drug;
