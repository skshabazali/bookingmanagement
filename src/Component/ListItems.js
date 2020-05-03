//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


// create a component
class ListItems extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:"center",marginTop:hp("8%")}}>
        <Text style={{color:'#7D31AC',fontSize:17}} >{this.props.item.quantity}</Text>
                </View>
                <View style={{alignItems:"center",marginTop:hp("2%")}} >
        <Text style={{color:'#7D31AC',fontSize:17}}>{this.props.item.type}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height:hp("19%"),
        width:wp("40%"),
        shadowColor: "#000",
        marginTop:hp("2%"),
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11}
})
//make this component available to the app
export default ListItems;
