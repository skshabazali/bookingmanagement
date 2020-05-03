import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,SafeAreaView,Image,ScrollView, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import images from '../Common/images';
import { normalizeHeight as nh } from '../Common/NormalizeHeight';
import { normalizeWidth as nw } from '../Common/NormalizeWidth';
import auth from '@react-native-firebase/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'p@g.com',
        password:'password',
        userId:"",
    };
  }
//   async componentDidMount () {
//     messaging().getToken()
//     .then(async fcmToken => {
//       if (fcmToken) {
//         console.log(fcmToken)
//         const ref = database().ref(`/users/saswath`);
   
//     await ref.set({
//       fcmToken,
//       name: 'Saswath phone',
//       role: 'admin',
//     });
//       } else {
//         // user doesn't have a device token yet
//         console.log('ee')
//       } 
//     });
//   }  
  
 
    login(email,password){
   auth().signInWithEmailAndPassword(email,password)
   .then((response)=>{
    this.setState({userId:auth().currentUser.uid})
    console.log(response);
    this.props.navigation.navigate("BottomNavigation")
   })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } 
      else if(errorCode === 'auth/wrong-email'){
        alert('Wrong Email');
      }
      else {
        alert(errorMessage.toString());
      }
      console.log(error);
    });

  }

//   static navigationOptions =(props)=>({
//       header:null
//   });
  render() {
    return (
        <ScrollView style={{flex:1,backgroundColor:'white'}}>
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <View style={{flex:1,justifyContent:'center',backgroundColor:'white',marginVertical:100}}>
            <View style={{alignContent:'space-between'}} >
                {/* for treetor logo */}
                <Image style={{alignSelf:'center',marginBottom:60,height:nh(100),width:nw(100) ,resizeMode:'contain'}} source={images.logo}/>
                <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#FF4141',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='email' value={this.state.email} onChangeText={(text)=>this.setState({email:text})} />
                <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white'}} label='password'  selectionColor='#7D31AC' value={this.state.password} onChangeText={(text)=>this.setState({password:text})} secureTextEntry={true} />
                <TouchableOpacity onPress={()=>{
                this.login(this.state.email,this.state.password);
                // this.props.navigation.navigate('BottomNavigation')

                }}>
                <View style={{backgroundColor:'#7D31AC',height:40,justifyContent:'center',marginHorizontal:50,marginBottom:10}}>
                      <Text style={{color:'white',alignSelf:'center'}}>LOGIN</Text>
                </View>
                </TouchableOpacity>
                <Text style={{alignSelf:'center'}}>{"New here?" }</Text>
                <TouchableOpacity onPress={()=>{
                  this.props.navigation.navigate('SignUp')
                }}>
                <Text  style={{color:'#7D31AC',alignSelf:'center'}}>Register Here</Text>
                </TouchableOpacity>
                
            </View>
           
            <View>
                {/* Buttons */}
            </View>
            <View>
                {/* forgot pass and shits */}
            </View>
         
        </View>
        </SafeAreaView>
        </ScrollView>
    );
  }
}

export default Login;
