import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const serverURL = 'ws://Charless-Macbook-Pro.local:3000/websocket';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      picture: null,
      username: null,
    }
    
  }

  async logOut() {
    console.log('logged out');
  }

  render() {
    return (
      <TouchableHighlight onPress={this.logOut.bind(this)} style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Logged out </Text>
          <Ionicons name="logo-facebook" size={40} color="white" />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgb(85, 149, 185)',
    width: 'auto',
    borderWidth:2,
    borderColor: 'rgb(85, 149, 185)',
    borderRadius:50,
    top: '150%',
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
  }
});
