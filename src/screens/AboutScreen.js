import { View, Text,SafeAreaView ,TouchableOpacity, Linking,StatusBar} from 'react-native'
import React, { useContext } from 'react'
import Facebook from '../assets/images/misc/facebook.svg';
import Instagram from '../assets/images/misc/instagram.svg';
import Website from '../assets/images/misc/website.svg';
import ThemeContext from "../utils/ThemeContext";

import {windowHeight} from '../utils/Dimensions';

const AboutScreen = () => {

  const theme = useContext(ThemeContext);
  console.log(windowHeight);
  const height = windowHeight*0.99-670;
  return (
    
    <SafeAreaView  style={{flex:1,backgroundColor: theme.backgroundcolor}} >
      <View style={{flex:1,padding:20}}>
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.about_color,
              fontSize: 20,
              fontFamily: 'Roboto-Medium',
              
            }}>What is BIM-ICE</Text>
     </View>
     <View style={{marginVertical:5}}>
      <Text style={{textAlign:'justify',fontFamily: 'Roboto-Medium',marginVertical:10,color:theme.textcolor}}>
      BIM ICE Project standing for “BIM Integration in Higher and Continuing Education” seeks to accelerate BIM implementation in the field of construction and building design in Finland and Russia. Addressing such topical issues as lack of common terminology in the field and development phase of standardization,  lack of technical know-how and lack of competence in process development, the Project is aimed at improving productivity and quality within the construction industry by developing new training models and increasing the level of education among different target groups.</Text>
     </View>
     <View  style={{marginTop:10}}>
      <Text style={{
              color: theme.about_color,
              fontSize: 20,
              fontFamily: 'Roboto-Medium',
              
            }}>Project Manager</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto-Medium',marginVertical:10,color:theme.textcolor}}>Eliisa Punttila</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto-Medium',color:theme.textcolor}}>eliisa.punttila@lab.fi</Text>
     </View>
     <View style={{marginTop:10}}>
      <Text style={{
              color: theme.about_color,
              fontSize: 20,
              fontFamily: 'Roboto-Medium',
              
            }}>Communication Manager</Text>
     </View>
     <View style={{marginVertical:5}}>
     <Text style={{textAlign:'justify',fontWeight:'900',fontFamily: 'Roboto-Medium',marginVertical:10,color:theme.textcolor}}>Anna-Riitta Pettinen</Text>
     <Text style={{textAlign:'justify',fontFamily: 'Roboto-Medium',color:theme.textcolor}}>anna-riitta.pettinen@lab.fi</Text>
     </View>
     <View style={{marginTop:height}}>
        <View style={{borderTopColor:'#61CE70',borderTopWidth:2}}>
          <Text style={{marginTop:6,   fontSize: 14,
                  fontFamily: 'Roboto-Italic',color:'gray'}}>Join our Community and Follow us</Text>
        </View>
        <View style= {{flexDirection:'row',margin:20,justifyContent:'space-between'}} >

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
        </View>
    </SafeAreaView>
  )
}

export default AboutScreen