import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Modal, {ModalTitle} from 'react-native-modal';
import {Container, Content, Button, Fab, Icon} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { normalizeWidth as nw } from "../Common/NormalizeWidth";
import { normalizeHeight as nh } from "../Common/NormalizeHeight";
import CheckInComponent from './CheckinComponent';

export default class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking:false,
        };
        
      }
      toggleAboutFalse = () => {
        this.setState({checking:false});
      };
      togglechecking = () => {
        this.setState({checking:false});
        this.props.setvalue();
      };
    
  render() {
    return (
        <View>
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
            
          <TouchableOpacity style={{flexDirection:"row",backgroundColor:"white",height:hp("7%"),width:wp('75%'),paddingRight:wp("2%"),paddingLeft:wp("2%"),marginLeft:wp("5%"),marginTop:hp("2%"),shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11}}
onPress={()=>{this.setState({checking:true})}}
>
                    <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <Text style={{color:'#7D31AC',fontSize:25}}>Intiate CheckIn</Text>
                </View>
               
                </TouchableOpacity>
                {/* <TouchableOpacity style={{flexDirection:"row",backgroundColor:"white",height:hp("7%"),width:wp('75%'),paddingRight:wp("2%"),paddingLeft:wp("2%"),marginLeft:wp("5%"),marginTop:hp("3%"),shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11}}>
    
                    <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <Text style={{color:'#7D31AC',fontSize:25}} >Check In</Text>
                </View>
              
                </TouchableOpacity> */}

                <TouchableOpacity style={{flexDirection:"row",backgroundColor:"white",height:hp("7%"),width:wp('75%'),paddingRight:wp("2%"),paddingLeft:wp("2%"),marginLeft:wp("5%"),marginTop:hp("4%"),shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11}}
onPress={()=>{this.props.setvalue()}}
>
    
                    <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <Text style={{color:'#7D31AC',fontSize:25}} >Postponed</Text>
                </View>
               
                </TouchableOpacity>
                </View>
        
      </Modal>
      <CheckInComponent checkingsuccess={(checkingsuccess,roomnumber)=>{this.props.checkingsuccess(checkingsuccess,roomnumber)}} active={this.state.checking} setvalue={this.toggleAboutFalse} oncheckingpress={this.togglechecking}/>
      </View>
    );
  }
}
