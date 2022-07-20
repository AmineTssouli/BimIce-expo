import React, { useContext, useState } from "react";
import { TextInput, View, SafeAreaView ,StatusBar} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BookmarksList from '../components/BookmarksList';
import ThemeContext from "../utils/ThemeContext";




const Bookmarks = ({ navigation }) => {
 
  const theme = useContext(ThemeContext);

  const [border, setBorder] = useState('#C6C6C6');
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');



  const updateSearch = (value) => {

    setSearch(value);
    console.log(value);

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundcolor }} >
      <View style={{flex:1,padding:20}}>
      <StatusBar animated ={true} barStyle={theme.barStyle} backgroundColor={theme.backgroundcolor} />
      <View style={{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: border ?? border,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom:20
      }} >
        <Feather name='search' size={22} color='#C6C6C6' style={{ marginRight: 5, marginTop: 3 }} />
        <TextInput placeholderTextColor='gray' placeholder="Type here to search" style={{ flex: 1, padding: 0,color:theme.textcolor}}
          value={search}
          onChangeText={(value) => updateSearch(value)}
          onBlur={() => { setClicked(false); setBorder('#C6C6C6'); }}
          onFocus={() => { setClicked(true); setBorder('#61CE70'); }}
        />
        {clicked &&

          <FontAwesome5 name="times" size={22} color='#AAA' style={{ marginRight: 5, marginTop: 3 }} onPress={() => { setSearch(''); setClicked(false); }} />}

      </View>
      <BookmarksList search={search} navigation={navigation} />
      </View>
    </SafeAreaView>


  );
};

export default Bookmarks;