import React, { useContext, useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet ,StatusBar,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from "../utils/ThemeContext";
import { collection,query,where, getDocs, getDoc,setDoc, doc ,deleteDoc,getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";     



const BookmarksList = ({  search,navigation }) => {

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
        <View  style={[styles.item,{borderColor:theme.section_bordercolor}]} key={id} >
            <Text value={name} numberOfLines={2} style={styles.name}>{name}</Text>
            <Text value={description}  style={styles.description}>{description}</Text>
            <View  style={{marginRight:5,marginTop:20,alignItems:'flex-end'}}>
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
      backgroundColor: '#d3e8d9',
      padding: 15,
      marginVertical: 8,
      borderWidth:1,
      borderRadius:14,
    },
    name: {
      fontSize: 20,
      fontFamily: 'Roboto-Medium',
      marginBottom:15,
      color:'#333'
      
    },
    description :{
      fontSize:16,
      fontFamily: 'Roboto-Regular',
      textAlign:'justify',
      color:'#333'
    }
  });
  

export default BookmarksList;