import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

//fix this import to be in its own directory instead of '.expo'
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';


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
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25
  },
});
