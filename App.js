import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider , AuthContext } from './src/navigation/AuthProvider';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import ThemeContext from './src/utils/ThemeContext';
import { Appearance } from 'react-native';


import theme from './src/utils/theme';


const Router = () => {
  // detecting the user current theme and display the app accordingly
  const [mode,setMode] = useState(Appearance.getColorScheme());
  
  Appearance.addChangeListener((scheme)=>{
  setMode(scheme.colorScheme);
 
  })
 


  // Set an initializing state whilst Firebase connects

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  });
  
  if (initializing) return null;


  return (
    <ThemeContext.Provider value ={ mode === 'light' ? theme.light : theme.dark}>
    

    <NavigationContainer >
      
      { user ? <AppStack />:<AuthStack /> } 
    </NavigationContainer>
    </ThemeContext.Provider>
  );
};

const App = () => {

  return(
    <AuthProvider>

          <Router />
     
    </AuthProvider>
  );

}

export default App;
