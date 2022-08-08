import React, { useContext, useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet ,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from "../utils/ThemeContext";
import { collection,query,where, getDocs, doc ,deleteDoc,getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";    
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular_Italic
} from '@expo-google-fonts/roboto';




const BookmarksList = ({  search,navigation }) => {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular_Italic

  });
    const theme = useContext(ThemeContext);
    
    const [bookmarks,setBookmarks] = useState([]);
    const [loading,setLoading] = useState(true);
  

    useEffect(() => { 
      getbookmarks();
      navigation.addListener('focus', () => {  setLoading(!loading) });
},[navigation,loading]);  
    

    const getbookmarks =  async () => {
      const bookMarkedterms = [];
     
      const db = getFirestore();
      const auth = getAuth();
      const q = query(collection(db, "Bookmarks"), where("userID", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
        const {name,description,userID,termID} = doc.data();
        bookMarkedterms.push( {
           name: name,
           description:description,
           userID: userID,
           id:termID
    
       });
       console.log("from bookmarkedList",bookMarkedterms);

    
        setBookmarks([]);
        setBookmarks(bookMarkedterms);
        if (loading) setLoading(false);
        
     
       }).catch(e =>console.log(e))
        
      }else {
        setBookmarks([]);
        setBookmarks(bookMarkedterms);
        if (loading) setLoading(false);

      }
     
       
    
    
    } 
    

    const unbookmarkIT = async (docToDelete) => {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "Bookmarks", docToDelete))
        .then(() => {
          if(loading){
            setLoading(false);
          } 
          
          });


        
        console.log('Doc ID',docToDelete);
          
            
    }
    catch(e) {
    console.log(e);
    
    }

    }


    const Item = ({id, name, description}) => {
      

      return (
        <View  style={[styles.item,{borderColor:theme.section_bordercolor,backgroundColor:theme.section_backgroundcolor}]} key={id} >
            <Text value={name} numberOfLines={2} style={styles.name}>{name}</Text>
            <Text value={description}  numberOfLines={2}  style={styles.description}>{description}</Text>
            <View  style={{marginRight:5,marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity  onPress={() => {navigation.navigate('Term',{'termID':id,'origin':'Bookmarks'}); }}><Ionicons name='folder-open-outline' size={27} color='#AD40AF' /></TouchableOpacity>
            <TouchableOpacity onPress={() =>{unbookmarkIT(id);  setLoading(!loading);}}><Ionicons name='bookmark-sharp' size={27} color='#AD40AF' /></TouchableOpacity>
        
                  
            </View>
        </View>
      );
    }
    

   

    const RenderItem = ({ item }) => {

      if(search === "" || item.name.toString().toUpperCase().includes(search.toString().toUpperCase()))

      {

        return <Item  id={item.id} name={item.name} description={item.description}  />;
     
      }
 
    };

    const NotFound = () => {
      return (
     <View style={{marginTop:20}}>
      <Text  style={{color:theme.textcolor}}>Sorry, you don't have any bookmark at the moment.</Text>
     </View>
      )
    };

 
      return (
        
        
          <FlatList
           
            data={bookmarks}
            renderItem={RenderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent ={NotFound}
    
          />
          
       
      );
}
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


export default BookmarksList;