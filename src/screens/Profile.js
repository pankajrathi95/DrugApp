import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Platform
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "./../theme/Index";
import * as firebase from "firebase";
import "firebase/firestore";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      lastName: null,
      password: null,
      firstName: null,
      errors: [],
      isLoading: false
    };
  }

  static navigationOptions = {
    title: "Profile    "
  };

  componentWillMount() {
    this.getDataFromFirebase();
  }

  sendPasswordLink() {
    this.setState({ isLoading: true });
    let email = firebase.auth().currentUser.email;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        function() {
          this.setState({ isLoading: false });
          Alert.alert(
            "Success!",
            "Password Reset Link has been sent to your email!",
            [
              {
                text: "Ok"
              }
            ],
            { cancelable: false }
          );
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({ isLoading: false });
          Alert.alert(
            "Success!",
            "Error occured. Try again later.",
            [
              {
                text: "Ok"
              }
            ],
            { cancelable: false }
          );
        }.bind(this)
      );
    Keyboard.dismiss();
  }

  handleProfile() {
    const { navigation } = this.props;
    const { email, firstName, lastName, password, isLoading } = this.state;
    this.setState({ isLoading: true });
    const errors = [];
    let userUniqueId = firebase.auth().currentUser.uid;
    Keyboard.dismiss();
    firebase
      .firestore()
      .collection("Users")
      .doc(userUniqueId)
      .set({ firstName: firstName, lastName: lastName, email: email });
    firebase
      .auth()
      .currentUser.updateEmail(email)
      .then(
        function() {
          // Update successful.
          this.setState({ isLoading: false });
          Alert.alert(
            "Success!",
            "Your details have been updated!",
            [
              {
                text: "Ok"
              }
            ],
            { cancelable: false }
          );
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({ isLoading: false });
          // An error happened.
          Alert.alert(
            "Success!",
            "An error occured while updating. Please try after sometime",
            [
              {
                text: "Ok"
              }
            ],
            { cancelable: false }
          );
        }.bind(this)
      );
  }

  getDataFromFirebase() {
    let userUniqueId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("Users")
      .doc(userUniqueId)
      .get()
      .then(
        function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.setState({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    const { navigation } = this.props;
    const { isLoading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView
        style={styles.signup}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Block padding={[theme.sizes.base * 4, theme.sizes.base * 2]}>
            <Block middle>
              <Input
                label="First Name"
                error={hasErrors("firstName")}
                style={[styles.input, hasErrors("firstName")]}
                defaultValue={this.state.firstName}
                onChangeText={text => this.setState({ firstName: text })}
              />
              <Input
                label="Last Name"
                error={hasErrors("lastName")}
                style={[styles.input, hasErrors("lastName")]}
                defaultValue={this.state.lastName}
                onChangeText={text => this.setState({ lastName: text })}
              />
              <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />

              <Button onPress={() => this.sendPasswordLink()}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Change your password
                </Text>
              </Button>

              <Button gradient onPress={() => this.handleProfile()}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Update
                  </Text>
                )}
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  container: {
    flex: 1,
    justifyContent: "center", // Used to set Text Component Vertically Center
    alignItems: "center" // Used to set Text Component Horizontally Center
  }
});

export default Profile;
