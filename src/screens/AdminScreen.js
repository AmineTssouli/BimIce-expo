import React, {useContext, useEffect, useState,useCallback} from "react";
import {TouchableOpacity, Text,TextInput,View,StatusBar,SafeAreaView} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../navigation/AuthProvider';
import { collection,query,orderBy, getDocs, getDoc, doc, getFirestore } from "firebase/firestore"; 
import Ionicons from 'react-native-vector-icons/Ionicons';



import AdminTermsList from '../components/AdminTermsList';
import ThemeContext from "../utils/ThemeContext";
const AdminScreen = ({ navigation }) => {
    const {user} = useContext(AuthContext);
    const  theme = useContext(ThemeContext);
    const [allTerms,setAllTerms] = useState([]);
    const [border,setBorder] = useState('#C6C6C6');
    const [clicked,setClicked] = useState(false);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);

    const updateSearch = (value) => {
            
        setSearch(value);
                 
    
    }
    const getAllTerms =  async () => {
        const db = getFirestore();
        const terms= [];
            //Create a reference to the terms collection
        const termsRef = collection(db, "Terms");
        const querySnapshot = await getDocs(query(termsRef,orderBy('created_at','desc')));
        querySnapshot.forEach(doc => {
          const {name,description,created_at,id} = doc.data();
          terms.push( {
             id : id, 
             name: name,
             description:description,
             created_at:created_at
          });
    
          
    
        })
       
    
        setAllTerms([]);
        setAllTerms(terms);
        if (loading) setLoading(false);
    
       
    
    
    }
    
    
    
    useFocusEffect(
        useCallback(() => { 
              getAllTerms();
              navigation.addListener('focus', () => { setLoading(!loading)});
              
          },[navigation,loading])
    );  
    


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
             <View  
         style={{
            marginVertical:15
        }}>
          
                <TouchableOpacity  onPress={() => {navigation.navigate('AddTerm',{'origin':'Admin'});}} style={{  flexDirection:'row',alignItems:'center', justifyContent:'center',}}>
                    
                <Ionicons name='add-circle-outline' size={30} color='#AD40AF' />
                    <Text style={{color:'#AD40AF',fontSize:18}}>Add new term</Text>
                    
                </TouchableOpacity>
        </View>
            <AdminTermsList terms={allTerms} search={search} navigation={navigation} />
       </View>
    </SafeAreaView>

  
    );
  
}

export default AdminScreen