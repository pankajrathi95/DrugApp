import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  ScrollView
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "./../theme/Index";
import * as firebase from "firebase";
//import { ScrollView } from "react-native-gesture-handler";

export default class Signup extends Component {
  state = {
    email: null,
    lastName: null,
    password: null,
    firstName: null,
    errors: [],
    loading: false
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { email, firstName, lastName, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    setTimeout(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Authentication success");
          let userUniqueId = firebase.auth().currentUser.uid;
          this.CreateUserTableInDB(firstName, email, password, userUniqueId);
          Alert.alert(
            "Success!",
            "Your account has been created",
            [
              {
                text: "Continue",
                onPress: () => {
                  navigation.navigate("SignIn");
                }
              }
            ],
            { cancelable: false }
          );
        })
        .catch(error => {
          this.setState({ isLoading: false });
          Alert.alert(error.message);
        });
    }, 300);

    this.setState({ loading: false });
  }

  CreateUserTableInDB = (username, email, password, userUniqueId) => {
    setTimeout(() => {
      firebase
        .database()
        .ref("Users/" + userUniqueId)
        .set({
          ID: userUniqueId,
          USERNAME: username,
          EMAIL: email,
          PASSWORD: password
        })
        .then(() => {
          console.log("User attributes pushed");
        })
        .catch(error => {
          console.log("User attributes failed to pushed");
          Alert.alert(error.message);
          this.setState({ isLoading: false });
        });
    }, 200);
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.signup} behavior="padding">
          <Block padding={[theme.sizes.base * 4, theme.sizes.base * 2]}>
            <View style={styles.container}>
              <Image
                style={{
                  width: 75,
                  height: 75
                }}
                source={require("./../../assets/icon.png")}
              />
            </View>
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
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
              </Button>
              <Button onPress={() => navigation.navigate("SignIn")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Already have an account? Login
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </ScrollView>
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
