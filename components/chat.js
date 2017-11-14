import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, TextInput, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Grouppulser } from './groupPulser';
import { Pingmsg } from './pingMsg';

import SocketIOClient from 'socket.io-client';
const localstoragemock = [];

export class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      moveChat:0,
      height:'100%',
    }
    this.textInput = "";
  }
  componentDidMount () {
    this.props.socket.on('receiveMessages', message => {
      console.log('got a message');
      if (localstoragemock.length > 19) localstoragemock.splice(0,1);
      localstoragemock.push(message)
      if (message.length && message[message.length-1].username !== this.props.username) Vibration.vibrate();
      this.setState({ message });
    });

    this.props.socket.on('bounceBack', message => {
      if (localstoragemock.length > 19) localstoragemock.splice(0,1);
      localstoragemock.push(message)
      if (message.length && message[message.length-1].username !== this.props.username) Vibration.vibrate();
      this.setState({ message });
    })
  }

  getCurrentDate = (el) => {
    return new Date(el.timeStamp).toUTCString();
  }
  renderMessages = () => {
    if (localstoragemock) return localstoragemock.map( (el, i) => {
      if (el.pinger) return (
        <View key={i} style={styles.pingContainer}>
          <Pingmsg />
          <Image style={styles.profPic} source={{uri: el.picture}}/>
          <View style={{display:'flex',flexDirection:'column',justifyContent:'space-between', width:'85%'}}>
            <Text style={{paddingLeft:20, backgroundColor:'rgba(0, 0, 0, 0.0)', fontSize:17}}>
              {el.pinger.split(' ')[0]} wants to meet up!
            </Text>
            <Text style={{paddingLeft:20, fontSize:12, backgroundColor:'rgba(0, 0, 0, 0.0)', color:'grey',}}>
              {this.getCurrentDate(el)}
            </Text>
          </View>
        </View>
      );
      if (el.username !== this.props.username) return (
        <View style={styles.container} key={i}>
          <Image style={styles.profPic} source={{uri: el.picture}}/>
          <View style={{display:'flex',flexDirection:'column',justifyContent:'space-between', width:'85%'}}>
            <Text style={{paddingLeft:5, fontSize:12, backgroundColor:'rgba(0, 0, 0, 0.0)', color:'grey'}}>
              {el.username}
            </Text>
            <Text style={{paddingLeft:5, fontSize:17, backgroundColor:'rgba(0, 0, 0, 0.0)', width:'auto'}}>
              {el.message}
            </Text>
            <Text style={{paddingLeft:5, fontSize:12, backgroundColor:'rgba(0, 0, 0, 0.0)', color:'grey'}}>
              {this.getCurrentDate(el)}
            </Text>
          </View>
        </View>
      )
    else return (
      <View style={styles.container} key={i}>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'space-between', width:'85%'}}>
          <Text style={{paddingLeft:20, fontSize:12, backgroundColor:'rgba(0, 0, 0, 0.0)', color:'grey', textAlign:'right'}}>
            {el.username}
          </Text>
          <View style={{ width:'auto', display:'flex', justifyContent:'flex-end', flexDirection:'row'}}>
            <Text style={{paddingLeft:20, fontSize:17, backgroundColor:'rgba(0, 0, 0, 0.0)',}}>
              {el.message}
            </Text>
          </View>
          <Text style={{paddingLeft:20, fontSize:12, backgroundColor:'rgba(0, 0, 0, 0.0)', color:'grey', textAlign:'right'}}>
            {this.getCurrentDate(el)}
          </Text>
        </View>
        <Image style={styles.profPic} source={{uri: el.picture}}/>
      </View>
      )
    })
  }

  focuser = () => {
    this.setState({moveChat:'155%', height:'206%'})
  }

  blurer = () => {
    this.setState({moveChat:0, height:'100%'})
  }

  sendIt = () => {
    if (this.state.message) this.props.socket.emit('sendMessage', {
      username: this.props.username,
      picture: this.props.picture,
      timeStamp: Date.now(),
      message: this.state.message,
    });
    this.setState({ message: null })
    this.textInput.clear()
  }
  initialMembers = () => {
    console.log('asdasdasdasd', this.props.users);
    return this.props.users.map( el => {
      return (
        <Image key={el.key} style={styles.profPic} source={{uri: el.data.picture}}/>
      )
    });
  }
  initialMessage = () => {
    return (
      <View style={styles.intialContainer}>
        <Text style={{color:'grey'}}>Friends currently online: </Text>
        {this.initialMembers()}
      </View>
    )
  }
  render() {
    return (
      <View style={{
        position:'absolute',
        display: 'flex',
        flexDirection: 'column',
        padding:2,
        width: '100%',
        height: this.state.height,
        zIndex:10,
        bottom: this.state.moveChat,
        backgroundColor:'rgba(255, 255, 255, 0.8)'
      }}>
        <ScrollView ref='scrollView' style={styles.scroller} onContentSizeChange={(contentWidth, contentHeight)=>{
          this.refs.scrollView.scrollToEnd({animated:true});
        }}>
          <View style={styles.intialContainer}>
            <Text style={{fontSize:20, fontFamily:'Pacifico', color:'grey'}}>Welcome {this.props.username.split(' ')[0]}!</Text>
          </View>
          {this.initialMessage()}
          {this.renderMessages()}
        </ScrollView>
        <View style={{backgroundColor:'#fff',width:'100%', display:'flex', flexDirection:'row', alignItems:'center',
        justifyContent:'space-between', padding:3}}>
          <TextInput
            style={{width:'80%',height:'100%', backgroundColor:'#fff',
            paddingRight:2, paddingLeft:2}}
            onFocus={this.focuser}
            onBlur={this.blurer}
            onChangeText={(message) => this.setState({ message })}
            ref={(input) => {this.textInput = input}}
          />
          <TouchableHighlight style={{ width:'18%', display:'flex', alignItems:'center', justifyContent:'center',
          borderLeftWidth:2, borderColor:'#ddd'}} onPress={this.sendIt}>
            <Text style={{height:35, padding:5, backgroundColor:'rgba(255, 255, 255, 0.0)',color:'#1AC8ED',
            textAlign:'center',fontSize:20}}>
              send
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroller: {
    height:'75%',
    width:'100%'
  },
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
  intialContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth:2,
    borderColor: '#ddd',
    paddingBottom:5,
    paddingTop:5,
  },
  pingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth:2,
    borderColor: '#ddd',
    paddingBottom:5,
    paddingTop:5,
  },
});
