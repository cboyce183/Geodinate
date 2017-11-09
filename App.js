import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {Toolbar} from './components/toolbar';
import {Mapview} from './components/map';
import {Group} from './components/group';
import {Ping} from './components/ping';

import { Constants, Location, Permissions } from 'expo';



export default class App extends React.Component {

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

  constructor(props){
    super(props);
    this.state = {
      location: null,
      fontLoaded : false,
    };
  }

  async componentDidMount(){
    await Expo.Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    });
    await this._getLocationAsync();
    this.setState({ fontLoaded:true });
  }

  render() {
    if (this.state.fontLoaded && this.state.location) {
      return (
        <View style={styles.container} resizeMode="contain">
          <Toolbar/>
          <View style={styles.body}>
            <Mapview info={this.state.location} style={styles.mapview}/>
            <Ping/>
            <ScrollView style={styles.grp}>
              <Group/>
            </ScrollView>
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
  grp: {
    padding:2,
    width: '100%',
    height: '25%',
    zIndex:10,
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
