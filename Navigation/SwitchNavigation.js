import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import Login from "../src/Screens/Login";
import BottomNavigations from '../src/Screens/BottomNavigation';
import SignUp from '../src/Screens/SignUp';
import SplashScreen from '../src/Screens/SplashScreen';
const Main=createStackNavigator({
    SplashScreen:{
        screen:SplashScreen,
        navigationOptions: {
            header: null,
        },
    },
    Login:{screen:Login,
        navigationOptions: {
            header: null,
        },
    },
    SignUp:{screen:SignUp,
            navigationOptions: {
                header: null,
            },
    },
 
  
})


  
const SwitchNavigation =createStackNavigator({
    Main:{
        screen:Main,
        navigationOptions:{
            header:null
        }
    },
    BottomNavigation:{
        screen:BottomNavigations,
        navigationOptions:{
            header:null
        }
    },
})

const AppContainer = createAppContainer(SwitchNavigation);
export default AppContainer;