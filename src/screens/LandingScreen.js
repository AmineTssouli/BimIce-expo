import { View, Text ,SafeAreaView,TouchableOpacity,ImageBackground,StatusBar} from 'react-native';
import React,{useContext} from 'react';
import ThemeContext from "../utils/ThemeContext";

const LandingScreen = ( { navigation } ) => {
 
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
            <ImageBackground source={require('../../src/assets/images/logo.png')} style={{ marginTop:20,width:200,height:200,top:20}} imageStyle={{borderRadius:25}} />
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
                <Text style={{fontSize:18,color:'#fff',fontFamily:'Roboto-BoldItalic',textAlign:'center'}}>Sign up</Text>
            
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
                <Text style={{fontSize:18,color:'#61CE70',fontFamily:'Roboto-BoldItalic',textAlign:'center'}}>Login</Text>
            
                </TouchableOpacity>
        </View>

        
      </SafeAreaView>
  )
}

export default LandingScreen;