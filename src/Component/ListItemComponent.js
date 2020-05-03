//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import {Container , Content ,List } from "native-base";
import ListItems from "../Component/ListItems";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import auth from '@react-native-firebase/auth';

// create a component
class ListItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      kpis:{}
    };
  }
  callApi(){
    let uid = auth().currentUser.uid

    Axios.get("http://devsmash.pythonanywhere.com/hotel-kpis/?auth_key="+uid).then((Response)=>{
        this.setState({
          kpis:Response.data
        })
    }).catch((error)=>{
      console.log(error)
    })
  }
  componentDidMount(){
    this.callApi()
  }

  render() {
    let items=[]
    for(let key in this.state.kpis)
    {
      items.push(
        {
          quantity:this.state.kpis[key],
          type:key
        }
      )
    }
    console.log(items)
  //   var items =[
  //     { quantity:48,type:"Laundry"},
  //     { quantity:28,type:"Room Serice"},
  //     { quantity:148,type:"Food Order"},
  //     { quantity:248,type:"Surprise Event"},
  //     { quantity:248,type:"Surprise Event"},
  //     { quantity:248,type:"Surprise Event"},
  //     { quantity:248,type:"Surprise Event"},
  // ]

    return (
    
      <View style={{height:hp("23")}}>

         
        <List 
        dataArray={items}
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        renderRow ={(item)=>(
          <View style={{marginLeft:wp("1%")}} >
       <ListItems  item={item}/>
       
            {/* <FooterItems item={item} /> */}
            </View>
        )}
        />
        </View>
       
    );
  }
}

// define your styles:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
//   avatar: {
//     borderRadius: 75,
//     borderWidth: 1,
//     borderColor: '#000',
//     width: 45,
//     height: 45,
//     marginLeft: hp('2.5%'),
//     marginBottom: hp('2%'),
//     backgroundColor: '#ffffff',
//   },
});

//make this component available to the app
export default ListItemComponent;
