// A screen to play around with new views. Place this screen in the App.js navigator to bypass the Auth screen.
'use strict';
  
import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

import imageUrl from '../../assets/munich.jpg';
 
class Test extends Component{
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  }
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }
  
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }


    render() {
      return (
        <View style={[
          styles.container, this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
          ]}
        >
          <View style={styles.placeContainer}>
            <View style={styles.subContainer}>
              <Image source={imageUrl} style={styles.placeImage} />
            </View>
            <View style={styles.subContainer}>
              <MapView 
                initialRegion={{
                  latitude: 30.2672,
                  longitude: -97.7431,
                  latitudeDelta: 0.0122,
                  longitudeDelta: 
                    Dimensions.get('window').width / 
                    Dimensions.get('window').height 
                    * 0.0122
                }}
                style={styles.map}
              >
                {/* <MapView.Marker coordinate={this.props.selectedPlace.location} /> */}
              </MapView>
            </View>
          </View>
          {/* <View style={styles.subContainer}>

            <View style={styles.messageBox}>
              <View>
                <Text style={styles.messageBoxTitleText}>A simple mesage</Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={styles.messageBoxBodyText}>
                    This is just a dummy sample it will help us to see the alignment in action.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        </View>
      );
    }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 22,
    },
    portraitContainer: {
      flexDirection: 'column'
    },
    landscapeContainer: {
      flexDirection: 'row'
    },
    placeContainer: {
      flex: 2,
      width: '100%',
      justifyContent: 'space-around'
    },
    placeImage: {
      flex: 1,
      width: '100%',
    },

    messageBox:{
      backgroundColor:'#ef553a',
      width:300,
      paddingTop:10,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20, 
      borderRadius:10
    },
    button: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      padding: 10,
      margin: 5,
      backgroundColor: 'blue'
    },
    buttonContainer: {
      height: 40
    },
    messageBoxTitleText:{
      fontWeight:'bold',
      color:'#fff',
      textAlign:'center',
      fontSize:20,
      marginBottom:10
    },
    messageBoxBodyText:{
      color:'#fff',
      fontSize:16
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    subContainer: {
      flex: 1
    },

});

export default Test;