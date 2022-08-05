import { View, Text,Platform, ScrollView,TouchableOpacity,StatusBar,StyleSheet, TextInput,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, SafeAreaView,Alert} from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import { doc, getDoc, updateDoc,getFirestore ,collection} from "firebase/firestore";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { getAuth} from 'firebase/auth';


import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_300Light_Italic
  } from '@expo-google-fonts/roboto';
import ThemeContext from '../utils/ThemeContext';

const EditTermScreen = ({route,navigation}) => {
    const [term,setTerm] =useState(null);
    const [loading,setLoading] = useState(true);
    const [name,setName] =useState('');
    const [description,setDescription] =useState('');
    const [labels,setLabels] = useState('');
    const [errors,setErrors] = useState({})

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
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
        const termRef =  collection(db, "Terms");
        const docRef =  doc(termRef,termID);
        await getDoc(docRef).then((snapshot)=>{
            if (snapshot.exists()) {
                const {name,description,labels} = snapshot.data()
                setTerm(snapshot.data());
                setName(name);
                setDescription(description);
                setLabels(labels);

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

  const handleError = (message,input) => {
    setErrors(prevState =>({...prevState,[input]:message}));
  
  }

  const EditTerm = async ()=> {
    const db = getFirestore();
    const TermsRef = doc(db, "Terms",term.id);
    try {
        await updateDoc(TermsRef, {
          name: name,
          description:description,
          labels:labels.includes(',')?labels.split(','):labels,
        });

      console.log('Term Updated!');
      Alert.alert("Nicely done!","Go back and check the new update",);
    } catch (error) {
        console.error(error.message);
        
    }
   

    

  }

  const validate =  () => {
   
    Keyboard.dismiss();
    let valid= true;
    
    if (!name)
    {
     handleError("Please provide a name","name");
     valid = false;
     return;
    }
    if (!description)
    {
     handleError("Please provide a description","description");
     valid = false;
     return;
    }
    if (!labels)
    {
     handleError("Please provide at least one label","labels");
     valid = false;
     return;
    }

 
    if (valid) {
        
       EditTerm();  
 
     }
 
   };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme.backgroundcolor}}> 
    <ScrollView>
    <KeyboardAvoidingView
    
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={{flex:1,backgroundColor:theme.backgroundcolor}}
            >
             <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
             
    <TouchableOpacity onPress={()=> navigation.navigate(route.params.origin)}  style={{flexDirection:'row',alignItems:'baseline',padding:10,margin:10}} >
            <Ionicons name='arrow-back-outline' size={35} color={'#AD40AF'} />
    </TouchableOpacity> 
   
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               
            
            <View style={{flex:1,padding:20}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:theme.textcolor,fontSize:22,color:'#AD40AF'}}> Update Term</Text>
                </View>
                    <View >
                        <Text style={{margin:10,color:theme.textcolor,fontWeight:'bold',color:'#AD40AF'}}>Name</Text>
                        <CustomInput placeholder={'Name'} value={name} 
                        onChangeText ={ (text) => {  setName(text)}} 
                        onFocus= {() => { handleError(null,'name')}}
                        error={errors.name} />
            
                                    <Text style={{margin:10,color:theme.textcolor,fontWeight:'bold',color:'#AD40AF'}}>Description</Text>
                                <TextInput
                                   
                                    multiline 
                                    placeholder={'Description'}
                                    placeholderTextColor='gray'
                                    textAlignVertical='top'
                                    onChangeText ={ (text) => {  setDescription(text)}}
                                    onFocus= {() => { handleError(null,'description')}}
                                    value ={description}
                                    style={{
                                        color:theme.textcolor,
                                        borderWidth:1,
                                        borderRadius:20,
                                        borderColor:errors.description?'red':'#61CE70',
                                        padding: 20,
                                        height:200,
                                        backgroundColor:theme.backgroundcolor,
                                        fontSize:16,fontFamily:'Roboto_400Regular'
                                 
                                    }}
                                  
                                />
                                {errors.description && <Text style={{color:'red',fontSize:12,marginLeft:25,marginTop:10}}>{errors.description}</Text>}
                                <Text style={{margin:10,color:theme.textcolor,fontWeight:'bold',color:'#AD40AF'}}>Labels</Text>
                                <CustomInput placeholder={'Seperate Labels with comma'} value={Array.isArray(labels)?labels?.join(','):labels} 
                                onChangeText ={ (text) => {  setLabels(text)}} 
                                onFocus= {() => { handleError(null,'labels')}}
                                error={errors.labels}/>
                            

                        
                        <View  style={{flexDirection:'row',justifyContent:'flex-end',marginBottom: 20,marginTop: 20}}>
                        <TouchableOpacity
                        onPress={()=>{ validate()}}
                        style={{
                            backgroundColor:'#61CE70',
                            padding: 20,
                            borderRadius: 50,
                            width:'30%'
                        }}>
                        <Text
                            style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 18,
                            color: '#fff',
                            fontFamily:'Roboto_400Regular'
                        
                            }}>
                            Edit
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{
                            setName('');
                            setDescription(''); 
                            setLabels('');
                            setErrors(''); 

                            navigation.navigate(route.params.origin)
                        }}
                        style={{
                            backgroundColor:'red',
                            padding: 20,
                            borderRadius: 50,
                            marginLeft: 10,
                            width:'30%'
                        }}>
                        <Text
                            style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 18,
                            color: '#fff',
                            fontFamily:'Roboto_400Regular'
                        
                            }}>
                            Cancel
                        </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                
            </View>
            
           
           </TouchableWithoutFeedback>
          
        </KeyboardAvoidingView>
        </ScrollView>
        </SafeAreaView>
      
    
  )
}
const styles = StyleSheet.create({

  });
export default EditTermScreen