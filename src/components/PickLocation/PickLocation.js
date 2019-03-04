import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 30.2672,
        longitude: -97.7431,
        latitudeDelta: 0.0122,
        longitudeDelta: 
          Dimensions.get('window').width / 
          Dimensions.get('window').height 
          * 0.0122
      },
      locationChosen: false
    })

  }

  pickLocationHandler = e => {
    const coords = e.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude

        },
        locationChosen: true
      }
    })
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocationHandler(coordsEvent);
    },
    err => {
      console.log(err);
      alert('Fetching the position failed, please pick one manually!');
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView 
          ref={ref => this.map = ref}
          onPress={this.pickLocationHandler}
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
        >
          {this.state.locationChosen &&
            <MapView.Marker coordinate={this.state.focusedLocation} />
          }   
        </MapView>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={this.getLocationHandler}/>
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
    height: 250,
  },
  button: {
    margin: 8
  },

})
export default PickLocation;