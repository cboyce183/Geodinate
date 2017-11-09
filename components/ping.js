import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class Ping extends React.Component {
  pinger = () => {
    console.log('Pinged!!!!');
  }
  render() {
    return (
      <TouchableHighlight onPress={this.pinger} style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Ping!</Text>
          <Ionicons name="md-wifi" size={40} color="white" />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgb(255, 138, 0)',
    width: '30%',
    borderWidth:2,
    borderColor: 'rgb(255, 138, 0)',
    borderRadius:75,
    top: '65%',
    padding:5,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
    zIndex:1000
  }
});
