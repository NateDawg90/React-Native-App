import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 30.26,
      longitude: 97.7,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get('window').width / 
        Dimensions.get('window').height 
        * 0.0122
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView 
          initialRegion={this.state.focusedLocation}
          style={styles.map}/>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={() => alert('pick locations')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  },

})
export default PickLocation;