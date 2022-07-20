import { View,SafeAreaView ,StatusBar,StyleSheet} from 'react-native';
import React,{useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import CustomButton from '../components/CustomButton';
import ThemeContext from "../utils/ThemeContext";



const ProfileScreen = () => {
  
  const theme = useContext(ThemeContext);
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView  style={{flex:1,backgroundColor:theme.backgroundcolor,padding:20}} >
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:20}}>
     <CustomButton label={'Update profile'} />
    </View>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  input : {paddingLeft:5,marginBottom:10,borderBottomWidth:1,fontSize:16,fontFamily:'Roboto-Regular'},
  error:{color:'red',fontSize:12,marginLeft:25,marginTop:-10}

});

export default ProfileScreen