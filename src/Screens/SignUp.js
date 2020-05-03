//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {Container, Content } from 'native-base';
import { TextInput } from 'react-native-paper';
import images from "../Common/images";
import { normalizeHeight as nh } from '../Common/NormalizeHeight';
import { normalizeWidth as nw } from '../Common/NormalizeWidth';
import { firebase } from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import axios from "axios";

// create a component
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            name:'',
            password:"",
            conformpass:"",
            userId: "",
            phonenumber:"",
            fcmTokens:"",
            
        };
      }
 
    SignUp=(email,password)=>{
            auth().createUserWithEmailAndPassword(email,password)
            .then((response) => {
               this.setState({userId:auth().currentUser.uid});
               messaging().getToken()
        .then(async fcmToken => {
          if (fcmToken) {
            this.setState({fcmTokens:fcmToken});
            console.log(this.state.fcmTokens);
            const ref = database().ref(`/users/${this.state.userId}`);
            await ref.set({
                fcmToken:fcmToken,
                name:this.state.name,
                email:this.state.email,
                phonenumber:this.state.phonenumber,
              });
            let url='http://devsmash.pythonanywhere.com/create-hotel/?'
               
                console.log("fcmToken is ",this.state.fcmTokens);
                axios.get(url+`name=${this.state.name}&email=${this.state.email}&password=${this.state.password}&device_token=${fcmToken}&auth_key=${this.state.userId}&phone=${this.state.phonenumber}`
    )
    .then((response)=>{

        console.log("user",response.data);
        this.props.navigation.navigate('BottomNavigation');
        

      
    }).catch((err)=>{
      console.log(err.toString());
    })
       
       
          } else {
            // user doesn't have a device token yet
            console.log('ee')
          } 
        });
    }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
}
    validate=(text)=>{
        this.setState({conformpass:text})
        if(this.state.password===this.state.conformpass){
            this.setState({conformpass:text});
        }
        else{
            alert("Confirm password does not match");
        }
    }     
    

            
       
    render() {
        return (
           <Container>
               <Content>
                
            <View style={{backgroundColor:"#7D31AC"}}>
          <Image   style={{alignSelf:'center',marginBottom:60,height:nh(180),width:nw(190) ,resizeMode:'contain',backgroundColor:"#7D31AC"}}source={images.logo}/>
          </View>
          <View style={{flex:1,justifyContent:'center',backgroundColor:'white',marginVertical:30}}>
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}}label='Name' value={this.state.name} onChangeText={(text)=>this.setState({name:text})}  />
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Email' value={this.state.email} onChangeText={(text)=>this.setState({email:text})} />
             <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Phone Number' value={this.state.phonenumber} onChangeText={(text)=>this.setState({phonenumber:text})} />
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}}  label='Password' textContentType='password' secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password:text})}  />
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}}  label='Confirm Password' textContentType='password' secureTextEntry={true} value={this.state.conformpass} onChangeText={(text)=>this.validate(text)}  />
             <TouchableOpacity onPress={()=>{
                // this.login(this.state.email,this.state.password);
                this.SignUp(this.state.email,this.state.password)

                }}>
                <View style={{backgroundColor:'#7D31AC',height:40,justifyContent:'center',marginHorizontal:50,marginBottom:10}}>
                      <Text style={{color:'white',alignSelf:'center'}}>Sign Up</Text>
                </View>
                </TouchableOpacity>
      </View>
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
export default SignUp;
