import { View, Text ,SafeAreaView,TouchableOpacity, ImageBackground, ScrollView, Keyboard,StatusBar} from 'react-native'
import React, { useContext, useState } from 'react'
import CustomButton from '../components/CustomButton';
import CustomRadiobutton from '../components/CustomRadiobutton';
import CustomInput from '../components/CustomInput';
import  Checkbox  from "expo-checkbox";
import Google from '../assets/images/misc/google.svg';
import Facebook from '../assets/images/misc/facebook.svg';
import Apple from '../assets/images/misc/apple.svg';
import IceImg from '../assets/images/misc/Ice.svg';
import {AuthContext} from '../navigation/AuthProvider';
import ThemeContext from "../utils/ThemeContext";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_900Black_Italic,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';





const SignupScreen = ({ navigation }) => {
 
  const theme = useContext(ThemeContext);

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [fullname,setFullname] = useState();
  const {register,err} = useContext(AuthContext);
  const [inputs,setInputs] = useState({
  email :'',
  password:'',
  confirmPassword :'',
  fullname:''
  });
  const [checked, setChecked] = useState('Student');
  const [errors,setErrors] = useState({});

  const validate = () => {
   Keyboard.dismiss();
   let valid= true;
   if (! inputs.email)
   {
    handleError("Please provide your email address","email");
    valid = false;
    return;
   }
   if (! inputs.email.match(/\S+@\S+\.\S+/))
   {
    handleError("Please provide a valid email address","email");
    valid = false;
   
  }
   if (! inputs.password)
   {
    handleError("Please provide your password","password");
    valid = false;
    return;

   }
   if(! inputs.password.match(inputs.confirmPassword))
   {
    handleError("Passwords don't match","password");
    valid = false;
   }
   if (! inputs.fullname)
   {
    handleError("Please provide your full name","fullname");
    valid = false;

   }
   if (valid) {
  
    register(email,password,checked,fullname);
   
      if (err.length != 0)
      {
        
        
        console.log(err.message,err.input);
        handleError(err.message,err.input);
      }
      

   }
  };
  const handleOnChange = (text,input) => {
    setInputs(prevState =>({...prevState,[input]:text}));
    if (input == 'email') {
      setEmail(text);
    }
    if (input == 'password') {
      setPassword(text);
    }
    if (input == 'confirmPassword') {
      setConfirmPassword(text);
    }
    if (input == 'fullname') {
      setFullname(text);
    }

  };

  const handleError = (message,input) => {
    setErrors(prevState =>({...prevState,[input]:message}));
  
  }

  let [fontsLoaded] = useFonts({
    Roboto_900Black_Italic,
    Roboto_400Regular

  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style = {{ flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: theme.backgroundcolor
      
   
      }} >
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
                <View>
                <IceImg width={180} height={180} style={{marginTop:40,transform:[{rotate:'-15deg'}]}} /> 
                 
                </View>
      <Text style={{marginTop:40,marginBottom:50,fontSize:34, fontWeight:'bold', color:theme.textcolor,fontFamily:'Roboto_900Black_Italic' }}>Register Now</Text>
      <View style= {{flexDirection:'row',marginTop:20,marginBottom:20}}>
              <TouchableOpacity
                  onPress={()=>{ }}
                  style= {{
                    borderColor: theme.borderColor,
                    borderWidth:2,
                    borderRadius:10,
                    paddingHorizontal:30,
                    paddingVertical:10,
                
                  }}
                  >
              <Google height={24} width={24} />
              </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{}}
                style= {{
                  borderColor: theme.borderColor,
                  borderWidth:2,
                  borderRadius:10,
                  paddingHorizontal:30,
                  paddingVertical:10,
                  marginLeft:30
                }}
                >
          <Facebook height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{}}
                style= {{
                  borderColor: theme.borderColor,
                  borderWidth:2,
                  borderRadius:10,
                  paddingHorizontal:30,
                  paddingVertical:10,
                  marginLeft:30
                }}
                >
          <Apple height={24} width={24} color={theme.applecolor} />
            </TouchableOpacity>
        </View>
        <Text style={{marginBottom:20,color:theme.textcolor}}>or, register with email</Text>
      <View style={{fontFamily:'Roboto_400Regular'}}>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}>  
         <CustomRadiobutton uncheckedColor={theme.textcolor} value='Student' status={ checked === 'Student' ? 'checked' : 'unchecked' }  onPress={() => setChecked('Student')} />
         <CustomRadiobutton  uncheckedColor={theme.textcolor}  value='Teacher' status={ checked === 'Teacher' ? 'checked' : 'unchecked' }  onPress={() => setChecked('Teacher')} />
         </View>
         <CustomInput icon='email' value={email} placeholder ='Email' inputType='email-address'  onChangeText={text => { handleOnChange(text,'email')}} onFocus= {() => { handleError(null,'email')}}  error={errors.email}  />
         <CustomInput icon='lock' value={password} placeholder ='Password'  secure={true} onChangeText={text => { handleOnChange(text,'password')}} onFocus= {() => { handleError(null,'password')}}  error={errors.password}  />
         <CustomInput icon='lock' value={confirmPassword} placeholder ='Confirm password'  secure={true} onChangeText={text => { handleOnChange(text,'confirmPassword')}} onFocus= {() => { handleError(null,'confirmPassword')}}  error={errors.confirmPassword}  />
         <CustomInput icon='user' value={fullname} placeholder ='Full name'  onChangeText={text => { handleOnChange(text,'fullname')}} onFocus= {() => { handleError(null,'fullname')}}  error={errors.fullname} />
         

           <View style={{flexDirection:'row',marginBottom:10}}>
                <Checkbox
                
                color='#61CE70'
                value={true}
      
                style={{marginLeft:5,marginRight:10}}
                />
                <Text style={{color:'gray',fontSize:12,textAlign:'justify'}}>By clicking Sign up, you agree to our terms and conditions</Text>
          </View>

       
        </View>
        <CustomButton label='Sign up' onPress={ validate } />
        
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:40}}>
        <Text style={{color:theme.textcolor}}>Already registered? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login')}}>
          <Text style={{color:'#61CE70',fontWeight:'700'}}>Login</Text>
        </TouchableOpacity>
        </View>
        
        </View>
        </ScrollView>
        
    </SafeAreaView>
  )
}

export default SignupScreen;