import { View, Text,SafeAreaView ,TouchableOpacity, Linking,StatusBar,Image, ScrollView} from 'react-native'
import React, { useContext } from 'react'
import Facebook from '../assets/images/misc/facebook.svg';
import Instagram from '../assets/images/misc/instagram.svg';
import Website from '../assets/images/misc/website.svg';
import Lab from '../assets/images/misc/lab-logo.svg';

import ThemeContext from "../utils/ThemeContext";

import {windowHeight} from '../utils/Dimensions';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_300Light_Italic
} from '@expo-google-fonts/roboto';

const AboutScreen = () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_300Light_Italic

  });

  const theme = useContext(ThemeContext);
  console.log(windowHeight);
  const height = windowHeight*0.99-670;
  return (
    
    <SafeAreaView  style={{flex:1,backgroundColor: theme.backgroundcolor}} >
      <ScrollView style={{flex:1,padding:20}}>
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.secondary,
              fontSize: 24,
              fontFamily: 'Roboto_500Medium',
              
            }}>What is BIMOLOGY</Text>
     </View>
     <View style={{marginVertical:5}}>
      <Text style={{textAlign:'justify',fontFamily: 'Roboto_500Medium',marginVertical:10,color:theme.textcolor}}>
      BIMOLOGY it's a project that aims to help students who lacks the common terminology in field of construction and building design. It's a splendid fruitful collabrotation between LAB University Of Applied Sciences and BIM-ICE.
      </Text>
     </View>
     <View  style={{marginTop:10}}>
      <Text style={{
              color: theme.secondary,
              fontSize: 24,
              fontFamily: 'Roboto_500Medium',
              
            }}>Project Manager</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto_500Medium',marginVertical:10,color:theme.textcolor}}>Borislav Hristov</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto_500Medium',color:theme.textcolor}}>Borislav.Hristov@student.lab.fi</Text>
     </View>
     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.secondary,
              fontSize: 24,
              fontFamily: 'Roboto_500Medium',
              
            }}>Lead Developer</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto_500Medium',marginVertical:10,color:theme.textcolor}}>Amine Tssouli</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto_500Medium',color:theme.textcolor}}>Amine.Tssouli@student.lab.fi</Text>
     </View>
     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.secondary,
              fontSize: 24,
              fontFamily: 'Roboto_500Medium',
              
            }}>Junior Developers</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto_500Medium',marginVertical:10,color:theme.textcolor}}>Anton Ivanov</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto_500Medium',color:theme.textcolor}}>Anton.Ivanov@student.lab.fi</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto_500Medium',marginVertical:10,color:theme.textcolor}}>Artyom Kamnev</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto_500Medium',color:theme.textcolor}}>Artyom.Kamnev@student.lab.fi</Text>
     </View>

     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.secondary,
              fontSize: 20,
              fontFamily: 'Roboto_500Medium',
              
            }}>Our Partners</Text>
     </View>
     <View style={{flexDirection:'row',marginVertical:10,justifyContent:'space-around',shadowColor:'gray',shadowOpacity:1}}>
        <Lab height={110}  width={110}  fill={theme.textcolor} />
       <Image  style={{ width: 100, height: 100 }} source={require('../assets/images/logo.png')} />

     </View>
     <View style={{marginBottom:50}}>
        <View style={{borderTopColor:'#61CE70',borderTopWidth:2}}>
          <Text style={{marginTop:6,   fontSize: 14,
                  fontFamily: 'Roboto_300Light_Italic',color:'gray'}}>Join our Community and Follow us</Text>
        </View>
        <View style= {{flexDirection:'row',marginTop:20,justifyContent:'space-between'}} >

                <TouchableOpacity
                    onPress={()=>{
                      Linking.openURL('https://www.facebook.com/bimicecbc')
                    .catch(err => console.error('Error', err));

                    }}
        
                    >
              <Facebook height={50} width={50} />
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={()=>{
                      Linking.openURL('https://bim-ice.com/')
                      .catch(err => console.error('Error', err));
                    }}
        
                    >
              <Website height={50} width={50}   fill={theme.about_color}  />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                      Linking.openURL('https://www.instagram.com/bim_ice/')
                      .catch(err => console.error('Error', err));
                    }}
        
                    >
              <Instagram height={50} width={50} />
                </TouchableOpacity>

            </View>
      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AboutScreen