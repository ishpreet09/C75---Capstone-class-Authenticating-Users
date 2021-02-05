import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SearchScreen from './screens/searchScreen';
import TransactionScreen from './screens/transactionScreen';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginScreen from './screens/loginScreen';

export default class App extends React.Component{
  render(){
      return <AppContainer/>
  }
}
const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
  Search: {screen: SearchScreen},
},

{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Transaction"){
        return(
          <Image
          source={require("./assets/book.png")}
          style={{width:30, height:30}}
        />
        )
        
      }
      else if(routeName === "Search"){
        return(
          <Image
          source={require("./assets/searchingbook.png")}
          style={{width:30, height:30}}
        />)
        
      }
    }
  })
}
);

const switchNavigator=createSwitchNavigator({
  loginScreens:{screen:LoginScreen},
  tab:{screen:TabNavigator}
})

const AppContainer=createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
