import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class ManageGroups extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Feature coming soon!!</Text>
        <Ionicons name="logo-whatsapp" size={40} color="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    borderWidth:2,
    top: 150,
  }
});
