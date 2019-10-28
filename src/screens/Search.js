import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Search extends Component {
  static navigationOptions = {
    title: "Search   "
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
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

export default Search;
