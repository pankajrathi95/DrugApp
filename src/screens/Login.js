import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Image,
  View,
  ScrollView
} from "react-native";
import * as firebase from "firebase";

import { Button, Block, Input, Text } from "../components";
import { theme } from "./../theme/Index";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    isLoading: false
  };

  handleLogin() {
    const { email, password, isLoading } = this.state;

    Keyboard.dismiss();
    this.setState({ isLoading: true });

    // check with backend API or with some static data

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ isLoading: false });
        console.log("login success");
        this.props.navigation.navigate("SignedIn");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log("login failed");
        Alert.alert(error.message);
      });

    // this.setState({ loading: false });
  }
  render() {
    const { navigation } = this.props;
    const { isLoading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.login} behavior="padding">
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
              <Button gradient onPress={() => this.handleLogin()}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>
              <Button onPress={() => navigation.navigate("SignUp")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  New User? Create an account
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
  login: {
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
