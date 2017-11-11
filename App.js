import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {Toolbar} from './components/toolbar';
import {Mapview} from './components/map';
import {Group} from './components/group';
import {Ping} from './components/ping';

import { Constants, Location, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import SocketIOClient from 'socket.io-client';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: null,
      fontLoaded : false,
      id: null,
      username: null,
      picture: null,
      loggedin: false,
    };
    this.serverURL = 'http://Charless-Macbook-Pro.local:3000';
    this.socket = null;
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
        `https://graph.facebook.com/${response.id}/picture?type=large&width=250&height=250`
      )
      .then(data => {
        return data;
      })
      .then(data => data.url)
      .catch(e => console.log(e));

      const userInfo = {
        id: response.id,
        username: response.name,
        picture: profilePicFetch,
      }

      // const firstName = userInfo.username.split(' ').slice(0,1);

      this.setState(
        {
          id: userInfo.id,
          picture:userInfo.picture,
          username:userInfo.username,
          location: this.state.location,
          fontLoaded: this.state.fontLoaded,
          loggedin: true,
        }
      );
      this.socket = SocketIOClient(this.serverURL);

    }
    console.log('Login status: ', type);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  emitAsync = async () => {
    if (this.state.username) {
      await this._getLocationAsync()
      await this.socket.emit('pragma',
        {
          id: this.state.id,
          picture:this.state.picture,
          username:this.state.username,
          location: this.state.location,
        }
      )
    }
  }

  async componentDidMount(){
    await Expo.Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    });
    await this._getLocationAsync();
    this.setState({ fontLoaded:true });
    if (!this.state.loggedin) {
      await this.logIn();
      setInterval(this.emitAsync, 500);
    }
    setInterval(this.emitAsync, 500);

    if (this.socket) this.socket.on('receive', data => {
      this.setState({ data });
    });
  }

  renderGroup = () => {
    if (this.state.loggedin) return(
      <ScrollView style={styles.grp}>
        <Group data={this.state.data}/>
      </ScrollView>
    )
    return (
      <View style={styles.grpPlaceholder}>
        <Text> You are not logged in. To see and join groups, please reload the app to log in! </Text>
        <Ionicons name="ios-log-in" size={40} color="black"/>
      </View>
    )
  }

  renderPing = () => {
    if (this.state.loggedin) return <Ping/>
  }

  render() {
    if (this.state.fontLoaded && this.state.location && this.state.loggedin && this.state.data) {
      return (
        <View style={styles.container} resizeMode="contain">
          <Toolbar username={this.state.username} profilepic={this.state.picture} loggedin={this.state.loggedin}/>
          <View style={styles.body}>
            <View style={{height:65, width:'100%'}}/>
            <Mapview
              info={this.state.location}
              style={styles.mapview}
              data={this.state.data}
            />
            {this.renderPing()}
            {this.renderGroup()}
          </View>
        </View>
      );
    }
    else return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  grpPlaceholder: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding:2,
    width: '100%',
    height: '25%',
    zIndex:10,
    bottom:0,
    backgroundColor: 'white',
    borderTopWidth: 2,
  },
  grp: {
    position: 'absolute',
    padding:2,
    width: '100%',
    height: '25%',
    zIndex:10,
    bottom:0,
    backgroundColor: 'white',
  },
  container: {
    maxHeight: '100%',
    flex:1,
  },
  body: {
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    zIndex: 1,
  },
  mapview: {
    zIndex:1,
    position: 'absolute',
  }
});
