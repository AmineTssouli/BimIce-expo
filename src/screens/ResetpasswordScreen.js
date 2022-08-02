import { View, Text, SafeAreaView,Keyboard,StatusBar} from 'react-native'
import React,{useContext, useState} from 'react'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../navigation/AuthProvider';
import ThemeContext from '../utils/ThemeContext';

const ResetpasswordScreen = () => {
 
  const theme = useContext(ThemeContext);
  const [email,setEmail] = useState();
  const [error,setError] = useState();
  const {resetpassword} = useContext(AuthContext);
  const [loading,setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
   let valid= true;
   
   if (!email)
   {
    setError("Please provide your email address");
    valid = false;
    return;
   }
   if (!email.match(/\S+@\S+\.\S+/))
   {
    setError("Please provide a valid email address");
    valid = false;
   
  }
   if (valid) {
         
         resetpassword(email);
         setLoading(true);
         console.log('An email was sent to you')
   }
  }
  const Loading = () => {

    return (<View style={{marginTop:-50,padding:30,marginHorizontal:10}}>
      <Text style={{fontSize:30, fontWeight:'bold', color:theme.textcolor,fontFamily:'Inter-Bold',marginVertical:20}}>Congratulations</Text>
       <Text style={{textAlign:'justify',fontSize:10, fontWeight:'bold', color:'gray',fontFamily:'Roboto-Medium'}} >An email was sent to you with further instructions, please check your inbox</Text>
      </View>)
  }


  return (
    <SafeAreaView  style= {{ 
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:theme.backgroundcolor,
      
   
      }}>
    <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
       {loading ? <Loading />:<>
       <View style={{marginTop:-50,padding:30,marginHorizontal:10}}>
        <Text style={{fontSize:30, fontWeight:'bold', color:theme.textcolor,fontFamily:'Inter-Bold',marginVertical:20}}>Reset Password</Text>
         <Text style={{textAlign:'justify',fontSize:10, fontWeight:'bold', color:'gray',fontFamily:'Roboto-Medium'}} >Enter an email associated with your account and we will send you an email with instructions to reset you password</Text>
        </View>
        <View style={{width:'80%',marginTop:80,marginBottom:20}}>
         <CustomInput icon='email' value={email}  placeholder ='Email' keyboardType='email-address' inputType='email-address'
          onChangeText={text => { setEmail(text) }}
           onFocus= {() => { setError()}} error={error} 
           />
         
        </View>
        <CustomButton label='Send' onPress={validate} />
        </> }
 
  
        
    </SafeAreaView>
  )
}

export default ResetpasswordScreen