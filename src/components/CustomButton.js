import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';

export default function CustomButton({label, onPress,bgcolor}) {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,

  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:bgcolor?bgcolor:'#61CE70',
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
          fontFamily:'Roboto_400Regular'
       
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
