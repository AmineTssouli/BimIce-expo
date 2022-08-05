import { View, Text, SafeAreaView,TouchableOpacity,StatusBar,StyleSheet} from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import { doc, getDoc,getFirestore ,collection} from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular_Italic,
    Roboto_300Light_Italic
  } from '@expo-google-fonts/roboto';
import ThemeContext from '../utils/ThemeContext';

const TermScreen = ({route,navigation}) => {
    const [term,setTerm] =useState(null);
    const [loading,setLoading] = useState(true);
    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular_Italic,
        Roboto_300Light_Italic
  
      });

     
  const theme = useContext(ThemeContext);
  
  useEffect(()=>{ 
    getTerm();
   
    navigation.addListener('focus', () => { setLoading(!loading)});


  },[loading]);
 const getTerm = async () =>{
    try {
        const db = getFirestore();
        const {termID} = route.params;
        console.log("TermID is ",termID);
        const termRef =  collection(db, "Terms");
        const docRef =  doc(termRef,termID);
        const docSnap = await getDoc(docRef).then((snapshot)=>{
            if (snapshot.exists()) {
                setTerm(snapshot.data());
                } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                } 

        });

 
        if (loading) setLoading(false);
        
    } catch (error) {
        console.error(error)
    }
    
  

 }



  return (
   
    <SafeAreaView  style={{flex:1,backgroundColor:theme.backgroundcolor}} >
    <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
    <TouchableOpacity onPress={()=> navigation.navigate(route.params.origin)}  style={{flexDirection:'row',alignItems:'baseline',padding:10,margin:10}} >
            <Ionicons name='arrow-back-outline' size={35} color={'#AD40AF'} />
            </TouchableOpacity>
    <View style={{padding:20}}>

            
            <View style={[styles.item,{borderColor:theme.section_bordercolor,backgroundColor:theme.section_backgroundcolor}]}  >
                <Text value={term?.name}  style={styles.name}>{term?.name} </Text>
                <Text value={term?.description}   style={styles.description}>{term?.description}</Text>
                <View  style={{marginRight:5,marginTop:40}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',fontFamily:'Roboto_300Light_Italic'}}>
                    <Text style={{fontFamily:'Roboto_300Light_Italic'}} >Labels: </Text>
                    <Text style={{fontFamily:'Roboto_400Regular_Italic',color:'#AD40AF'}}> 
                     
                     { term?? Array.isArray(term?.labels)? term?.labels.join(' | '): term?.labels}
                  
                    </Text>
                </View>
                <View  style={{flexDirection:'row',justifyContent:'flex-end',marginTop:30}}>
                <Text style={{fontFamily:'Roboto_300Light_Italic'}}>{term?.created_at.toDate().toDateString()}</Text>
                </View>
                </View>
            </View>
        
    </View>

           
              
          </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1
      
    },
    item: {
      padding: 15,
      borderWidth:1,
      borderRadius:14,
   
    },
    name: {
      fontSize: 20,
      fontFamily: 'Roboto_700Bold',
      marginBottom:15,
      color:'#333'
    },
    description :{
      fontSize:16,
      fontFamily: 'Roboto_400Regular_Italic',
      textAlign:'justify',
      color:'#333'
    }
  });
export default TermScreen