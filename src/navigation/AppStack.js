import React,{useContext, useEffect, useState} from 'react'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ThemeContext from "../utils/ThemeContext";
import AboutScreen from '../screens/AboutScreen';
import { getAuth  } from "firebase/auth"; 
import TermScreen from '../screens/TermScreen';
import AdminScreen from '../screens/AdminScreen';
import AddTermScreen from '../screens/AddTermScreen';
import EditTermScreen from '../screens/EditTermScreen';
import VerifyemailScreen from '../screens/VerifyemailScreen';
import {AuthContext} from '../navigation/AuthProvider';
import {
  useFonts,
  Roboto_500Medium
  
} from '@expo-google-fonts/roboto';


const Drawer = createDrawerNavigator();

const AppStack = () => {
  const [loading,setLoading] = useState(true);
  const [isVerified,setIsVerified] = useState(false);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Roboto_500Medium
  });
  const theme = useContext(ThemeContext);
  let auth =  getAuth();

  const {user} = useContext(AuthContext);
  useFocusEffect( ()=>{
      async function checkUserEmail() {
      await auth.currentUser.reload();

      }
    checkUserEmail();
    let userConnected = getAuth().currentUser;
    console.log("focused");
    console.log("#######################",userConnected.emailVerified)
     if(auth.currentUser.emailVerified) {
        setIsVerified(true)
      } 

  
 });


  
  if(!isVerified && !auth.currentUser.isAnonymous) {
    return <VerifyemailScreen />
  }
  else 
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
      
      {(/^\w+([\.-]?\w+)*@gmail.com+$/.test(auth.currentUser.email)) &&
     <>
      <Drawer.Screen component={AdminScreen} name='Admin' options={{
        headerShown:true,
          drawerIcon:({color})=> (
              <Ionicons name='flask' size={22} color={color} />
          )
      }} />
      <Drawer.Screen component={AddTermScreen} name='AddTerm'  options={{
        headerShown:true,
        drawerItemStyle: { display: 'none' },
        headerTitle:'Admin'

    }} />
          <Drawer.Screen component={EditTermScreen} name='EditTerm'  options={{
        headerShown:true,
        drawerItemStyle: { display: 'none' },
        headerTitle:'Admin'

    }} />
    </>
      
      
      }
  
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