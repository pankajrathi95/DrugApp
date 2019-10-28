import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";

import { createRootNavigator } from "./src/navigation/Router";
import ApiKeys from "./src/config/FirebaseApi";
import * as firebase from "firebase";

export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false
  };

  constructor(props) {
    super(props);
    // Initialize firebase...
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  //This method Cache Splash Image/Resource
  _cacheSplashResourcesAsync = async () => {
    const splashImage = require("./assets/splash.png");
    return Asset.fromModule(splashImage).downloadAsync();
  };

  //This method Cache All App Images/Resources
  _cacheAllResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require("./assets/icon.png"),
      require("./assets/splash.png")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);

    this.setState({ isAppReady: true });
  };

  render() {
    const Layout = createRootNavigator(true);
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require("./assets/splash.png")}
            onLoad={this._cacheAllResourcesAsync}
          />
        </View>
      );
    }
    return (
      <PaperProvider>
        <Layout />
      </PaperProvider>
    );
  }
}
