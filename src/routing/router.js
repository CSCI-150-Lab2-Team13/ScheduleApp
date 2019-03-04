import React, { Component } from 'react';

import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from './AuthLoading';
import HomeScreen from '../mainScreens/HomeScreen';
import LoginScreen from '../mainScreens/SignUpScreen';



//import the different screens for different scenario's for tabNav
import Feed from '../bottomScreens/Feed'
import Messages from '../bottomScreens/Messages'
import Profile from '../bottomScreens/Profile'

//import different screens for swipeleftscreens

import Settings from '../swipeLeftScreens/SettingsScreen'



const DashboardTabNavigator = createBottomTabNavigator({
    Feed,
    Profile,
    Messages,
  }, 
  {
    navigationOptions:({navigation})=>{
      const {routeName} = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: routeName
      };
    }
  });
  
  const DashboardStackNavigator = createStackNavigator ({
    DashboardTabNavigator : DashboardTabNavigator
  
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return {
          //headerLeft: <Icon name="md-menu" size={30} />
        };
      }
  
    }
  );
  
  const AppDrawerNavigator = createDrawerNavigator( {
  
    Home: {
      screen:DashboardStackNavigator
    },
  
    Settings: {
      screen: Settings
    },
  
  });
  
  
  
  const AppStack  = createStackNavigator ({
    Home: {
      screen: AppDrawerNavigator,
    },

    //commented out for testing purpose 
    //HardEvent: {
    //  screen:HardEventFormScreen,
   // },
  
  });
  
  

  
  
const AuthStack = createStackNavigator ({
    SignUp: {
        screen:LoginScreen,
      },
   
  });


export default createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );
