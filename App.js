/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlacesList from './src/components/PlacesList/PlacesList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import {addPlace, selectPlace, deselectPlace, deletePlace} from './src/store/actions/index';

type Props = {};
class App extends Component<Props> {

  placeDeletedHandler = () => {
    this.props.deletePlace();
  }

  placeAddedHandler = placeName => {
    this.props.addPlace(placeName);
  }

  placeSelectedHandler = key => {
    this.props.selectPlace(key);
  }

  modalClosedHandler = () => {
    this.props.deselectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler} />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlacesList places={this.props.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
};

const mapDispatchToProps = dispatch => ({
  addPlace: name => dispatch(addPlace(name)),
  selectPlace: key => dispatch(selectPlace(key)),
  deselectPlace: () => dispatch(deselectPlace()),
  deletePlace: () => dispatch(deletePlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);