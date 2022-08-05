import * as React from 'react';
import { useContext } from 'react';
import { Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ThemeContext from '../utils/ThemeContext';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';
const CustomRadiobutton = ({value,...props}) => {
   const theme = useContext(ThemeContext);
   let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,

  });

  return (
     <>
      <RadioButton
       
        value={value}
        color='#61CE70'
        {...props}
      />
      <Text style={{fontSize:16,fontFamily:'Roboto_400Regular',color:theme.textcolor}}>{value}</Text>
      </>
  );
};

export default CustomRadiobutton;