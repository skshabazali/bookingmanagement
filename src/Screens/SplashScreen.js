//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../Common/images';
const {width, height} = Dimensions.get('window');
// create a component
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.5);
    this.animatedValue2 = new Animated.Value(0);
    this.state = {
      isAcknowledged1: false,
      isAcknowledged2: false,
      isAcknowledged3: false,
      initialLaunch: false,
      notConnected: false,
    };
  }
  componentDidMount() {
    this.launchAnimation();
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 4 * 1000);
  }
  launchAnimation() {
    // setTimeout(() => {
    //   this.props.navigation.dispatch(resetAction);
    // }, 4 * 100);

    // Animated.spring(this.animatedValue, {
    //   toValue: 1,
    //   friction: 4,
    //   delay: 2500,
    // }).start();

    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 3000,
    }).start();
    // setTimeout(() => {
    //   firebase.auth().onAuthStateChanged(user => {
    //     this.props.navigation.navigate(user ? 'Home' : 'Login');
    //   })
    // }, 4 * 1000)
  }
  render() {
    const truckStyle = {
      transform: [{scale: this.animatedValue}],
    };

    const scaleText = {
      transform: [{scale: this.animatedValue2}],
    };
    return (
      <View style={styles.container}>
        <Animated.View>
          <Animated.Image
            source={images.logo}
            style={[
              {
                resizeMode: 'contain',
                width:wp("45%"),
                height:hp("35%"),
                marginLeft:wp("20%"),
                //backgroundColor: "#fff"
              },
            ]}
          />
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#FFF',
              marginTop:hp("4%")
            }}>
            Book-in-jini Management
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 20,
              width: width / 2,
              height: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
            },
            scaleText,
          ]}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#7D31AC",
  },
  ring: {
    //backgroundColor: "#40C4FF",
    backgroundColor: "#7D31AC",
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#7D31AC",
    // padding: 10,
    marginLeft:wp("2%"),
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
});

//make this component available to the app
export default SplashScreen;
