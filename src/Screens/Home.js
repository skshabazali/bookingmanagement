//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {Icon,Button} from 'react-native-elements';
import { normalizeWidth as nw } from "../Common/NormalizeWidth";
import { normalizeHeight as nh } from "../Common/NormalizeHeight";
import { Table, Row, Rows,TableWrapper,Cell,Col } from 'react-native-table-component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container,Content } from 'native-base';
import ListItemComponent from '../Component/ListItemComponent';
import Modal, {ModalTitle} from 'react-native-modal';
import ModalComponent from '../Component/ModelComponent';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { IconButton } from 'react-native-paper';
// create a component
class Home extends Component {
    static navigationOptions = {
        title:null,
        headerStyle: {
            backgroundColor: '#7D31AC',
          },
        
        // headerTitleStyle: {
        //   color: "#000",
        //   //fontFamily: Fonts.type.bold,
    
        //   // fontWeight: Fonts.weight.bold,
        //   fontSize: 16,
        //   alignSelf: "center"
        // },
        headerTintColor: "#7D31AC",
        headerBackTitleStyle: {
          color: "#000",
          // fontFamily: Fonts.type.bold,
          // fontWeight: Fonts.weight.bold,
          fontSize: 17
        
        }
      };
      constructor(props) {
        super(props);
        this.state = {
        date :new Date().getDate(),
        month : new Date().getMonth() + 1,
        year : new Date().getFullYear(),
        // modal:false,
        today:"",
        changedate:"",
        userId:"",
        // checking:false,
        active:{
          id:"",
          name:"",
          phone:"",
          modal:false,
          checkingsuccess:false,
          roomnumber:"",
          wait_token:''

        },
        tableHead: ['Sl No', 'Customer Name ', 'Contact', 'Notify'],
        tableData:[]
      
        };
      this.setState({today: this.state.date + '-' + this.state.month + '-' +this.state. year});
      this.setState({changedate: this.state.date + '-' + this.state.month + '-' +this.state. year});
      
        
    //   this.setState({date:date + '-' + month + '-' + year });
      }
      checkingsuccess=(checkingsuccess,roomnumber)=>{
        console.log(checkingsuccess,roomnumber);
        this.setState({active:{checkingsuccess:checkingsuccess},active:{roomnumber:roomnumber}});

        if(checkingsuccess){
          this.callapi();
      }

      }
      onleftchange=()=>{
        this.setState({changedate:this.state.date-1 + '-' + this.state.month + '-' + this.state.year });
      }
      toggleAboutFalse = () => {
        this.setState({active: {modal:false}});
      };
      onrightchange=()=>{
        
        this.setState({changedate:this.state.date-1 + '-' + this.state.month + '-' + this.state.year  });
      }
      // onActionPress(checking) {
      //  console.log(checking);
       
      //   this.setState({active:{checking:checking}});
      //   console.log(this.state.active);
       
      // }
      getValue(index){
        for (let i = 0; i < this.state.tableData.length; i++) {
          if (index==i){
            this.setState({active:{id:this.state.tableData[index][0],name:this.state.tableData[index][1],phone:this.state.tableData[index][2],wait_token:this.state.tableData[index][3],modal:true,checkingsuccess:false}})
          }
        }
      }
callapi() {
        let uid = auth().currentUser.uid

        let url='http://devsmash.pythonanywhere.com/get-waiting-key-at-hotel/?auth_key='+uid
        console.log(url)
        axios.get(url)
  .then((response)=>{
    let b =[]
    console.log(response.data)

    response.data.map((single)=>{
      b.push(
        [single['sl.no'],single.customer_name,single.booking_id__customer__phone,single
        .wait_token]
      )
    })
    this.setState({tableData:b})
// ;    for (let i=0;i<5;i++){
      
//       a.push(response.data[i]);
//     }
    // for (let j=0;j<a.length;j++){
    //   b.push(Object.values(a[j]));

    // }
  console.log("user",b);
  
  
  
  
  }).catch((err)=>{
  console.log(err.toString());
  })

  }
      componentDidMount(){
      this.callapi();
       console.log("component");
       console.log(this.state.active.checkingsuccess);
        
    }
   
    render() {
    console.log("component");
    const state = this.state;
    const element = (data, index) => (
        
      <TouchableOpacity onPress={() =>{this.getValue(index)}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Action</Text>
        </View>
      </TouchableOpacity>
    );
    console.log("hii");
    console.log(this.state.active.checkingsuccess);
    console.log(this.state.active.roomnumber);
    console.log(this.state.userId);
        return (
          <Container>
            <Content>
            
               <View style={{flexDirection:"row", alignSelf:"center",marginTop:nh(10)}}>
                   {/* <View style={{marginRight:10}}>
                   
                   <Icon name="keyboard-arrow-left" type="MaterialIcons" color='#7D31AC' size={40} onPress={this.onleftchange} />
                   </View>
                   {this.state.changedate===this.state.today?
        (<Text style={{color:'#7D31AC',fontSize:25 ,textDecorationLine:"underline"}}>Today</Text>):(<Text style={{color:'#7D31AC',fontSize:25}}>{this.state.changedate}</Text>)
        }
                   <View style={{marginLeft:10}}>
                   <Icon name="keyboard-arrow-right" type="MaterialIcons" color='#7D31AC' size={40} onPress={this.onrightchange} />
                   </View> */}

              <View>
                <ModalComponent active={this.state.active.modal}  setvalue={this.toggleAboutFalse}
                checking={this.state.active} 
                checkingsuccess={(checkingsuccess,roomnumber)=>{this.checkingsuccess(checkingsuccess,roomnumber)}}
                />
              </View>
                   
               </View>
               <View style={{marginTop:hp('5%')}}>
                <ListItemComponent/>
                </View>
               <View>
                 <View style={{marginTop:hp("6%"),flexDirection:'row'}}>
                   <Text style={{color:'#7D31AC',fontSize:25 ,textDecorationLine:"underline"}}>CheckInQueue</Text>
                   <TouchableOpacity onPress={()=>{
                  this.callapi()
                }}>
                <View style={{marginLeft:nw(60),marginTop:hp("1%")}}>
                   <Icon name="refresh" type="MaterialIcons" color='#7D31AC' size={40}  />
                   </View>
                   </TouchableOpacity>
                 </View>
                 
               <View style={styles.tablecontainer}>
        <Table borderStyle={{borderColor: 'black',borderWidth:1}}>
          <Row data={state.tableHead} style={styles.head}  textStyle={styles.rowtext}/>
          
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}  >
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
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
        backgroundColor: '#fafafa',
    },
  tablecontainer: { padding: 1, backgroundColor: '#fff', marginTop:hp("3%") },
  head: { height: 40, backgroundColor: '#7D31AC' },
  rowtext: { margin: 6,color:"#fff" },
  text: { margin: 6,color:"#000" },
  row: { flexDirection: 'row', backgroundColor: '#FFF' },
  btn: { width:wp('21%'), height: hp("3%"), backgroundColor: '#7D31AC',  borderRadius: 75,marginLeft:wp("1%") },
  btnText: { textAlign: 'center', color: '#fff' }
});

//make this component available to the app
export default Home;
