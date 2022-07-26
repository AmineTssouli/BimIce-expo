import React, {useEffect,useContext,useState, useRef,useCallback } from 'react';
import { View, Text,FlatList,StyleSheet ,TouchableOpacity,RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection,query,where, getDocs,setDoc, doc ,deleteDoc,getFirestore } from "firebase/firestore";   
import { getAuth } from "firebase/auth";   
import { ActivityIndicator } from 'react-native';
import ThemeContext from "../utils/ThemeContext";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular_Italic
} from '@expo-google-fonts/roboto';


const TermsList = ({ terms , search, navigation }) => {
    let [fontsLoaded] = useFonts({
      Roboto_700Bold,
      Roboto_400Regular_Italic

    });

    const auth = getAuth();
    const fListRef = useRef();
    const  theme = useContext(ThemeContext);

   
    const[bookmarked,setBookmarked] = useState([]);
    const [loading,setLoading] = useState(true);

    const [scrollPosition,setScrollPosition]= useState(0);
    const [position,setPosition] = useState(0);

 

    
    useEffect(()=>{
      getBookmarkedTerms();
      navigation.addListener('focus', () => { setLoading(!loading); setScrollPosition(0)});    
  
    },[navigation,loading]); 

    const getBookmarkedTerms = async ()=> {

      const db = getFirestore();
      const auth = getAuth();
      const favoriteTerms = [];
      const q = query(collection(db, "Bookmarks"), where("userID", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
       querySnapshot.forEach(doc => {
           const {termID} = doc.data();
           favoriteTerms.push( 
            
             termID
    
           );
    
       });
       
       setBookmarked(favoriteTerms);
        if (loading) {
          setLoading(false);
        }
            
    }



    const unbookmarkIT = async (docToDelete) => {

      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "Bookmarks", docToDelete))
        .then(() => {
          setBookmarked([]);
          
          });

          if (loading) {
            setLoading(false);
          
          }
           
    }
    catch(e) {
    console.log(e);
    
    }

    }

    const bookmarkIT =async (name,description,termID)=> {

      try {
        const db = getFirestore();
        const auth = getAuth();
        const bookmarksRef = collection(db, "Bookmarks");
     
        await setDoc(doc(bookmarksRef, termID), {
          name: name,
          description: description,
          termID : termID,
          userID: auth.currentUser.uid });
    
          if (loading) {
            setLoading(false);
          }

    }
    catch(e) {
    console.log(e);
    
    }

    }

    const Item = ({id, name, description, index}) => {
      

      return (
        <View style={[styles.item,{borderColor:theme.section_bordercolor,backgroundColor:theme.section_backgroundcolor}]} key={id} index={index} >
     

            <Text value={name} numberOfLines={2} style={styles.name}>{name}</Text>
            <Text value={description} numberOfLines={2}  style={styles.description}>{description}</Text>
            <View  style={{marginRight:5,marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
             <TouchableOpacity  onPress={() => {navigation.navigate('Term',{'termID':id,'origin':'Home'}); }}><Ionicons name='folder-open-outline' size={27} color='#AD40AF' /></TouchableOpacity>
           

            
            {
              !auth.currentUser.isAnonymous?
            !bookmarked.includes(id)?<TouchableOpacity onPress={() => {bookmarkIT(name,description,id); setLoading(true); setScrollPosition(index);}}><Ionicons name='bookmark-outline' size={27} color='#AD40AF' /></TouchableOpacity>
            :<TouchableOpacity onPress={() =>{unbookmarkIT(id); setLoading(true); setScrollPosition(index)}}><Ionicons name='bookmark-sharp' size={27} color='#AD40AF' /></TouchableOpacity>
             :<Text> </Text>  
          }    
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
    return <ActivityIndicator />
  
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
            data={terms}
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
  

export default TermsList;