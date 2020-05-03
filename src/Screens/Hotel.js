//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { CardItem ,Card, Container, Content} from 'native-base';
import images from '../Common/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Axios from 'axios';

import RNRestart from 'react-native-restart';
// create a component
class Hotel extends Component {
    static navigationOptions = {
        title:null,
        headerStyle: {
            backgroundColor: '#7D31AC',
          },
        headerTintColor: "#7D31AC",
        headerBackTitleStyle: {
          color: "#000",
          fontSize: 17
        
        }
      };
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            name:'',
            data:"",
            password:"",
            conformpass:"",
            userId: "",
            phonenumber:"",
            fcmTokens:"",
            loginuid:"",
        };
        
      }
      componentDidMount(){
        let uid=auth().currentUser.uid;
        // database()
        // .ref(`/users/${uid}`)
        // .once('value')
        // .then(snapshot => {

        //     this.setState({data:snapshot.val()})
        //   console.log('User data: ',snapshot.val());
        // });
        Axios.get('http://devsmash.pythonanywhere.com/get-hotel-profile/?auth_key='+uid).then((Response)=>{
            console.log(Response.data)
            this.setState({
                email:Response.data.email,
                name:Response.data.name,
                phonenumber:Response.data.phone
            })
        }).catch((err)=>{
            console.log(err)
        })
      }
    render() {
     
        return (
            <Container>
                <Content>
            <View>
            <Image source={images.profileimage} style={{width:wp("99%"),height:hp("30%")}} />
            </View>
            <View style={{marginTop:hp('3%'),marginLeft:wp("3%")}}>
                <Text style={{fontSize:20,color:'#7D31AC'}}>User Name </Text>
        <Text style={{fontSize:15,color:'black'}}>{this.state.name}</Text>
            </View>
            <View style={{marginTop:hp('3%'),marginLeft:wp("3%")}}>
                <Text style={{fontSize:20,color:'#7D31AC'}}>Email Address</Text>
        <Text style={{fontSize:15,color:'black'}}>{this.state.email}</Text>
            </View>
            <View style={{marginTop:hp('3%'),marginLeft:wp("3%")}}>
                <Text style={{fontSize:20,color:'#7D31AC'}}>Phone Number</Text>
        <Text style={{fontSize:15,color:'black'}}>{this.state.phonenumber}</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                // this.login(this.state.email,this.state.password);
                
       
    // Immediately reload the React Native Bundle
    RNRestart.Restart();
                //this.props.navigation.navigate("Login");
                
                }}
                style={{marginTop:hp('8%'),marginLeft:wp("3%"),width:wp("90%")}}>
                <View style={{backgroundColor:'#7D31AC',height:40,justifyContent:'center',marginHorizontal:15,marginBottom:10,width:wp("90%")}}>
                      <Text style={{color:'white',alignSelf:'center'}}>LOG OUT</Text>
                </View>
                </TouchableOpacity>
            </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Hotel;
