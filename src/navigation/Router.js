import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Platform, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//Import your Screen here
import Home from "./../screens/Home";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import { theme } from "../theme/Index";

const AppStack = createStackNavigator({ Home: Home });
const AuthStack = createMaterialTopTabNavigator(
  {
    SignIn: {
      screen: Login,
      navigationOptions: {
        header: null,
        tabBarLabel: "SIGN IN",
        tabBarIcon: () => {
          return (
            <Icon name="sign-in" size={30} color={theme.colors.secondary} />
          );
        }
      }
    },
    SignUp: {
      screen: Signup,
      navigationOptions: {
        header: null,
        tabBarLabel: "SIGN UP",
        scrollEnabled: true,
        tabBarIcon: () => {
          return (
            <Icon name="user-plus" size={30} color={theme.colors.secondary} />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      },
      showIcon: true
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: AppStack
        },
        SignedOut: {
          screen: AuthStack
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    )
  );
};
