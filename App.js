import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { cloneElement, useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player';

export default function App() {

LogBox.ignoreAllLogs(true);

const [audioIndex,setAudioIndex] = useState(0);

const [playing, setPlaying] = useState(false);
  
const [audio, setAudio] = useState(null); 

const [musics, setMusics] = useState([

  {
    playing : false,
    music : 'Pulse',
    artist : 'Icon for Hire',
    file: require('./songs/pulse.icon_for_hire.mp3')

  },

  {
    playing : false,
    music : 'Ohota na lisitsu',
    artist : 'Green Apelsin',
    file: require('./songs/ohota_na_lisitsu.green_apelsin.mp3') 
    
  },

  {
    playing : false,
    music : 'chaildfri',
    artist : ' Noize MC · Monetochka',
    file: require('./songs/chaildfri.noize_mc_monetochka.mp3') 
    
  },

  {
    playing : false,
    music : 'SoundHelix Test 1',
    artist : 'SoundHelix',
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
    
  }
]);

const changeMusic = async (id) =>{
 
  let curFile = null;

  let newMusics = musics.filter((val,k)=>{
    if(id == k){
      musics[k].playing = true;
      curFile=musics[k].file;
      setAudioIndex(id);
    }
    else{
      musics[k].playing = false;
    }

    return musics[k];
    }
  )

  if(audio!= null){
    audio.unloadAsync();
  }

  let curAudio = new Audio.Sound();
 
  try{
    await curAudio.loadAsync(curFile);
    await curAudio.playAsync();
  }catch(error){}

  setAudio(curAudio);

  setMusics(newMusics);

  setPlaying(true);
}

return (
<View style={{flex:1}}>
<StatusBar hidden/>

<ScrollView style={styles.container}>

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
<Player playing={playing} setPlaying={setPlaying} setAudioIndex={setAudioIndex} audioIndex={audioIndex} musics={musics} setMusics={setMusics} audio={audio} setAudio={setAudio}>
</Player>
</View>
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
