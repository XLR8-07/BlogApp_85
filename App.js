import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as firebase from 'firebase';

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ProfileScreen from "./src/screens/ProfileScreen";

import {AuthContext, AuthProvider} from './src/providers/AuthProvider';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import EditProfileScreen from './src/screens/EditProfileScreen';
import CommentScreen from './src/screens/CommentScreen';

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();


var firebaseConfig = {
  apiKey: "AIzaSyCKUtGDSaIyHRwXOkhgEOzIjMIAEpOe4Ig",
  authDomain: "blogapp85-59c18.firebaseapp.com",
  projectId: "blogapp85-59c18",
  storageBucket: "blogapp85-59c18.appspot.com",
  messagingSenderId: "846554695467",
  appId: "1:846554695467:web:88498d32c89fa1ebbfa76e"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


const ProfileStackScreen = () =>{
  return(
    <ProfileStack.Navigator initialRouteName='Profile'>
      <ProfileStack.Screen name = 'Profile' component={ProfileScreen} options={{headerShown: false}}/>
      <ProfileStack.Screen name = 'EditProfile' component={EditProfileScreen} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  )
}
const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeStackScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileStackScreen} />
    </AppDrawer.Navigator>
  );
};

const HomeTabScreen = ()=>{
  return(
    <HomeTab.Navigator>
      <HomeTab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Entypo name="home" color="white" size={26} />
          ) : (
            <AntDesign name="home" color="white" size={22} />
          ),
      }}/>
      <HomeTab.Screen name="Notification" component={NotificationScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons name="ios-notifications" size={26} color="white" />
          ) : (
            <Ionicons
              name="ios-notifications-outline"
              size={22}
              color="white"
            />
          ),
      }}/>
    </HomeTab.Navigator>
  );
}

const HomeStackScreen = () =>{
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={HomeTabScreen} options={{headerShown: false}}/>
      <HomeStack.Screen name='Comment' component={CommentScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  )
}

const AuthStackScreen = ()=>{
  return (
    <AuthStack.Navigator initialRouteName='SignIn'>
      <AuthStack.Screen name='SignIn' component={SignInScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  );
}

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen />} 
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
    
  );
}

export default App;
