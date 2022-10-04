import { ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function Player(props) {

    LogBox.ignoreAllLogs(true);

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

            <TouchableOpacity style={{marginLeft:20, marginRight:20}}>
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
            
            <TouchableOpacity style={{marginLeft:20, marginRight:20}}>
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