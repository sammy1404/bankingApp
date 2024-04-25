import { StyleSheet, Image, ScrollView, ImageBackground, Button, Pressable } from 'react-native'; // Import Image from 'react-native'

import EditScreenInfo from '@components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import banks from '@assets/data/banks';
import { Link } from 'expo-router'
import { useEffect, useState } from 'react';
import stocks from '@assets/data/stocks';

const defaultBankImage = 'https://i.imgur.com/M35zeeb.png';

export default function TopFunds() {
  const [topFunds, setTopFunds] = useState<any[]>([]); 
  const [fiveFunds, setFiveFunds] = useState<any[]>([]);


  const topFiveFunds = ()=>{
    
    return fiveFunds.filter(stock => stocks.some(s => s.symbol === stock.symbol)).slice(0, 5);
  }

  


  // Declare fiveFunds as a global variable
  const fiveFundsData = topFiveFunds();


  useEffect(() => {
    const fetchTopFunds = async () => {
      try {
        const responseData = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=6BhLjX7AIB2kLGWWXM2eBSvYIjUm1SOB`);
        const funds = await responseData.json();
        setFiveFunds(funds);
        setTopFunds(funds); // Setting all funds in topFunds
      } catch (error) {
        console.log("error in top funds " + error);
      }
    };

    fetchTopFunds(); 
  }, []); 

  const findStockLogo = (stockData: any) => {
    if (!stockData || !stockData.symbol) return defaultBankImage;
    const stockSymbol = stockData.symbol;
    const company = stocks.find(stock => stock.symbol === stockSymbol);
    return company?.logoUrl || defaultBankImage;
  };

  const returnStockName = (stockData: any) =>{
    if(!stockData || !stockData.symbol) return "Stock not Found"
    return stockData.symbol;
  }
  

  return(
    <View>
    <View><Text style={styles.title}>Top Funds</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
      <Link href={`/marketPage/${returnStockName(fiveFundsData[0])}`}>
        <View style={styles.cardContainer}>
            <Image source={require('@assets/images/card1.png')} style={styles.card} />
            <Image source={{ uri: findStockLogo(fiveFundsData[0]) }} style={styles.logo}/>
            <Text style={styles.bankName}>{returnStockName(fiveFundsData[0])}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/marketPage/${returnStockName(fiveFundsData[1])}`}>
          <View style={styles.cardContainer}>
            <Image source={require('@assets/images/card2.png')} style={styles.card} />
            <Image source={{ uri: findStockLogo(fiveFundsData[1]) }} style={styles.logo}/>
            <Text style={styles.bankName}>{returnStockName(fiveFundsData[1])}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/marketPage/${returnStockName(fiveFundsData[2])}`}>
          <View style={styles.cardContainer}>
            <Image source={require('@assets/images/card3.png')} style={styles.card} />
            <Image source={{ uri: findStockLogo(fiveFundsData[2]) }} style={styles.logo}/>
            <Text style={styles.bankName}>{returnStockName(fiveFundsData[2])}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/marketPage/${returnStockName(fiveFundsData[3])}`}>
          <View style={styles.cardContainer}>
            <Image source={require('@assets/images/card4.png')} style={styles.card} />
            <Image source={{ uri: findStockLogo(fiveFundsData[3]) }} style={styles.logo}/>
            <Text style={styles.bankName}>{returnStockName(fiveFundsData[3])}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>

        <Link href={`/marketPage/${returnStockName(fiveFundsData[4])}`}>
          <View style={styles.cardContainer}>
            <Image source={require('@assets/images/card5.png')} style={styles.card} />
            <Image source={{ uri: findStockLogo(fiveFundsData[4]) }} style={styles.logo}/>
            <Text style={styles.bankName}>{returnStockName(fiveFundsData[4])}</Text>
            <Text style={styles.infoButton}>(click for info)</Text>
          </View>
        </Link>
        
      </View>
    </ScrollView>

    </View>
  );
};

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




//<Link href={`/marketPage/${symbol}`}>