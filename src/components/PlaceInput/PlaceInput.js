import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

type Props = {
  onPlaceAdded: Function
};
class PlaceInput extends Component<Props> {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  }

  placeAddedHandler = (place) => {
    if (this.state.placeName.trim() === '') {
      return;
    }
    this.props.onPlaceAdded(this.state.placeName);
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.placeInput} 
          placeholder="enter an awesome place"
          value={this.state.placeName} 
          onChangeText={this.placeNameChangedHandler} />
        <Button style={styles.placeButton} title="Add" onPress={this.placeAddedHandler} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%'
  },
});

export default PlaceInput; 