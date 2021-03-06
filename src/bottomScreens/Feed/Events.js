import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title , Card, CardItem, Thumbnail} from 'native-base';
import firebase from 'react-native-firebase'



import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'


import {addEventFromFeed, sendNotification} from '../../firebase/firestoreAPI'
import styles from './styles'




export default class Events extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            onlyOneLike: false,
            likes: null,
            userName: firebase.auth().currentUser.displayName,
            errorMessage: null, 
            onlyOneAdd: false, 
            }
          }


addEvent =  () => {


  if (this.state.onlyOneAdd){

  }
  else {

  const title = this.props.contact.title
  const location = this.props.contact.location
  const id = this.props.contact.id
  const startTime = this.props.contact.startTime
  const endTime = this.props.contact.endTime
  const desc = this.props.contact.desc
  const pal = this.props.contact.username
  const photoURL = this.props.contact.photoURL
  const eventType = 2
  addEventFromFeed(this.state.userName, title,location, id, startTime, endTime,desc)
  .then(
    this.setState({onlyOneAdd:true})
  )
  .catch((error)=> this.setState({errorMessage:error}))
  .finally(
    sendNotification(this.state.userName, pal, photoURL, eventType)
  )

}  
        
}
        


    
  render() {

    return (
        <View  >
        <Card style={styles.EventsCard}>
          <CardItem >
          <Left>
              <Thumbnail source={{uri:this.props.contact.photoURL}} />
          </Left>
            <Text style={{fontWeight: 'bold'}}>{this.props.contact.username}</Text>
          </CardItem>
          <CardItem >
            <Text>Event By: </Text><Text style={{fontStyle: 'italic'}}>{this.props.contact.username}</Text>
          </CardItem>
          <CardItem>
          <Text>{this.props.contact.desc ? this.props.contact.desc :"No description provided" }</Text> 
          </CardItem>
          <CardItem>

          </CardItem>
          <CardItem>
           {!this.state.onlyOneLike &&
                    <Left>
                    <Button transparent
                    >
                      <Icon active name="thumbs-up" />
                      <Text>{this.props.contact.likes}</Text>
                    </Button>
                  </Left>
          }
          {this.state.onlyOneLike && 
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                  <Text>{this.props.contact.likes}</Text>
              </Button>
          </Left>

          }
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text> 0 comments</Text>
            </Button>
          </Body>
          {!this.state.onlyOneAdd &&
          <Right>
            <TouchableOpacity
           onPress = {() => this.addEvent()}>
              <FontAwesome active name="address-card" 
                size = {30}
              />
            </TouchableOpacity>
          </Right>
          }
          {this.state.onlyOneAdd &&
          <Right>
            <TouchableOpacity>
              <FontAwesome active name="calendar-check-o" 
                size = {30}
              />
            </TouchableOpacity>
          </Right>
          }
          
        </CardItem>
        </Card>
      </View>
    )
  }
}

