import * as React from 'react';
import { useContext } from 'react';
import { Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ThemeContext from '../utils/ThemeContext';

const CustomRadiobutton = ({value,...props}) => {
   const theme = useContext(ThemeContext);

  return (
     <>
      <RadioButton
       
        value={value}
        color='#61CE70'
        {...props}
      />
      <Text style={{fontSize:16,fontFamily:'Roboto-Regular',color:theme.textcolor}}>{value}</Text>
      </>
  );
};

export default CustomRadiobutton;