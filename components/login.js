import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      picture: null,
      username: null,
    }
  }

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('128276447862500', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {

      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`)
        .then(data => data.json());

      const profilePicFetch = await fetch(
        `https://graph.facebook.com/${response.id}/picture?type=small&width=50&height=50`
      )
      .then(data => {
        console.log('raw data', data);
        return data;
      })
      .then(data => data.url)
      .catch(e => console.log(e));

      const userInfo = {
        id: response.id,
        username: response.name,
        picture: profilePicFetch,
      }

      const firstName = userInfo.username.split(' ').slice(0,1);
      this.setState({picture:userInfo.picture, username:firstName[0]});
    }
    console.log('Login status: ', type);
  }

  render() {
    if (!this.state.username && !this.state.picture) return (
      <TouchableHighlight onPress={this.logIn.bind(this)} style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Login with Facebook   </Text>
          <Ionicons name="logo-facebook" size={40} color="white" />
        </View>
      </TouchableHighlight>
    );
    return (
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={{fontSize:20, color:'white'}}>Welcome {this.state.username}!</Text>
        </View>
      </View>
    )
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
