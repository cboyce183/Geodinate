import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class ManageGroups extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Placeholder Manage Groups Container</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    borderWidth:2,
    top: 150,
  }
});
