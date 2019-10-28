import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Disease extends Component {
  static navigationOptions = {
    title: "Disease   "
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Disease</Text>
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

export default Disease;
