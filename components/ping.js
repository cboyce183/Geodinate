import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';

import SocketIOClient from 'socket.io-client';


export class Ping extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.pinger} style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Ping!</Text>
          <Ionicons name="ios-wifi" size={40} color="white" />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#9C7A97',
    width: '30%',
    borderBottomWidth:2,
    borderColor: '#8A7090',
    top: '67%',
    paddingLeft:5,
    paddingRight:5,
    shadowOffset:{  width: 7,  height: 7,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
    zIndex:1000
  }
});
