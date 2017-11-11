import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import { Marker } from './marker';

export class Mapview extends React.Component {
  // randomColorGen = () => {
  //   numericParam = () => {
  //     return 155 + Math.round(Math.random()*100)
  //   }
  //   return "rgb(" + Math.round(Math.random()*numericParam()) + ","
  //                 + Math.round(Math.random()*numericParam()) + ","
  //                 + Math.round(Math.random()*numericParam()) + ")"
  // }
  renderAll = () => {
    if (this.props.data.length)
      return this.props.data.map( el => {
        return this.renderMarker(el);
      });
  }

  renderMarker = (person) => {
    return (
      <MapView.Marker key={person.key} coordinate={{latitude:person.data.location.coords.latitude, longitude:person.data.location.coords.longitude}}>
        <View>
          <Marker info={person.data}/>
        </View>
      </MapView.Marker>
      );
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
