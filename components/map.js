import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import { Marker } from './marker';
import { Pulser } from './pulser';

import SocketIOClient from 'socket.io-client';

export class Mapview extends React.Component {
  constructor () {
    super();
    this.state = {
      region: null,
      fadeAnim: new Animated.Value(1),
      growAnim: new Animated.Value(30),
    }
    this.tapped=false;
  }
  componentDidMount(){
    setInterval( () => {
      this.setState({
        region: null
      });
    },200);
    this.props.socket.on('bounceBack', () => this.setState(this.state));
  }
  componentDidUpdate () {
    if (this.props.pinger) Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue:0,
        duration:1000,
      }),
      Animated.timing(this.state.growAnim, {
        toValue:50,
        duration:1000,
      })
    ]).start();
  }
  renderAll = () => {
    if (this.props.data.length)
      return this.props.data.map( el => {
        return this.renderMarker(el);
      });
  }

  renderPinger = (person) => {
    let { fadeAnim, growAnim } = this.state;
    return (this.props.pinger === person.data.username) ? (
      <View style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Pulser/>
        <Marker info={person.data} style={{position:'absolute'}} />
      </View>
    ) : (
      <View>
        <Marker info={person.data}/>
      </View>
    );
  }

  renderMarker = (person) => {
    return (
      <MapView.Marker key={person.key} coordinate={{latitude:person.data.location.coords.latitude, longitude:person.data.location.coords.longitude}}>
        <TouchableHighlight onPress={this.ifTapped.bind(this, person)}>
          {this.renderPinger(person)}
        </TouchableHighlight>
      </MapView.Marker>
    );
  }

  ifTapped = async (person) => {
    this.tapped = !this.tapped;
    return this.tapped ? this.setState({
      region: {
        latitude: person.data.location.coords.latitude,
        longitude: person.data.location.coords.longitude,
        latitudeDelta: 0.0922/4,
        longitudeDelta: 0.0421/4,
      }
    }) :
    this.setState({
      region: {
        latitude: this.props.info.coords.latitude,
        longitude: this.props.info.coords.longitude,
        latitudeDelta: 0.0922/4,
        longitudeDelta: 0.0421/4,
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.props.info.coords.latitude,
            longitude: this.props.info.coords.longitude,
            latitudeDelta: 0.0922/4,//these DELTAS control the zoom!
            longitudeDelta: 0.0421/4,
          }}
          region={this.state.region}
          loadingEnabled={true}
        >
          {this.renderAll()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '75%',
    backgroundColor: 'rgb(162, 107, 136)',
  },
});
