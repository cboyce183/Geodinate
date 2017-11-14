import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Grouppulser } from './groupPulser';

export class Group extends React.Component {
  picToggle = (person) => {
    if (person.picture) return <Image style={styles.profPic} source={{uri: person.picture}}/>
    return <Ionicons name="ios-contact-outline" size={40} color="black" />
  }
  pingerToggle = (person) => {
    if (this.props.pinger === person.username) return (
      <Grouppulser/>
    )
  }
  renderGroup = () => {
    return this.props.data.map( (el, i) => {
      return (
        <View style={styles.container} key={el.key}>
          {this.pingerToggle(el.data)}
          {this.picToggle(el.data)}
          <Text style={{fontSize:20, backgroundColor:'rgba(0, 0, 0, 0.0)'}}>{el.data.username}</Text>
          <Ionicons name="ios-checkmark-circle-outline" size={40} color="black" style={{backgroundColor:'rgba(0, 0, 0, 0.0)'}}/>
        </View>
      )
    })
  }

  render() {
    return (
      <ScrollView ref='scrollView' style={styles.grp} onContentSizeChange={(contentWidth, contentHeight)=>{
        this.refs.scrollView.scrollToEnd({animated:true});
      }}>
        {this.renderGroup()}
      </ScrollView>
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
  },
  grp: {
    padding:2,
    width: '100%',
    height: '25%',
    zIndex:10,
    bottom:0,
    backgroundColor: 'white',
  }
});
