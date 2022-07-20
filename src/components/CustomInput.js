import { View, Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React,{useContext, useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import ThemeContext from '../utils/ThemeContext';

const CustomInput = ({inputType,secure,placeholder,error,handleOnChange,handleError,extraicon,icon,value, ...props}) => {

    const [secured,setSecured] = useState(true);
    const theme = useContext(ThemeContext);

  return (
 
    <>
    <View style={{
        flexDirection:'row',
        borderWidth:1,
        borderColor: error ? 'red': '#61CE70',
        paddingLeft:20,
        marginBottom:10,
        borderRadius:88 
        }} >
             <Entypo style={{marginTop:10,marginLeft:-10}} name={icon} size={24} color='#61CE70' />
          
            <TextInput
             {...props}
            clearTextOnFocus={false}
            placeholder={placeholder}
            style={[style.input,{color:theme.textcolor}]}
            placeholderTextColor='gray'
            keyboardType={inputType?'email-address':'default'}
            secureTextEntry={secure && secured?true:false} 
            autoCapitalize ='none'
            value={value}
           

         
           

            />
            
              { extraicon &&<TouchableOpacity onPress={()=>{setSecured(!secured)}}>
            <Entypo style={{margin:10}} name={ secured ? "eye" : "eye-with-line" } size={24} color='#61CE70'  /> 
            </TouchableOpacity>}
            </View>
            {error && <Text style={style.error}>{error}</Text>}
            </>
  )
}
const style = StyleSheet.create({
    input : {flex:1, padding:10,fontSize:16,fontFamily:'Roboto-Regular'},
    error:{color:'red',fontSize:12,marginLeft:25,marginTop:-10}
  
  });
  

export default CustomInput;