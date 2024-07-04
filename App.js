import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import Constants from "expo-constants"
import * as SplashScreen from 'expo-splash-screen';;

//fix this import to be in its own directory instead of '.expo'
import LoginScreen from './.expo/App/Screen/LoginScreen/LoginScreen';


SplashScreen.preventAutoHideAsync();
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
    // 
    <ClerkProvider publishableKey={'pk_test_ZmFjdHVhbC1pbXBhbGEtNzguY2xlcmsuYWNjb3VudHMuZGV2JA'}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <Text>You are Signed in</Text>
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
