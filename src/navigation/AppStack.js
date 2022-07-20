import React,{useContext} from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ThemeContext from "../utils/ThemeContext";
import AboutScreen from '../screens/AboutScreen';



const Drawer = createDrawerNavigator();

const AppStack = () => {
 
  const theme = useContext(ThemeContext);


  
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props}  />}
    screenOptions={{ drawerActiveBackgroundColor:'#AD40AF',
    headerTitleAlign:'center',
    headerTintColor:'#fff',
     headerStyle:{backgroundColor:'#AD40AF'},
    drawerActiveTintColor:theme.icon_activecolor,
    drawerInactiveTintColor:theme.icon_inactivecolor,
    drawerLabelStyle:{marginLeft:-25,fontFamily:'Roboto-Medium',fontSize:15
    }
    }}>
      <Drawer.Screen component={HomeScreen} name='Home'  options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons  name='home' size={22} color={color}  />
          )
      }} />
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