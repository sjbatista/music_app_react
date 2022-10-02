import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { cloneElement, useState } from 'react';
import {AntDesign} from '@expo/vector-icons';

export default function App() {
  
const [audio, setAudio] = useState(null); 

const [musics, setMusics] = useState([

  {
    playing : true,
    music : 'Pulse',
    artist : 'Icon for Hire',
    file: ''

  },

  {
    playing : false,
    music : 'Ohota na lisitsu',
    artist : 'Green Apelsin',
    file: ''
    
  },

  {
    playing : false,
    music : 'chaildfri',
    artist : ' Noize MC · Monetochka',
    file: ''
    
  }


]);

const changeMusic = (id) =>{
 
  let newMusics = musics.filter((val,k)=>{
    if(id == k){
      musics[k].playing = true;
    }
    else{
      musics[k].playing = false;
    }

    return musics[k];
    }
  )

  setMusics(newMusics);
}

return (

<ScrollView style={styles.container}>
<StatusBar hidden/>

<View style={styles.header}>
  <Text style={styles.textTitle}>Music App !</Text>
</View>

<View style={styles.table}>

  <Text style={styles.textTable}>Music</Text>
  <Text style={styles.textTable}>Artist</Text>

</View>

{
  musics.map((val,k)=>{
    if(val.playing){
      return(
        <View>
          <TouchableOpacity onPress={()=>changeMusic(k)} style={styles.table}>
            <Text style={styles.textTablePlaying}><AntDesign name="play" size={17} color="#1D8954"/>{val.music}</Text>
            <Text style={styles.textTablePlaying}>{val.artist}</Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View>
          <TouchableOpacity onPress={()=>changeMusic(k)} style={styles.table}>
            <Text style={styles.textTable}>{val.music}</Text>
            <Text style={styles.textTable}>{val.artist}</Text>
          </TouchableOpacity>
        </View>
      );
    } 
  })
}

</ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },

  textTitle: {
    fontSize:24,
    color: 'white',
    textAlign:'center'
  },

  header: {
    backgroundColor:'#1D8954',
    width:'100%',
    padding:20
  },

  table: {
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:0.5,
    width:'100%'

  },

  textTable: {
    color:'rgb(200,200,200)',
    width:'50%',
    textAlign:'left'
  },

  textTablePlaying: {
    color:'rgb(200,200,200)',
    width:'50%',
    textAlign:'left',
    color:'#1D8954',
    
  }

});
