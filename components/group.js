import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class Group extends React.Component {
  picToggle = (person) => {
    console.log('PERSON : ', person);
    if (person.picture) return <Image style={styles.profPic} source={{uri: person.picture}}/>
    return <Ionicons name="ios-contact-outline" size={40} color="black" />
  }

  renderGroup = () => {
    return this.props.data.map( (el, i) => {
      return (
        <View style={styles.container}>
          {this.picToggle(el.data)}
          <Text style={{fontSize:20}}>{el.data.username}</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" />
        </View>
      )
    })
  }

  render() {
    return (
      <View>
        {this.renderGroup()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profPic: {
    width: 40,
    height: 40,
    borderWidth:1,
    borderRadius:20,
    padding:5
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth:2,
    borderColor: '#ddd',
    paddingBottom:5,
    paddingTop:5,
  }
});
