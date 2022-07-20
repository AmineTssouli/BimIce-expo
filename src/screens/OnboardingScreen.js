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


const OnboardingScreen = ({ navigation }) => {

  const theme = useContext(ThemeContext);

  return (
      <SafeAreaView style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: theme.backgroundcolor,
        }}>
          <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
          <View>
            <Text style={{marginTop:20,fontSize:40, fontWeight:'bold', color:theme.textcolor,fontFamily:'Inter-Bold'}}>BIM-ICE </Text>
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
        <Text style={{fontSize:18,color:'#fff',fontFamily:'Roboto-BoldItalic'}}>Let's Begin</Text>
        <Feather name='arrow-right' size={22} color='#fff' />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  export default OnboardingScreen;