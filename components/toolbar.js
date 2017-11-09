import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from './dropdown';
export class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      dropdownPressed: false
    }
  }

  display_dropdown = () => {
    console.log('dropdown pressed!!!');
    this.setState({dropdownPressed: !this.state.dropdownPressed});
  }

  render() {
    if (this.state.dropdownPressed) return (
      <View style={styles.div}>
        <View style={styles.containerSuper}>
          <View style={styles.container}>
            <Ionicons name="ios-contacts-outline" size={40} color="black" />
            <Text style={styles.title}>Geo-dinate</Text>
            <TouchableHighlight onPress={this.display_dropdown}>
              <Ionicons name="ios-arrow-dropdown" size={40} color="black" />
            </TouchableHighlight>
          </View>
        </View>
        <Dropdown/>
      </View>
    )
    if (!this.state.dropdownPressed) return (
      <View style={styles.div}>
        <View style={styles.containerSuper}>
          <View style={styles.container}>
            <Ionicons name="ios-contacts-outline" size={40} color="black" />
            <Text style={styles.title}>Geo-dinate</Text>
            <TouchableHighlight onPress={this.display_dropdown}>
              <Ionicons name="ios-arrow-dropdown" size={40} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: 'Pacifico'
  },
  containerSuper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 65,
    backgroundColor: 'rgba(40, 147, 116, 0.75)',
    borderBottomWidth: 1.5,
  },
  container: {
    paddingLeft:10,
    paddingRight:10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  div: {
    zIndex:1000,
    position: 'absolute',
    width: '100%'
  }
});
