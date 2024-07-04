import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import SettingsScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import Colors from './../Screen/LoginScreen/Utils/Colors'
const Tab = createBottomTabNavigator();
export default function TabNavigations() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarActiveTintColor:Colors.PRIMARY,
        tabBarLabel:"Search",
        tabBarIcon:({color,size}) => <Ionicons name="search-outline" size={size} color={color} />
        }}/>
      <Tab.Screen name="Favorites" component={SettingsScreen} options={{
        tabBarActiveTintColor:Colors.PRIMARY,
        tabBarIcon:({color,size}) => <MaterialCommunityIcons name="heart" size={size} color={color} />
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarActiveTintColor:Colors.PRIMARY,
        tabBarIcon:({color,size}) => <AntDesign name="user" size={size} color="color" />
      }}/>
    </Tab.Navigator>
  )
}