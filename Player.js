import { ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {

    LogBox.ignoreAllLogs(true);

    const handleBack = async() => {
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0){
            newIndex = props.musics.length - 1;
        }
        props.setAudioIndex(newIndex);

        let curFile = props.musics[newIndex].file;
        //Atualizar interface do app.
        let newMusics = props.musics.filter((val,k)=>{
            if(newIndex == k){
                props.musics[k].playing = true;
               
                curFile = props.musics[k].file;
                
            }
            else{
                props.musics[k].playing = false;
            }

            return props.musics[k];
      })

        //Reproduzir audio em questao.
        if(props.audio != null){
            props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
           await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
        }catch(error){}

        props.setrAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true);


    

     }


        

    const handleNext = async()=>{
        let newIndex = props.audioIndex +1;
        if(newIndex >= props.musics.length){
            newIndex = 0;
        }

        props.setAudioIndex(newIndex);

        let curFile = props.musics[newIndex].file;

        //Update App interface
        let newMusics = props.musics.filter((val,k)=>{
            if(k == newIndex){
              props.musics[k].playing = true;
              curFile = props.musics[k].file;
            }
            else{
              props.musics[k].playing = false;
            }
        
            return props.musics[k];
            })
 

        if(props.audio != null){
            props.audio.unloadAsync();
        }

        let curAudio = new Audio.Sound();
            try{
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error){}

        props.setAudio(curAudio);
        props.setMusics(newMusics);
        props.setPlaying(true);

    }

    const handlePlay = async()=>{

        let curFile = props.musics[props.audioIndex].file;

        let newMusics = props.musics.filter((val,k)=>{
            if(props.audioIndex == k){
              props.musics[k].playing = true;
              curFile = props.musics[k].file;
            }
            else{
              props.musics[k].playing = false;
            }
        
            return props.musics[k];
            });


            try{
                if(props.audio != null){
                    props.setPlaying(true);
                    props.setMusics(newMusics);
                    await props.audio.playAsync();
                }else{
                        let curAudio = new Audio.Sound();
                        try{
                            await curAudio.loadAsync(curFile);
                            await curAudio.playAsync();
                        }catch(error){}

                        props.setPlaying(true);
                        props.setMusics(newMusics);
                        props.setAudio(curAudio);
                      }


            }catch(error){}

    }

    const handlePause = async()=>{
        if(props.audio!= null){
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    return(
        <View style={styles.playerLayout}>

            <TouchableOpacity onPress={()=>handleBack()} style={{marginLeft:20, marginRight:20}}>
                <AntDesign name="banckward" size={25} color="white"/>
            </TouchableOpacity>

            {

            (!props.playing)?
             <TouchableOpacity onPress={()=>handlePlay()} style={{marginLeft:20, marginRight:20}}>
             <AntDesign name="playcircleo" size={45} color="white"/>
             </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>handlePause()} style={{marginLeft:20, marginRight:20}}>
             <AntDesign name="pausecircleo" size={45} color="white"/>
             </TouchableOpacity>

            }
            
            <TouchableOpacity onPress={()=>handleNext()} style={{marginLeft:20, marginRight:20}}>
                <AntDesign name="forward" size={25} color="white"/>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    playerLayout: {
        width:'100%',
        height:100,
        backgroundColor:'#111',
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:240,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'


    }

});