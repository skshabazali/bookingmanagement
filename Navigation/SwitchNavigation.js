import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import Login from "../src/Screens/Login";
import BottomNavigations from '../src/Screens/BottomNavigation';
import SignUp from '../src/Screens/SignUp';
const Main=createStackNavigator({
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


  
const SwitchNavigation =createSwitchNavigator({
    Main:Main,
    BottomNavigation:BottomNavigations,
})

const AppContainer = createAppContainer(SwitchNavigation);
export default AppContainer;