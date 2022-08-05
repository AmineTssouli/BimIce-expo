import React,{useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IceImg from '../assets/images/misc/Ice.svg';
import ThemeContext from "../utils/ThemeContext";

import {
  useFonts,

  Roboto_700Bold,

  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

const OnboardingScreen = ({ navigation }) => {

  const theme = useContext(ThemeContext);
  let [fontsLoaded] = useFonts({
   
    Roboto_700Bold,

    Roboto_900Black_Italic,
  });

  return (
      <SafeAreaView style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: theme.backgroundcolor,
        }}>
          <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
          <View>
            <Text style={{marginTop:20,fontSize:40, fontWeight:'bold', color:theme.textcolor,fontFamily:'Roboto_700Bold'}}>BIMOLOGY</Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <IceImg width={200} height={200} style={{transform:[{rotate:'-15deg'}]}} /> 
        </View>
        
        <TouchableOpacity onPress={ () => navigation.navigate('Landing') } style={{
          backgroundColor:"#34e1eb",
          padding: 20,
          width:'90%',
          borderRadius: 5,
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom:50,
  
        }}>
        <Text style={{fontSize:18,color:'#fff',fontFamily:'Roboto_900Black_Italic'}}>Let's Begin</Text>
        <Feather name='arrow-right' size={22} color='#fff' />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  export default OnboardingScreen;