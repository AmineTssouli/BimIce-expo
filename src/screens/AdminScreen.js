import React, {useContext,useState} from "react";
import {TouchableOpacity, Text,TextInput,View,StatusBar,SafeAreaView} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTermScreen from "./AddTermScreen";



import AdminTermsList from '../components/AdminTermsList';
import ThemeContext from "../utils/ThemeContext";
const AdminScreen = ({ navigation }) => {

    const  theme = useContext(ThemeContext);
    const [border,setBorder] = useState('#C6C6C6');
    const [clicked,setClicked] = useState(false);
    const [search,setSearch] = useState('');

    const updateSearch = (value) => {
            
        setSearch(value);
                 
    
    }
    


  return (
    <SafeAreaView  style={{flex:1,backgroundColor:theme.backgroundcolor}} >
       <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />

       <View style={{flex:1,padding:20}}>
            <View style={{
                    flexDirection:'row',
                    borderWidth:2,
                    borderRadius:8,
                    borderColor:border ?? border,
                    paddingHorizontal:10,
                    paddingVertical:8,
                    marginBottom:10
                    }} >
                    <Feather name='search' size={22} color='#C6C6C6' style={{marginRight:5,marginTop:3}} />
                    <TextInput placeholderTextColor='gray' placeholder="Type here to search" style={{flex:1, padding:0, color:theme.textcolor}}
                    value={search}
                    onChangeText= {(value)=>updateSearch(value)}
                    onBlur ={()=> {setClicked(false); setBorder('#C6C6C6'); }}
                    onFocus ={()=> {setClicked(true); setBorder('#61CE70'); }}
                    />
                    { clicked && 
                    
                    <FontAwesome5 name="times" size={22} color='#AAA' style={{marginRight:5,marginTop:3}} onPress={()=>{ setSearch(''); setClicked(false);}} /> }

          </View>
            
                
                <TouchableOpacity style={{marginHorizontal:90}}  onPress={() => {navigation.navigate('AddTerm',{'origin':'Admin'});}}>
                <View  
                    style={{
                        marginVertical:15,
                        flexDirection:'row',alignItems:'center', justifyContent:'center',
                    }}>
                    <Ionicons name='add-circle-outline' size={30} color='#AD40AF' />
                    <Text style={{color:'#AD40AF',fontSize:19}}> Add new term</Text>
                </View>
                </TouchableOpacity>

    
   
            <AdminTermsList  search={search} navigation={navigation} />
       </View>
    </SafeAreaView>

  
    );
  
}

export default AdminScreen