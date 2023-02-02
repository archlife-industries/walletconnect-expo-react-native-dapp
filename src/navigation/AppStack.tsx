import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import { fonts } from '../theme';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <></>}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#ff69b4',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#333333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: fonts.bold,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
