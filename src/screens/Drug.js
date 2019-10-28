import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Drug extends Component {
  static navigationOptions = {
    title: "Drug   "
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Drug</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Drug;
