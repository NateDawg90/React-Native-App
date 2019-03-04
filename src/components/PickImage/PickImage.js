import React, { Component } from 'react'
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceHolder from '../../assets/munich.jpg'
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    })
  }
  
  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an image: ", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log('user cancelled');
      } else if (res.error){
        console.log('Error: ', res.error)
      } else {
        var pickedImage = {uri: res.uri, base64: res.data};
        this.setState({ pickedImage });
        this.props.onImagePicked(pickedImage)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title='Pick Image' onPress={this.pickImageHandler} />
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
export default PickImage;