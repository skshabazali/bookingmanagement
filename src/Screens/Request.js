//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,SafeAreaView, TouchableOpacity } from 'react-native';
import {Icon,Button} from 'react-native-elements';
import { normalizeWidth as nw } from "../Common/NormalizeWidth";
import { normalizeHeight as nh } from "../Common/NormalizeHeight";
import { TextInput } from 'react-native-paper';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import RequestComponet from '../Component/RequestComponent';
import { FlatGrid } from 'react-native-super-grid';
import Axios from 'axios';
import auth from '@react-native-firebase/auth';

// create a component
class Request extends Component {
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
        this.state={
          requestsArray:[],
          showResturantForm:false,
          name:'',
          price:''
        }
      }
    callApi(){
      let uid = auth().currentUser.uid
      Axios.get("http://devsmash.pythonanywhere.com/get-customer-requests/?auth_key="+uid).then((Response)=>{
        console.log("ssss",Response.data)
        this.setState({
          requestsArray:Response.data
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
    registerFood(){
      Axios.get('http://devsmash.pythonanywhere.com/add-new-menu-item/?name='+this.state.name+'&price='+this.state.price).then((Response)=>{
        if(Response.data)
        {
          this.setState({
            showResturantForm:false,
            name:'',
            price:''
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
    componentDidMount(){
      this.callApi()
    }
    render() {
        let items=[]

        this.state.requestsArray.map((single)=>{
          for(let key in single)
          {
            single[key].map(singleObj=>{
              items.push(
                {
                  quantity:key,
                  type:singleObj.summary,
                  msg_id:singleObj.message_id
                }
              )
            })
            
          }
        })
       
        return (
            
            
                <ScrollView style={{backgroundColor:"white"}}>
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    showResturantForm:true
                  })
                }}>
                <View style={{flexDirection:"row",backgroundColor:"white",height:hp("7%"),width:wp('95%'),paddingRight:wp("2%"),paddingLeft:wp("2%"),marginLeft:wp("2%"),marginTop:hp("2%"),shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,

                        elevation: 11}}>
                    <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <Text style={{color:'#7D31AC',fontSize:25}}>Restaurant</Text>
                </View>
                <View style={{marginLeft:wp(30),marginTop:hp("1%")}}>
                   <Icon name="keyboard-arrow-right" type="MaterialIcons" color='#7D31AC' size={40}  />
                   </View>
                </View>
                </TouchableOpacity>
                {this.state.showResturantForm && <View style={{flex:1,justifyContent:'center',backgroundColor:'white',marginVertical:30}}>
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}}label='Name' value={this.state.name} onChangeText={(text)=>this.setState({name:text})}  />
          <TextInput theme={{ colors: {
                    placeholder: '#7D31AC', text: 'black', primary: '#7D31AC',
                    underlineColor: 'transparent', background: '#7D31AC'
            } }} style={{marginHorizontal:50,marginBottom:20,backgroundColor:'white',color:'black'}} label='Price' value={this.state.price} onChangeText={(text)=>this.setState({price:text})} />
             
             <TouchableOpacity onPress={()=>{
                // this.login(this.state.email,this.state.password);
                this.registerFood()

                }}>
                <View style={{backgroundColor:'#7D31AC',height:40,justifyContent:'center',marginHorizontal:50,marginBottom:10}}>
                      <Text style={{color:'white',alignSelf:'center'}}>Register</Text>
                </View>
                </TouchableOpacity>
      </View>}
                {!this.state.showResturantForm &&<View style={{flexDirection:"row",backgroundColor:"white",height:hp("7%"),width:wp('95%'),paddingRight:wp("2%"),paddingLeft:wp("2%"),marginLeft:wp("2%"),marginTop:hp("3%"),shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,

                        elevation: 11}}>
    
                    <View style={{marginLeft:nw(30),marginTop:hp("1%")}}>
                <Text style={{color:'#7D31AC',fontSize:25}} >Room Service</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                  this.callApi()
                }}>
                <View style={{marginLeft:nw(60),marginTop:hp("1%")}}>
                   <Icon name="refresh" type="MaterialIcons" color='#7D31AC' size={40}  />
                   </View>
                   </TouchableOpacity>
                </View>}
                
                {!this.state.showResturantForm && <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        // staticDimension={3}
        // fixed
        // spacing={2}
        renderItem={({ item, index }) => (
         <RequestComponet onLongPress={()=>{this.callApi()}} value={item}/>
        )}
      />}
      

{/* <View style={{marginTop:hp("10%"),marginLeft:wp("8%"),flexDirection:"row"}}>
    {this.ItemReturn()}
</View> */}
</ScrollView>
           
       
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
    gridView: {
        marginTop: 20,
        
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
});

//make this component available to the app
export default Request;
