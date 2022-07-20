import { View, Text,StatusBar } from 'react-native'
import React,{useContext} from 'react'
import ThemeContext from "../utils/ThemeContext";

const SettingsScreen = () => {
 
  const theme = useContext(ThemeContext);
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:theme.backgroundcolor}}>
    <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen