import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Platform, StatusBar, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//Import your Screen here
import Home from "./../screens/Home";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import { theme } from "../theme/Index";
import Welcome from "./../screens/Welcome";
import Profile from "./../screens/Profile";

const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: Home
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="bars"
            size={30}
          />
        ),
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.accent
        }
      };
    }
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    ProfileNavigator: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="bars"
            size={30}
          />
        ),
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.accent
        }
      };
    }
  }
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: "Home   "
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        title: "Profile   "
      }
    }
  },
  {
    drawerWidth: Math.round(Dimensions.get("window").width) * 0.75,
    contentOptions: {
      activeTintColor: theme.colors.accent,
      itemsContainerStyle: {
        marginVertical: 30
      },
      labelStyle: {
        fontSize: theme.sizes.h2
      }
    }
  }
);

//const AppStack = createStackNavigator({ Home: Home });
const WelcomeStack = createStackNavigator({
  Welcome: {
    screen: Welcome
  }
});
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
          screen: AppDrawerNavigator
        },
        SignedOut: {
          screen: WelcomeStack
        },
        SignInAndOut: {
          screen: AuthStack
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    )
  );
};
