import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Platform, StatusBar, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

//Import your Screen here
import Home from "./../screens/Home";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import { theme } from "../theme/Index";
import Welcome from "./../screens/Welcome";
import Profile from "./../screens/Profile";
import Drug from "./../screens/Drug";
import Search from "./../screens/Search";
import Disease from "../screens/Disease";
import DrugDetail from "./../components/Drug";

const HomeStackNavigator = createStackNavigator(
  {
    HomeNavigator: Home
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.white
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
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.white
        }
      };
    }
  }
);

const DrugStackNavigator = createStackNavigator(
  {
    DrugNavigator: Drug,
    DrugDetailNavigator: DrugDetail
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.white
        }
      };
    }
  }
);

const SearchStackNavigator = createStackNavigator(
  {
    SearchNavigator: Search
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.white
        }
      };
    }
  }
);

const DiseaseStackNavigator = createStackNavigator(
  {
    DiseaseNavigator: Disease
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon
            style={{ paddingRight: 10 }}
            onPress={() => navigation.toggleDrawer()}
            name="search"
            size={30}
          />
        ),
        headerStyle: {
          backgroundColor: theme.colors.white
        }
      };
    }
  }
);

const AppDrawerNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: "Home",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="home" size={25} color={tintColor} />;
        }
      }
    },
    Drug: {
      screen: DrugStackNavigator,
      navigationOptions: {
        title: "Drug",
        tabBarIcon: ({ tintColor }) => {
          return <Icon5 name="tablets" size={20} color={tintColor} />;
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        title: "Search",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="search" size={25} color={tintColor} />;
        }
      }
    },
    Disease: {
      screen: DiseaseStackNavigator,
      navigationOptions: {
        title: "Disease",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="stethoscope" size={25} color={tintColor} />;
        }
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        title: "Profile",
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="user" size={25} color={tintColor} />;
        }
      }
    }
  },
  {
    //drawerWidth: Math.round(Dimensions.get("window").width) * 0.75,
    shifting: false,
    activeColor: theme.colors.white,
    inactiveColor: theme.colors.black,

    barStyle: {
      backgroundColor: theme.colors.accent,
      padding: 0
    },
    itemsContainerStyle: {
      marginVertical: 30
    },
    labelStyle: {
      fontSize: theme.sizes.h2
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
