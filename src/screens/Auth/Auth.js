import React, { Component} from "react";
import { View, Text, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from "../MainTabs/StartMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/Button/ButtonWithBackground";
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
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

  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
        <View style={styles.container}>
        {this.state.viewMode === 'portrait' && 
          <MainText>
            <HeadingText>Please Log in</HeadingText>
          </MainText>
        
        }
          <ButtonWithBackground color='#29aaf4' >Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>

            <DefaultInput placeholder="Your email address" style={styles.input} />
            <View 
              style={
                this.state.viewMode === 'portrait' 
                ? styles.portraitPasswordContainer 
                : styles.landscapePasswordContainer
              }
            >
              <View 
                style={
                  this.state.viewMode === 'portrait' 
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input}/>
              </View>
              <View
                style={
                  this.state.viewMode === 'portrait' 
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Confirm Password" style={styles.input}/>
              </View>
            </View>
          </View>
          <ButtonWithBackground color='#29aaf4' onPress={this.loginHandler} >Submit</ButtonWithBackground>
        </View>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }

})

export default AuthScreen;