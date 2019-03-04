import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated} from "react-native";
import PlacesList from '../../components/PlacesList/PlacesList';
import { getPlaces } from '../../store/actions/index';

import {connect} from 'react-redux';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    listAnim: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = e => {
    if (e.type === 'ScreenChangedEvent') {
      if (e.id === 'willAppear') {
        this.props.loadPlaces(); 
      }
    }

    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        })
      }
    }
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.listAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler()
    });
  }

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
    let content = (
      <Animated.View 
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]  
              }),
            }
          ]
      }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.placesLoaded) {
      content = (
        <Animated.View 
          style={{
            opacity: this.state.listAnim  
          }}>
          <PlacesList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      )
    }
    
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);