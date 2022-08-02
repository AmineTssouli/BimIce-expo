import React,{useContext} from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ThemeContext from "../utils/ThemeContext";
import AboutScreen from '../screens/AboutScreen';
import { getAuth } from "firebase/auth"; 
import TermScreen from '../screens/TermScreen';

import {
  useFonts,
  Roboto_500Medium
  
} from '@expo-google-fonts/roboto';


const Drawer = createDrawerNavigator();
const Stack  = createNativeStackNavigator();
const TermNav = () => {
  const theme =useContext(ThemeContext);

  return (
    <Stack.Navigator screenOptions={{headerShown:true}}>
    
       <Stack.Screen component={TermScreen} name='Term'  options={{
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

const AppStack = () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium
  });
  const auth = getAuth();
 
  const theme = useContext(ThemeContext);


  
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props}  />}
    screenOptions={{ drawerActiveBackgroundColor:'#AD40AF',
    headerTitleAlign:'center',
    headerTintColor:'#fff',
     headerStyle:{backgroundColor:'#AD40AF'},
    drawerActiveTintColor:theme.icon_activecolor,
    drawerInactiveTintColor:theme.icon_inactivecolor,
    drawerLabelStyle:{marginLeft:-25,fontFamily:'Roboto_500Medium',fontSize:15
    }
    }}>
      <Drawer.Screen component={HomeScreen} name='Home'  options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons  name='home' size={22} color={color}  />
          )
      }} />
         <Drawer.Screen component={TermScreen} name='Term'  options={{
          headerShown:true,
          drawerItemStyle: { display: 'none' },
          headerTitle:'Definition'

      }} />
  
       { (!auth.currentUser.isAnonymous) &&
       <>
      <Drawer.Screen component={ProfileScreen} name='Profile' options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons name='person' size={22} color={color} />
          )
      }} />
           
      
      
      <Drawer.Screen component={MessagesScreen} name='Messages' options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons name='chatbox-ellipses' size={22} color={color} />
          )
      }} />
     
      <Drawer.Screen component={BookmarksScreen} name='Bookmarks' options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons name='timer' size={22} color={color} />
          )
      }} />
    
      <Drawer.Screen component={SettingsScreen} name='Settings' options={{
        headerShown:true, 
          drawerIcon:({color})=> (
              <Ionicons name='settings' size={22} color={color} />
          )
      }} />
      </>
    }
      <Drawer.Screen component={AboutScreen} name='About' options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons name='information-circle' size={22} color={color} />
          )
      }} />



    </Drawer.Navigator>
  )
}

export default AppStack;