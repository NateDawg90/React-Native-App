import React, { Component } from "react";
import {connect} from 'react-redux';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }
  
  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false

      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  }
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }
  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }
  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(
              val, 
              prevState.controls.placeName.validationRules, 
            ),
            touched: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    this.props.addPlace(this.state.controls.placeName.value, this.state.controls.location.value, this.state.controls.image.value);
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
      <KeyboardAvoidingView  style={styles.container} behavior="position" keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollView} >
          <MainText >
            <HeadingText>Share a Place with us</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler}/>
          <PickLocation onLocationPick={this.locationPickedHandler}/>
          <PlaceInput placeData={this.state.controls.placeName} onChangeText={this.placeNameChangedHandler}/>
          <KeyboardAvoidingView style={styles.button}>
          {!this.props.isLoading ?
              <Button 
                title='Share a Place!' 
                onPress={this.placeAddedHandler} 
                disabled={
                  !this.state.controls.placeName.valid 
                  || !this.state.controls.location.valid 
                  || !this.state.controls.image.valid
                }
              />
            : <ActivityIndicator/>
          }
          </KeyboardAvoidingView>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    width: '100%',
        alignItems: 'center',

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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);