import { StyleSheet, Image, ScrollView, ImageBackground, Button, Pressable } from 'react-native'; // Import Image from 'react-native'

import EditScreenInfo from '@components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import banks from '@assets/data/banks';
import { Link } from 'expo-router'


export const defaultBankImage = 'https://i.imgur.com/M35zeeb.png';


const topFunds = () =>{

  return(
    <View>
    <View><Text style={styles.title}>Top Funds</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        <Link href={`/(tabs)/explorePage/${banks[0].id}`}>
        <View style={styles.cardContainer}>
            <Image source={require('../../assets/images/card1.png')} style={styles.card} />
            <Image source={{ uri: banks[0].image || defaultBankImage}} style={styles.logo}/>
            <Text style={styles.bankName}>{banks[0].name}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/(tabs)/explorePage/${banks[1].id}`}>
          <View style={styles.cardContainer}>
            <Image source={require('../../assets/images/card2.png')} style={styles.card} />
            <Image source={{ uri: banks[1].image || defaultBankImage}} style={styles.logo}/>
            <Text style={styles.bankName}>{banks[1].name}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/(tabs)/explorePage/${banks[2].id}`}>
          <View style={styles.cardContainer}>
            <Image source={require('../../assets/images/card3.png')} style={styles.card} />
            <Image source={{ uri: banks[2].image || defaultBankImage}} style={styles.logo}/>
            <Text style={styles.bankName}>{banks[2].name}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/(tabs)/explorePage/${banks[3].id}`}>
          <View style={styles.cardContainer}>
            <Image source={require('../../assets/images/card4.png')} style={styles.card} />
            <Image source={{ uri: banks[3].image || defaultBankImage}} style={styles.logo}/>
            <Text style={styles.bankName}>{banks[3].name}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/(tabs)/explorePage/${banks[4].id}`}>
          <View style={styles.cardContainer}>
            <Image source={require('../../assets/images/card5.png')} style={styles.card} />
            <Image source={{ uri: banks[4].image || defaultBankImage}} style={styles.logo}/>
            <Text style={styles.bankName}>{banks[4].name}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>
        
      </View>
    </ScrollView>

    </View>
  );
};

export default topFunds
const styles = StyleSheet.create({

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15
  },
  banks: {
    marginLeft: 10
  },
  card: {
    width: 225,
    height: 150,
    marginLeft: 10,
    marginTop:10,
    borderRadius:20,
    resizeMode: 'cover',
  },
  row:{
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginTop:10
  },
  extraMargin:{
    marginTop: 20
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName:{

    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    transform: [{translateY: -63}], 
    fontSize: 20,

  },
  infoButton:{
    fontWeight: 'normal',
    position: 'absolute',
    bottom: 5,
    fontSize:10,
    color: 'gray'
  },
  logo:{
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    top: 20,
    left: 20,
    borderRadius:4
  }

});

