import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';

import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  logOutHandler = () => {
    alert('logout')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logOutHandler}>
          <View style={styles.drawerItem}>
            <View style={styles.drawerIcon}>
              <Icon size={30} name={Platform.OS === 'android' ? 'md-log-out' : "ios-log-out"} color="red"/>
            </View>
            <MainText>Log Out</MainText>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  drawerItem: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  drawerIcon: {
    marginRight: 10
  },
})
export default SideDrawer;