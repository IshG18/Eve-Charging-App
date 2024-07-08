import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Platform,StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';
import * as Location from 'expo-location';
import { UserLocationContext } from './App/Context/UserLocationContext';


SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'hs': require('./assets/fonts/HindVadodara-Regular.ttf'),
    'hs-semi': require('./assets/fonts/HindVadodara-SemiBold.ttf'),
    'hs-bold': require('./assets/fonts/HindVadodara-Bold.ttf'),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      console.log(location.coords)
    })
    ();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    //Make sure to use the env variable set up, in actual use
    <ClerkProvider tokenCache={tokenCache} publishableKey={'pk_test_ZmFjdHVhbC1pbXBhbGEtNzguY2xlcmsuYWNjb3VudHMuZGV2JA'}>
    <UserLocationContext.Provider value={{location, setLocation}}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigations/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen/>
        </SignedOut>

        <StatusBar style="auto" />
      </View>
    </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25,
  }
});
