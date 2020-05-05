//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Axios from 'axios';


// create a component
class RequestComponet extends Component {
    render() {
       
        return (
            <TouchableOpacity onLongPress={()=>{
                console.log("http://devsmash.pythonanywhere.com/resolve-customer-requests/?message_id="+this.props.value.msg_id)
                let url="http://devsmash.pythonanywhere.com/resolve-customer-requests/?message_id="+this.props.value.msg_id
                Axios.get(url).then((Response)=>{
                    console.log(Response)
                    if(Response.data)
                    {
                        alert("Request Resolved!")
                        this.props.onLongPress()
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                
            }}>
            <View style={styles.container}>
                <View style={{alignItems:"center",marginTop:hp("7%")}}>
        <Text style={{color:'#7D31AC',fontSize:17}} >{this.props.value.quantity}</Text>
                </View>
                <View style={{alignItems:"center",marginTop:hp("2%")}} >
        <Text style={{color:'#7D31AC',fontSize:17,textAlign:'center'}}>{this.props.value.type}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height:'auto',
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
