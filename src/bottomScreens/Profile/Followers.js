import React, { Component } from 'react'
import { Text, View , SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
import { Icon } from 'react-native-elements'


import firebase from 'react-native-firebase'


import Userinfo from './Userinfo'
import styles from './styles'

export default class Followers extends Component {

constructor(props) {
    super(props)
    this.state = {
        user: firebase.auth().currentUser.displayName,
        errorMessage: null,
        loading: false, 
        followerList: []
        }
      }
      

componentDidMount() {
    this.getFollowers()

}

getFollowers () {
    const ref  = firebase.firestore().collection("users").doc(this.state.user).collection('followers')
    var followers = [];
    ref.onSnapshot((querySnapshot)=> {
        querySnapshot.forEach((doc)=>
         {
          followers.push({
                Username :doc.data().Username,
                firstName :doc.data().firstName,
                lastName :doc.data().lastName,
                photoURL:doc.data().photoURL,
                id : doc.id
            })
        })
        this.setState({followerList:followers})
    })
}

render() {
  return (
      <View style={{ flex: 1, backgroundColor: '#63869f' }}>
      <SafeAreaView>
          <View style={styles.header_container}>
              <TouchableOpacity
                  style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}
              >
                  <Icon
                      name='chevron-left'
                      color='white'
                      size={35}
                      style={{ padding: 20, }}
                      underlayColor='transparent'
                  />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', flex: 2, alignItems: 'center' }}>
                  <Text style={styles.title}>Users who follow you </Text>
              </View>
              <View style={{ flex: 1 }} />
          </View>
      </SafeAreaView>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                        {this.state.errorMessage}
                    </Text>
                }
                {this.state.loading &&
                    <ActivityIndicator
                        size={'large'}
                        style={{ flex: 1, justifyContent: 'center' }}
                    />
                }


                {this.state.loading == false && <FlatList
                    data={this.state.followerList}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>  <Userinfo
                        contact={item}
                        setErrorMessage={(error) => this.setErrorMessage(error)}
                    />}
                />}
            </View>
  </View>
  )
}
}