import React from 'react';
import { Text, View , StyleSheet}from 'react-native';
import db from '../config'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';

export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state={
      allTransactions:[],
      lastTransactions:null,
      search:''
    }
  }
componentDidMount=async()=>{
 
  var query= await db.collection("transaction").limit(10).get();
  query.docs.map((doc)=>{
    this.setState({
      allTransactions:[...this.state.allTransactions,doc.data()],
      lastTransactions:doc 
    })

  })
}

fetchMoreTransactions = async ()=>{
  var text = this.state.search.toUpperCase()
  var enteredText = text.split("")

  
  if (enteredText[0].toUpperCase() ==='B'){
  const query = await db.collection("transaction").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
  query.docs.map((doc)=>{
    this.setState({
      allTransactions: [...this.state.allTransactions, doc.data()],
      lastVisibleTransaction: doc
    })
  })
}
  else if(enteredText[0].toUpperCase() === 'S'){
    const query = await db.collection("transaction").where('studentId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }
}
    render() {
      return (
          <View style={styles.container}>
        <View style={styles.searchBar}>

          <TextInput
          style={styles.bar}
          placeholder='Enter Book ID or Student ID'
          onChangeText={(text)=>{
            this.setState({
              search:text
            })
            

          }}
          value={this.state.search}
          />
          
          <TouchableOpacity
          style={styles.searchButton}
          onPress={()=>{this.searchTransaction(this.state.search)}}
          >
            <Text>Search</Text>

          </TouchableOpacity>
        </View>
        <FlatList
        data={this.state.allTransactions}
        renderItems={({items})=>{
            <View style={{borderWidth:2, marginTop:50}}>
                <Text>{"Student ID: " + items.studentID}</Text>
                <Text>{"Book ID: " + items.bookID}</Text>
                <Text>{"Date: " + items.date}</Text>
                <Text>{"Transaction type: " + items.transactionType}</Text>
                </View>
        }}

        keyExtractor={(items, index)=>index.toString}
        onEndReached={this.fetchMoreTransactions()}
        onEndReachedThreshold={0.7}
        />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })
