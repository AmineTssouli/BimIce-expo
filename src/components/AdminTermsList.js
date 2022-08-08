import React, {useContext,useState, useRef,useCallback } from 'react';
import { View, Text,FlatList,StyleSheet ,TouchableOpacity,Alert,RefreshControl} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection,query,orderBy, getDocs, doc, getFirestore,deleteDoc } from "firebase/firestore";    
import ThemeContext from "../utils/ThemeContext";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular_Italic
} from '@expo-google-fonts/roboto';


const AdminTermsList = ({ search, navigation }) => {
    let [fontsLoaded] = useFonts({
      Roboto_700Bold,
      Roboto_400Regular_Italic

    });

    const fListRef = useRef();
    const  theme = useContext(ThemeContext);
    const [loading,setLoading] = useState(true);
    const [scrollPosition,setScrollPosition]= useState(0);
    const [position,setPosition] = useState(0);
    const [allTerms,setAllTerms] = useState([]);

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
  

    const showConfirmDialog = (id) => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this Term Permanently?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: async() => {
                // code here to delete the object
                
                try {
                    const db = getFirestore();
                    await deleteDoc(doc(db, "Terms",id));
                    console.log('Succefully deleted');
                   
                    navigation.navigate("Admin");
                    setLoading(true);
                    
                } catch (error) {
                    console.log('######## Erros occured #######');

                    
                }
               
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

 

    const Item = ({id, name, description, index}) => {
      

      return (
        <View style={[styles.item,{borderColor:theme.section_bordercolor,backgroundColor:theme.section_backgroundcolor}]} key={id} index={index} >
     

            <Text value={name} numberOfLines={2} style={styles.name}>{name}</Text>
            <Text value={description} numberOfLines={2} style={styles.description}>{description}</Text>
            <View  style={{marginRight:5,marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity  onPress={() => {navigation.navigate('Term',{'termID':id,'origin':'Admin'}); }}>
                <Ionicons name='folder-open-outline' size={27} color='#AD40AF' />
            </TouchableOpacity>
            <View style={{flexDirection:'row',justifyContent:'space-between'}} >
            <TouchableOpacity  onPress={() => {navigation.navigate('EditTerm',{'termID':id,'origin':'Admin'});} }>
                <Ionicons name='create' size={27} color='#349' />
            </TouchableOpacity>
            <Text>  </Text>
            <TouchableOpacity  onPress={() => { showConfirmDialog(id)} }>
                <Ionicons name='trash' size={27} color='red' />
            </TouchableOpacity>
            </View>
            </View> 
        </View>
      );
    }
    

   

    const RenderItem = ({ item,index }) => {

      if(search === "" || item.name.toString().toUpperCase().includes(search.toString().toUpperCase()))

      {
        

        return <Item  id={item.id} name={item.name} description={item.description} index={index}  />;
     
      }
 
    };


    const NotFound = () => {
      return (
     <View style={{marginTop:20}}>
      <Text style={{color:theme.textcolor}}>Sorry, we didn't find anything matching your search.</Text>
     </View>
      )
    };

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      const [refreshing, setRefreshing] = useState(false);
      const onRefresh = useCallback(() => {
        setLoading(true);
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);


      return (
        
 
          <FlatList
          ref={fListRef}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 700));
            wait.then(() => {
              fListRef.current?.scrollToIndex({ index: info.index, animated: true/false });
            });
          }}
            initialScrollIndex={scrollPosition}
            data={allTerms}
            renderItem={RenderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent ={NotFound}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
    
          />
       
       
      ) };
      
      
const styles = StyleSheet.create({
    container: {
      flex: 1
      
    },
    item: {
      padding: 15,
      marginVertical: 8,
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
  

export default AdminTermsList;