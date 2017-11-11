import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Login } from './login';
import { ManageGroups } from './managegroups';


export class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      loginPressed: false,
      managegroups: false,
    }
  }

  userInfoCallbackBeta = (data) => {
    return data;
  }

  renderDropdown = () => {
    if (this.state.loginPressed) return <Login getInfo={this.userInfoCallbackBeta}/>;
    else if (this.state.managegroups) return <ManageGroups />
  }

  render () {
    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={this.managegroupsDropdown} style={styles.subcontainer}>
          <View style={styles.box}>
            <Ionicons name="ios-people-outline" size={40} color="black"/>
            <Text style={styles.subtitle}>Manage Groups</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.loginDropdown} style={styles.subcontainer}>
          <View style={styles.box}>
            <Ionicons name="ios-exit-outline" size={40} color="black"/>
            <Text style={styles.subtitle}>Log out</Text>
          </View>
        </TouchableHighlight>

        {this.renderDropdown()}
      </View>
    )
  }

  //////////////////////////STATE HANDLERS
  loginDropdown = () => {
    console.log('login pressed!!!');
    this.setState({loginPressed: !this.state.loginPressed, managegroups: false});
  }
  managegroupsDropdown = () => {
    console.log('login pressed!!!');
    this.setState({managegroups: !this.state.managegroups, loginPressed: false});
  }
}
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
  },
  container: {
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: 'rgb(214, 214, 214)',
    position: 'absolute',
    right: 0,
    top: 65,
  },
  box: {
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1.5,
    borderColor: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  subcontainer: {
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }

});
