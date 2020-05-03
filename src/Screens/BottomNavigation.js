import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BottomTabNavigator from '../../Navigation/BottomTabNavigation';
class BottomNavigations extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BottomTabNavigator/>
    );
  }
}

export default BottomNavigations;