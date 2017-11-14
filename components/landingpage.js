import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class Landingpage extends React.Component {
  constructor () {
    super();
    this.value = new Animated.Value(0)
  }

  componentDidMount () {
    this.spinAnimation()
  }

  spinAnimation = () => {
    this.value.setValue(0)
    Animated.spring(
      this.value,
      {
        toValue: 1,
        friction:2,
        tension:2
      }
    ).start(() => this.spinAnimation())
  }

  render() {
    const spin = this.value.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['-20deg', '0deg', '-20deg']
    })
    return (
        <View style={styles.page}>
          <Text style={styles.title}>
            Geo-dinate
          </Text>
          <Animated.Image source={require("../assets/images/logo.png")} style={{
            width:'50%',
            height:'50%',
            transform: [{rotate: spin}],
          }}/>
          <View style={styles.container}>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: 'Pacifico',
    paddingTop: '10%',
    paddingBottom: '10%',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(40, 147, 116, 0.75)',
  },
  container: {
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    marginBottom: 30
  }
});
