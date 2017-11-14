import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from './dropdown';
export class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      dropdownPressed: false,
      loggedin: false,
    }
  }

  userInfoCallbackAlpha = (data) => {
    return data;
  }

  display_dropdown = () => {
    console.log('dropdown pressed!!!');
    this.setState({dropdownPressed: !this.state.dropdownPressed});
  }

  picToggle = () => {
    return this.props.profilepic ? <Image style={styles.profPic} source={{uri: this.props.profilepic}}/>
    : <Image source={require("../assets/images/logo.png")} style={styles.logo}/>;

  }

  dropdownToggle = () => {
    if (!this.state.dropdownPressed) return (
      <View style={styles.div}>
        <View style={styles.containerSuper}>
          <View style={styles.container}>
            {this.picToggle()}
            <Text style={styles.title}>Geo-dinate</Text>
            <TouchableHighlight onPress={this.display_dropdown}>
              <Ionicons name="ios-menu-outline" size={40} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
    return (
      <View style={styles.div}>
        <View style={styles.containerSuper}>
          <View style={styles.container}>
            {this.picToggle()}
            <Text style={styles.title}>Geo-dinate</Text>
            <TouchableHighlight onPress={this.display_dropdown}>
              <Ionicons name="ios-arrow-dropup" size={40} color="black" />
            </TouchableHighlight>
          </View>
        </View>
        <Dropdown getInfo={this.userInfoCallbackAlpha}/>
      </View>
    )
  }
  render() {
    return this.dropdownToggle();
  }
}

const styles = StyleSheet.create({
  profPic: {
    width: 40,
    height: 40,
    borderWidth:1,
    borderRadius:20,
    padding:5
  },
  logo: {
    width: 40,
    height: 60,
    padding:5
  },
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
