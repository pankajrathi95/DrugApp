import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Divider, Card, Title } from "react-native-paper";
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
