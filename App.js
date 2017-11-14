import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Animated, Image, Vibration, Asset, Audio } from 'react-native';

import { Toolbar } from './components/toolbar';
import { Mapview } from './components/map';
import { Ping } from './components/ping';
import { Landingpage } from './components/landingpage';
import { Chat } from './components/chat';

import { Constants, Location, Permissions, Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import SocketIOClient from 'socket.io-client';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      location: null,
      fontLoaded : false,
      id: null,
      username: null,
      picture: null,
      loggedin: false,
      pinged: false,
      bottomButton: false,
    };
    this.serverURL = 'http://Charless-Macbook-Pro.local:3000';
    this.socket = null;
    this.messages = [];
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

  logIn = async () => {
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

      await this._getLocationAsync().catch(e => console.log(e));

      this.setState(
        {
          fadeAnim: new Animated.Value(0),
          location: this.state.location,
          fontLoaded : this.state.fontLoaded,
          id: userInfo.id,
          username: userInfo.username,
          picture: userInfo.picture,
          loggedin: true,
          pinged: false,
          bottomButton: false,
        }
      );
    }
    console.log('Login status: ', type);
  }

  emitAsync = async () => {
    if (this.state.loggedin) await this.socket.emit('pragma',
      {
        id: this.state.id,
        picture:this.state.picture,
        username:this.state.username,
        location: this.state.location,
      }
    );
  }

  async componentDidMount(){
    this.socket = SocketIOClient(this.serverURL);

    await Expo.Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    });
    this.setState({ fontLoaded:true });

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue:1,
        duration: 2000,
      }
    ).start();

    setInterval(this.emitAsync, 500);
    setInterval(this._getLocationAsync, 500);

    this.socket.on('receive', data => {
      this.setState({ data });
    });

    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    this.socket.on('bounceBack', async (data) => {
      this.setState({ pinged:data.pinger});

      const pattern = [1000,1000];
      Vibration.vibrate(pattern);
      Expo.Notifications.presentLocalNotificationAsync({
        title: 'You have been pinged!',
        body: data.pinger + ' wants to meet up at their location!'
      });
      const geoAlert = new Expo.Audio.Sound();
      try {
        await geoAlert.loadAsync(require('./assets/sounds/isnt-it.mp3'));
        await geoAlert.playAsync();
      } catch (e) {
        console.log(e)
      }
      setTimeout( () => {
        return this.setState({ pinged:null });
      },10000);
    })
  }

  pinger = () => {
    if (!this.state.pinged) {
      this.socket.emit('bounce', {pinger:this.state.username, picture:this.state.picture, timeStamp: Date.now(),});
    }
    console.log('Pinged!!!!');
  }

  lowerRender = () => {
    return (
      <View style={styles.bottomFlex}>
        <Chat
          username={this.state.username}
          picture={this.state.picture}
          socket={this.socket}
          users={this.state.data}
        />
      </View>
    );
  }

  render() {
    if (this.state.fontLoaded && this.state.loggedin && this.state.data && this.state.location) {
      return (
        <View style={styles.container} resizeMode="contain">
          <Toolbar username={this.state.username} profilepic={this.state.picture} loggedin={this.state.loggedin}/>
          <View style={styles.body}>
            <View style={{height:65, width:'100%'}}/>
            <Mapview
              info={this.state.location}
              style={styles.mapview}
              data={this.state.data}
              pinger={this.state.pinged}
              socket={this.socket}
            />
            <Ping socket={this.socket} username={this.state.username} pinger={this.pinger}/>
            {this.lowerRender()}
          </View>
        </View>
      )
    }
    if (this.state.fontLoaded && !this.state.loggedin) {
      let { fadeAnim } = this.state;
      return (
        <Animated.View style={{opacity: fadeAnim}}>
          <View>
            <Landingpage />
            <TouchableHighlight style={styles.button} onPress={this.logIn}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Text style={{fontSize:20, color:'white'}}>Login with Facebook  </Text>
                <Ionicons name="logo-facebook" size={40} color="white" />
              </View>
            </TouchableHighlight>
          </View>
        </Animated.View>
      );
    }
    else return <View><Text>Loading</Text></View>
  }

}

const styles = StyleSheet.create({
  bottomFlex: {
    position: 'absolute',
    width: '100%',
    height: '25%',
    zIndex:10,
    bottom:0,
    backgroundColor:'white'
  },
  chatButton: {
    position: 'absolute',
    backgroundColor: 'blue',
    width: '30%',
    borderWidth:2,
    borderColor: 'blue',
    borderRadius:75,
    top: '65%',
    right: 10,
    padding:5,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
    zIndex:1000
  },
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
  },
  button: {
    alignSelf: 'center',
    top: '80%',
    position: 'absolute',
    backgroundColor: 'rgb(85, 149, 185)',
    width: 'auto',
    borderWidth:2,
    borderColor: 'black',
    borderRadius:50,
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    shadowOpacity: 1.0,
    marginBottom: 30
  }
});
