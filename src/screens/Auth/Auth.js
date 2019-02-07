import React, { Component} from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

import startMainTabs from "../MainTabs/StartMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please Log in</Text>
        <Button  title="Switch to Login" />
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Your email address" />
          <DefaultInput placeholder="Password"/>
          <DefaultInput placeholder="Confirm Password"/>
        </View>
        <Button  title="Login" onPress={this.loginHandler}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
})

export default AuthScreen;