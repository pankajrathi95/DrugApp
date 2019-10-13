import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Home extends Component {
  static navigationOptions = {
    title: "Home   "
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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

export default Home;
