import { StyleSheet, Image, ScrollView, ImageBackground } from 'react-native'; // Import Image from 'react-native'

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import banks from '../../../assets/data/banks';

const bank = banks[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
        <View><Text style={styles.title}>Top Funds</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.cardContainer}>
              <Image source={require('../../../assets/images/card1.png')} style={styles.card} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>

            <View style={styles.cardContainer}>
              <Image source={require('../../../assets/images/card2.png')} style={styles.card} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>

            <View style={styles.cardContainer}>
              <Image source={require('../../../assets/images/card3.png')} style={styles.card} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>

            <View style={styles.cardContainer}>
              <Image source={require('../../../assets/images/card4.png')} style={styles.card} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>

            <View style={styles.cardContainer}>
              <Image source={require('../../../assets/images/card5.png')} style={styles.card} />
              <Text style={styles.bankName}>{bank.name}</Text>
            </View>
            
          </View>
        </ScrollView>
        </View>
        
        <View>
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
        
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
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
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName:{

    fontWeight: 'bold',
    position: 'absolute',
    bottom: 63
  }

});
