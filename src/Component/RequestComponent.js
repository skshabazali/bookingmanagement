//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


// create a component
class RequestComponet extends Component {
    render() {
       
        return (
            <View style={styles.container}>
                <View style={{alignItems:"center",marginTop:hp("7%")}}>
        <Text style={{color:'#7D31AC',fontSize:17}} >{this.props.value.quantity}</Text>
                </View>
                <View style={{alignItems:"center",marginTop:hp("2%")}} >
        <Text style={{color:'#7D31AC',fontSize:17}}>{this.props.value.type}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height:hp("20%"),
        width:wp("45%"),
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11}
})

//make this component available to the app
export default RequestComponet;
