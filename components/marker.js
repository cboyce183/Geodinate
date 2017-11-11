import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

export class Marker extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.profPic} source={{uri: this.props.info.picture}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profPic: {
    width: 30,
    height: 30,
    borderWidth:1,
    borderRadius:15,
    padding:5,
  }
});
