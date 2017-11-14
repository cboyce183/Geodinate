import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export class Pulser extends React.Component {
  constructor () {
    super();
    this.fadeAnim = new Animated.Value(1);
    this.growAnim = new Animated.Value(30);
    this.radAnim = new Animated.Value(15);
  }
  pulseAnimation = () => {
    this.fadeAnim.setValue(1);
    this.growAnim.setValue(30);
    this.radAnim.setValue(15);
    Animated.parallel([
      Animated.timing(this.fadeAnim, {
        toValue:0,
        duration:1000,
      }),
      Animated.timing(this.growAnim, {
        toValue:70,
        duration:1000,
      }),
      Animated.timing(this.radAnim, {
        toValue:35,
        duration:1000,
      })
    ]).start(() => this.pulseAnimation());
  }

  componentDidMount(){
    this.pulseAnimation();
  }

  render() {
    let fadeAnim = this.fadeAnim;
    let growAnim = this.growAnim;
    let radAnim = this.radAnim;
    return (
      <Animated.View style={{
        position: 'absolute',
        opacity: fadeAnim,
        width: growAnim,
        height: growAnim,
        backgroundColor: 'orange',
        borderRadius: radAnim,
      }}/>
    );
  }
}
