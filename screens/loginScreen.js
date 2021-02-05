import * as React from 'react';
import {Text, View, Image, KeyboardAvoidingView, TextInput, ToastAndroid, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailID:'',
            password:''
        }
    }

    login=async(mail, pass)=>{
        if(mail && pass){
            try{
                const response=firebase.auth().signInWithEmailAndPassword(mail, pass)
          if(response){
              this.props.navigation.navigate('Transaction')

          }
            } 
            catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                        ToastAndroid.show("Invalid user", ToastAndroid.SHORT);
                        
                        break;
                    case 'auth/invalid-email':
                        ToastAndroid.show("Invalid E-mail or Password", ToastAndroid.SHORT);
                      break;
                
                    default:
                        break;
                }
            } 

        }else{
            ToastAndroid.show("Enter E-mail ID or password", ToastAndroid.SHORT);
        } 
   

    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled> 
            
                <View>
                <Image 
                source={require("../assets/books.png")}
                style={{width:50, height:50}}
                />
                <Text style={{fontWeight:'bold',
                 color:'purple', 
                 fontSize:17, 
                 textAlign:'center'}}>Wily</Text>

                </View>
                <View>
            <TextInput
          style={styles.loginBox}
          placeholder="Enter E-mail ID ..."
          keyboardType="email-address"
          onChangeText={text=>this.setState({emailID:text})}
          value={this.state.emailID}/>

       <TextInput
          style={styles.loginBox}
          placeholder="Enter Password ... "
          secureTextEntry={true}
          onChangeText={text=>this.setState({password:text})}
          value={this.state.password}/>
          </View>
          <View>
          <TouchableOpacity
          style={styles.scanButton}
          onPress={()=>{this.login(this.state.emailID, this.state.password)}}
          >
              <Text style={styles.buttonText}>Log-In</Text>

          </TouchableOpacity>
          </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginBox: { 
        width: 300, 
        height: 40,
        borderWidth: 1.5, 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 
    },
    scanButton:{
        backgroundColor: 'green',
        padding: 10,
        margin: 10
      },
      buttonText:
      { fontSize: 15, 
        textAlign: 'center', 
        marginTop: 10 
    },
}
)