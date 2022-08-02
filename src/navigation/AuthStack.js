import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LandingScreen from '../screens/LandingScreen';
import ResetpasswordScreen from '../screens/ResetpasswordScreen';
import ThemeContext from "../utils/ThemeContext";




const Stack = createNativeStackNavigator();


const AuthStack = () => {
  const  theme = useContext(ThemeContext);


  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen component={OnboardingScreen} name='Onboarding'  />
       <Stack.Screen component={LandingScreen} name='Landing'  />
      <Stack.Screen component={LoginScreen} name='Login'  />
      <Stack.Screen component={SignupScreen} name='Signup' />
      <Stack.Screen component={ResetpasswordScreen} name='Resetpassword'  options={{
        headerShown:true,
        headerBackTitleVisible:true,
        headerBackVisible:true,
        headerTransparent:true,
        headerTitle:'',
        headerBackTitle:'back',
        headerTintColor:theme.textcolor
         }} />
      


    </Stack.Navigator>
  )
}

export default AuthStack;