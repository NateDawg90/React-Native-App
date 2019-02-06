import React, { Component } from "react";
import { View, Text} from "react-native";
import PlacesList from '../../components/PlacesList/PlacesList';
import {connect} from 'react-redux';

class FindPlaceScreen extends Component {
  itemSelectedHandler = key => {
    const place = this.props.places.find(place => { return place.key === key });
    this.props.navigator.push({
      screen: 'awesome-places.PlaceDetailScreen',
      title: place.name,
      passProps: {
        selectedPlace: place
      }
    })
  }
  render() {
    return (
      <View>
        <PlacesList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps)(FindPlaceScreen);