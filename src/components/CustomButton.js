import {Text, TouchableOpacity} from 'react-native';
import React from 'react';


export default function CustomButton({label, onPress}) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#61CE70',
        padding: 20,
        borderRadius: 88,
        marginBottom: 20,
        width:'80%'
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 18,
          color: '#fff',
          fontFamily:'Roboto-Regular'
       
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
