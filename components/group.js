import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class Group extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Ionicons name="ios-contact-outline" size={40} color="black" />
          <Text style={{fontSize:20}}>Charlie</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
        <View style={styles.container}>
          <Ionicons name="ios-contact-outline" size={40} color="black" />
          <Text style={{fontSize:20}}>Mattia</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
        <View style={styles.container}>
          <Ionicons name="ios-contact-outline" size={40} color="black" />
          <Text style={{fontSize:20}}>Roberto</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
        <View style={styles.container}>
          <Ionicons name="ios-contact-outline" size={40} color="black" />
          <Text style={{fontSize:20}}>James</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
        <View style={styles.container}>
          <Ionicons name="ios-contact-outline" size={40} color="black" />
          <Text style={{fontSize:20}}>Jack</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth:2,
    borderColor: '#ddd',
    paddingBottom:5,
    paddingTop:5,
  }
});
