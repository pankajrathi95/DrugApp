import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Divider, Card, Title } from "react-native-paper";
import { theme } from "../theme/Index";

import * as firebase from "firebase";
import "firebase/firestore";
import { Button } from "../components";

class Drug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugData: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    this.getDataFromFirebase();
  }
  static navigationOptions = {
    title: "Drug   "
  };
  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={styles.activityBar}
          />
        ) : (
          <React.Fragment>
            <Title style={styles.title}>Recently Added Drugs</Title>
            <Card>
              {this.state.drugData.map(data => (
                <React.Fragment key={data.drugName}>
                  <Button
                    onPress={() =>
                      this.props.navigation.push("DrugDetailNavigator")
                    }
                  >
                    <Card.Title
                      title={data.drugName}
                      subtitle="Drug"
                      key={data.drugName}
                    />
                  </Button>
                  <Divider />
                </React.Fragment>
              ))}
            </Card>
          </React.Fragment>
        )}
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
          this.setState({
            drugData: [...this.state.drugData, doc.data()],
            isLoading: false
          });
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
  },
  activityBar: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
});

export default Drug;
