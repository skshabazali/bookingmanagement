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
            loginuid:"",
        };
        this.state.loginuid=this.props.navigation.state.params.userId;
        console.log("uid",this.state.loginuid);
      }
    //   callapi(){
    //     console.log('jii')
    //     let url='http://devsmash.pythonanywhere.com/create-hotel/' //username,password,institute_name,institute_phone,institute_address
    //     axios.get(url,{
    //       params:{
    //       name:this.state.name,
    //       email:this.state.email,
    //       password:this.state.password,
          
          
    //       }
          
    //     }).then((response)=>{
    //       if(response.data.status)
    //       {
    //         this.props.navigation.navigate('BottomNavigation',{auth_key:response.data.auth_key})
            
    //       }
    //       else
    //       {
    //         alert('already exists')
    //       }
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
        
    //   }
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
                
    

            
       
    render() {
        return (
           <Container>
               <Content>
                
            <View   >
          <Image  style={{alignSelf:'center',marginBottom:60,height:nh(100),width:nw(100) ,resizeMode:'contain'}}source={images.logo}/>
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#FF4141',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}}label='Name' value={this.state.name} onChangeText={(text)=>this.setState({name:text})}  />
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#FF4141',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Email' value={this.state.email} onChangeText={(text)=>this.setState({email:text})} />
             <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#FF4141',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Phone Number' value={this.state.phonenumber} onChangeText={(text)=>this.setState({phonenumber:text})} />
          <TextInput style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Password' textContentType='password' secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password:text})}  />
          <TextInput style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Confirm Password' textContentType='password' secureTextEntry={true} value={this.state.conformpass} onChangeText={(text)=>this.setState({conformpass:text})}  />
          {/* <View style={{flexDirection:'row',alignSelf:'center',justifyContent: 'space-between',}}>
              <TouchableOpacity>
              <View style={{borderColor:'black',borderWidth:1,borderRadius:5,width:129,height:33,justifyContent: 'center',alignContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:14}}>Male</Text>
            </View>
              </TouchableOpacity>
           <TouchableOpacity>
           <View style={{borderColor:'black',borderWidth:1,borderRadius:5,width:129,height:33,justifyContent: 'center',alignContent:'center',alignItems:'center'}}>
                
                <Text>Female</Text>
            </View>
           </TouchableOpacity>
            
          </View> */}
          {/* <TextInput style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='PhoneNumber' textContentType={"telephoneNumber"}  /> */}
          <TouchableOpacity onPress={()=>{
                this.SignUp(this.state.email,this.state.password)
              }}>
              <View style={{backgroundColor:'#6EF31A',height:40,justifyContent:'center',marginHorizontal:50}}>
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
