import { View, Text,SafeAreaView,StatusBar} from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from "../utils/ThemeContext";
import { getAuth } from "firebase/auth"; 
import CustomButton from '../components/CustomButton';
import {windowHeight} from '../utils/Dimensions';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_300Light_Italic
} from '@expo-google-fonts/roboto';
import { AuthContext } from '../navigation/AuthProvider';

const VerifyemailScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_300Light_Italic

  });

   const auth = getAuth();


   const {sendVerificationAgain} = useContext(AuthContext)
  
 
  const theme = useContext(ThemeContext);
  console.log(windowHeight);
  const height = windowHeight*0.99-670;


  
  return (
    
    <SafeAreaView  style={{flex:1,backgroundColor: theme.backgroundcolor}} >
      <View style={{flex:1,padding:20}}>
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
            <View style={{marginTop:10}}>
            <Text style={{
                    color: theme.secondary,
                    fontSize: 20,
                    fontFamily: 'Roboto_500Medium',
                    marginTop:60
                    
                    }}>Remember to sign out and then log in to enjoy the app : )</Text>

               
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:80}}>
                        <CustomButton label={'Get Verified Again'} onPress={()=> sendVerificationAgain()}/>
                        <CustomButton bgcolor={theme.secondary} label={'Sign out'} onPress={()=> auth.signOut()} />

                    </View>

                  
            </View>
        

        </View>
    </SafeAreaView>
  )
}

export default VerifyemailScreen