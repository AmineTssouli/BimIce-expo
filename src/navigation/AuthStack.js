import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LandingScreen from '../screens/LandingScreen';




const Stack = createNativeStackNavigator();


const AuthStack = () => {


  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen component={OnboardingScreen} name='Onboarding'  />
       <Stack.Screen component={LandingScreen} name='Landing'  />
      <Stack.Screen component={LoginScreen} name='Login'  />
      <Stack.Screen component={SignupScreen} name='Signup' />
      

    </Stack.Navigator>
  )
}

export default AuthStack;