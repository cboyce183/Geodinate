import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export class Grouppulser extends React.Component {
  constructor () {
    super();
    this.fadeAnim = new Animated.Value(1);
  }
  pulseAnimation = () => {
    this.fadeAnim.setValue(1);
    Animated.sequence([
      Animated.timing(this.fadeAnim, {
        toValue:0,
        duration:1000,
      }),
      Animated.timing(this.fadeAnim, {
        toValue:1,
        duration:1000,
      })
    ]).start(() => this.pulseAnimation());
  }

  componentDidMount(){
    this.pulseAnimation();
  }

  render() {
    let fadeAnim = this.fadeAnim;
    return (
      <Animated.View style={{
        position: 'absolute',
        opacity: fadeAnim,
        width: '110%',
        height: '130%',
        backgroundColor: 'orange',
        top: -2,
        left: -10,
      }}/>
    );
  }
}
