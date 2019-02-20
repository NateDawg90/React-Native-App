import React, {Component} from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

const { width, height } = Dimensions.get("window");

import Icon from 'react-native-vector-icons/Ionicons';

class PlaceDetail extends Component {
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

  placeDeletedHandler = place => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    console.log(StyleSheet.absoluteFillObject)
    return (
      <View style={[
        styles.container, this.state.viewMode === 'portrait' 
          ? styles.portraitContainer 
          : styles.landscapeContainer
        ]}>
        <View styles={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
          </View>
          <View style={{flex: 1}}>
            <MapView 
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: 
                  Dimensions.get('window').width / 
                  Dimensions.get('window').height 
                  * 0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : "ios-trash"} color="red"/>
              </View>
            </TouchableOpacity> 
          </View>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    flex: 1
    // width: '100%',
    // height: 200 
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  map: {
    flex: 1
  },
  subContainer: {
    flex: 1
  },
});

mapDispatchToProps = dispatch => {
  return {
    deletePlace: key => dispatch(deletePlace(key))
  }
}
export default connect(null, mapDispatchToProps)(PlaceDetail);