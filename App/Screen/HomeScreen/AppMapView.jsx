import React, { useContext } from 'react';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet} from 'react-native';
import MapViewStyle from './../../Screen/LoginScreen/Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function AppMapView() {

  const {location, setLocation} = useContext(UserLocationContext);
  return location?.latitude&&(
    <View>
      <MapView 
      style={styles.map} 
      provider={PROVIDER_GOOGLE}
      //showsUserLocation={true}
      customMapStyle={MapViewStyle}
      // region={{
      //   latitude:location?.latiitude,
      //   longitude:location?.location,
      //   latitudeDelta:0.0422,
      //   longitudeDelta:0.0421
      // }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });