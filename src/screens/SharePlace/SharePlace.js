import React, { Component } from "react";
import {connect} from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from "react-native";
import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

class SharePlaceScreen extends Component {
  state = {
    placeName: ''
  }
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  placeNameChangedHandler = val => {
    var placeName = val;
    this.setState({ placeName });
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.addPlace(this.state.placeName);
    }
  }

  onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        })
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText >
            <HeadingText>Share a Place with us</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
          <View style={styles.button}>
            <Button title='Share a Place!' onPress={this.placeAddedHandler}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    addPlace: placeName => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);