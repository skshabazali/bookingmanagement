import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import images from "../src/Common/images";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../src/Screens/Home';
import Hotel from '../src/Screens/Hotel';
import Request from "../src/Screens/Request";
import { normalizeFont as np } from "../src/Common/NormalizeFonts";
import { normalizeWidth as nw } from "../src/Common/NormalizeWidth";
import { normalizeHeight as nh } from "../src/Common/NormalizeHeight";
import colors from "../src/Common/Colors";



const home=createStackNavigator({
  Home:{screen:Home,
    header:null,
    
},
})

const request=createStackNavigator({
    Request:{screen:Request},
    
  })

const hotel=createStackNavigator({
  Hotel:{screen:Hotel},
  
})
const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: home },
    Request:{screen:request},
    Hotel:{screen:hotel},
    
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackAllowFontScaling: true,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName=null
        if (routeName.includes("Home")) {
          iconName = focused ? images.home : images.home;
        } else if (routeName.includes("Hotel")) {
          iconName = focused ? images.hotel : images.hotel;
        } else if (routeName.includes("Request")) {
          iconName = focused ? images.request : images.request;
        }
        return (
          <Image
            source={iconName}
            style={{marginTop:nh(40),marginBottom:nh(30),width:nw(24),height:nh(24),resizeMode:'contain',opacity:focused?1:0.5}}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#7D31AC",
      style: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white',
        height:55,
        //shadowColor:'black',
        
       // paddingVertical: 5,
        //backgroundColor: "#eaeaea"
      },
      labelStyle: {
        fontSize: 12,
        //fontFamily: Fonts.type.bold,
        fontWeight: "200"
      },
      headerBackTitleStyle: {
        color: "#7D31AC",
        backgroundColor:'#7D31AC',
        //fontFamily: Fonts.type.base,
        fontSize: 17
      }
    }
  }
);

export default createAppContainer( BottomTabNavigator);