import { StyleSheet, Image, ScrollView, ImageBackground, Button, Pressable } from 'react-native'; // Import Image from 'react-native'

import EditScreenInfo from '@components/EditScreenInfo';
import { Text, View } from '@components/Themed';



const collectionsTab =() =>{
    return(
      <View style={styles.length}>
      <View><Text style={[styles.title, styles.extraMargin]}>Collections</Text></View>
      <View>
        <View style={[styles.row, styles.squareSpacing]}>
          <View style={styles.square}></View>
          <View style={styles.square}></View>
        </View>
        <View style={[styles.row, styles.squareSpacing]}>
          <View style={styles.square}></View>
          <View style={styles.square}></View>
        </View>
      </View>
    </View>
    );
  };
  export default collectionsTab

  const styles = StyleSheet.create({

    title: {
      fontSize: 35,
      fontWeight: 'bold',
      marginLeft: 20,
      marginTop: 15
    },
    row:{
      flexDirection: 'row',
      marginRight: 10
    },
    extraMargin:{
      marginTop: 20
    },
    square: {
      width: 181, 
      height: 125,
      backgroundColor: 'gray', 
      borderColor: 'black',
      borderRadius:10,
      marginRight:10
    },
    squareSpacing:{
      marginTop: 10,
      marginLeft: 10,
  
    },
    length:{
      flex:1,
      height: 450
    }
  });
  