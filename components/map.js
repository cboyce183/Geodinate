import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';

export class Mapview extends React.Component {
  render() {
    console.log(this.props);
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
        >
          <MapView.Marker
            coordinate={{latitude:this.props.info.coords.latitude, longitude:this.props.info.coords.longitude}}
            // image={require("../assets/images/map-marker-icon.png")}
            // anchor={{x:0.5,y:1}}
          />
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
