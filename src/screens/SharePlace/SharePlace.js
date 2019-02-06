import React, { Component } from "react";
import {connect} from 'react-redux';
import { View, Text} from "react-native";
import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';

class SharePlaceScreen extends Component {
  placeAddedHandler = name => {
    this.props.addPlace(name);
  }
  render() {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlace: placeName => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);