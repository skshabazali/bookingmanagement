//import liraries
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity,StyleSheet} from 'react-native';
import Modal, {ModalTitle} from 'react-native-modal';
import {Container, Content, Button, Fab, Icon} from 'native-base';
import { TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { normalizeWidth as nw } from "../Common/NormalizeWidth";
import { normalizeHeight as nh } from "../Common/NormalizeHeight";
import Axios from 'axios';

// create a component
class CheckInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room:'',
        };
      }
    valueData(){
        
        Axios.get("http://devsmash.pythonanywhere.com/finish-checkin/?wait_token="+this.props.wait_token+"&room_no="+this.state.room).then((Response)=>{
        console.log(Response.data)  
        if(Response.data)
          {
            this.props.oncheckingpress();
            this.props.checkingsuccess(true,this.state.room);
            this.setState({room:""});  
          }  
      
      }).catch((error)=>{
        console.log(error)
      })
    }
    render() {
        return (
            <Modal
        isVisible={this.props.active}
        onBackButtonPress={() => {
          this.props.setvalue();
        }}
        coverScreen={true}
        transparent={true}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            widht: wp('15%'),
            height: hp('25%'),
            borderRadius: 15,
          }}>
                <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#FF4141',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Enter Room Number' value={this.state.room} onChangeText={(text)=>this.setState({room:text})} />
                </View>
                <TouchableOpacity onPress={()=>{
                //   this.login(this.state.email,this.state.password);
                // this.props.navigation.navigate('BottomNavigation')
                this.valueData();
                }}>
                <View style={{backgroundColor:'#7D31AC',height:40,justifyContent:'center',marginHorizontal:50,marginBottom:10}}>
                      <Text style={{color:'white',alignSelf:'center'}}>CheckIn</Text>
                </View>
                </TouchableOpacity>
            </View>
        
      </Modal>
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
export default CheckInComponent;
