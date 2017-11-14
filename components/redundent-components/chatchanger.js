import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';

import SocketIOClient from 'socket.io-client';


export class Chatchanger extends React.Component {
  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={this.props.handler}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Chat  </Text>
          <Ionicons name="ios-chatbubbles-outline" size={40} color="white" />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgb(124, 208, 255)',
    width: '30%',
    borderWidth:2,
    borderColor: 'rgb(124, 208, 255)',
    borderRadius:75,
    top: '65%',
    right: 10,
    padding:5,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
    zIndex:1000
  }
});
