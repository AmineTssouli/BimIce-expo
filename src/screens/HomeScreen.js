import React, {useContext, useEffect, useState} from "react";
import {TextInput,View,StatusBar,SafeAreaView} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../navigation/AuthProvider';
import { collection,query,orderBy, getDocs, getDoc, doc, getFirestore } from "firebase/firestore"; 


import TermsList from '../components/TermsList';
import ThemeContext from "../utils/ThemeContext";




const HomeScreen = ({ navigation })=> {
   
    const {user} = useContext(AuthContext);
    const  theme = useContext(ThemeContext);
    const [allTerms,setAllTerms] = useState([]);
    const [border,setBorder] = useState('#C6C6C6');
    const [clicked,setClicked] = useState(false);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);
    const [userData,setUserData] =useState(null);


    const updateSearch = (value) => {
            
            setSearch(value);
                     
        
    }



const getUser =  async () => {
    const db = getFirestore();
    //Create a reference to the users collection
    const usersRef = collection(db, "Users");
    const docRef = doc(usersRef,user.id)
 

    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists)
    {
       setUserData(querySnapshot.data());
    }else {
        console.log("No such document!");
    }
       


}

useEffect(()=>{
    getUser();
},[])


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



    useEffect(() => { 
          getAllTerms();
          navigation.addListener('focus', () => { setLoading(!loading)});
          
      },[navigation,loading]);  





    return(
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
    



          

     
     <TermsList terms={allTerms} search={search} navigation={navigation} />
     </View>
    </SafeAreaView>

  
    );
  };

  export default HomeScreen;