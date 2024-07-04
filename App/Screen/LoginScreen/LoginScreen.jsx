import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
{/*change this too*/}
import Colors from './Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../../hooks/useWarmUpBrowser";
import { Link } from "expo-router";
import * as Linking from "expo-linking"
 
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }

  return (
    <View style={{
      display:"flex",
      justifyContent:'center',
      alignItems:'center',
      marginTop:30}}>
      

      <Image source={require('./../../../assets/images/evelogo.png')} style={styles.logoImage}/>
      <Image source={require('./../../../assets/images/tesla.jpg')} style={styles.bgImage}/>
      
      <View style={{padding:20}}>
        <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging stations near you, pla trips, and so much more</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{
          color:Colors.WHITE,
          textAlign:'center',
          fontFamily:'hs',
          fontSize:15
        }}>
          Login With Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage:{
      height:40,
      objectFit:'contain'
    },
                      
    bgImage:{
      width:'100%',
      height:140,
      marginTop:20,
      objectFit:'cover'
    },
    heading:{
      fontSize:25,
      fontFamily:'hs-bold',
      textAlign:'center',
      marginTop:20
    }, 

    desc:{
      fontSize:17,
      fontFamily:'hs',
      textAlign:'center',
      marginTop:15,
      color:Colors.GRAY,
    },

    button:{
      backgroundColor:Colors.PRIMARY,
      padding:10,
      display:'flex',
      borderRadius:99,
      marginTop:50
    }
})