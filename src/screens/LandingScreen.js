import { View, Text ,SafeAreaView,TouchableOpacity,ImageBackground,StatusBar} from 'react-native';
import React,{useContext} from 'react';
import ThemeContext from "../utils/ThemeContext";
import {AuthContext} from '../navigation/AuthProvider';
import IceImg from '../assets/images/misc/Ice.svg';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Roboto_700Bold_Italic,
} from '@expo-google-fonts/roboto';

const LandingScreen = ( { navigation } ) => {
  const {guest} = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  let [fontsLoaded] = useFonts({
    Roboto_700Bold_Italic,

  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (

    <SafeAreaView style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: theme.backgroundcolor,
        }}>
          <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
          <View>
          <IceImg width={200} height={200} style={{marginTop:60,transform:[{rotate:'-15deg'}]}} /> 
        </View>
        <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
        }}>
                <TouchableOpacity onPress={ () => navigation.navigate('Signup') } style={{
                backgroundColor:"#61CE70",
                padding: 20,
                width:'80%',
                borderRadius: 88,

                }}>
                <Text style={{fontSize:20,color:'#fff',fontFamily:'Roboto_700Bold_Italic',textAlign:'center'}}>Sign up</Text>
            
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('Login') } style={{
                backgroundColor:"#fff",
                marginTop:20,
                padding: 20,
                width:'80%',
                borderRadius: 88,
                borderWidth:1,
                borderColor: '#61CE70',

                }}>
                <Text style={{fontSize:20,color:'#61CE70',fontFamily:'Roboto_700Bold_Italic',textAlign:'center'}}>Login</Text>
            
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => guest() } style={{
                backgroundColor:"#34e1eb",
                marginTop:20,
                padding: 20,
                width:'80%',
                borderRadius: 88,
                borderWidth:1,
                borderColor: '#61CE70',

                }}>
                <Text style={{fontSize:20,color:'#fff',fontFamily:'Roboto_700Bold_Italic',textAlign:'center'}}>Try as Guest</Text>
            
                </TouchableOpacity>
        </View>

        
      </SafeAreaView>
  )
}

export default LandingScreen;