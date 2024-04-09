import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useColorScheme } from '@components/useColorScheme'; 
import stocks from '@assets/data/stocks';
import WatchlistButton from '@/components/watchlist';



const API_KEY = '30KG124OHWAR6T69';



const StockScreen = () => {
  const { symbol } = useLocalSearchParams();
  const stockSymbol = symbol.toString();
  const colorScheme = useColorScheme();
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const responsePrice = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`);
      const dataPrice = await responsePrice.json();

      if (dataPrice['Global Quote']) {
        const newPrice = parseFloat(dataPrice['Global Quote']['05. price']).toFixed(2);
        setPrice(newPrice);
      } else {
        setPrice(null);
      }
    } catch (error) {
      console.error(error);
      setPrice(null); // Reset price to null in case of error
    }
  };

  const stock = stocks.find(stock => stock.symbol === stockSymbol);
  
  return (
    <View>
      <Stack.Screen options={{ title: stockSymbol }} />
      <View style={styles.header}>
        <Image source={{ uri: stock?.logoUrl}} style={styles.image} />
        <Text style={[styles.heading, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          {stock?.name}
        </Text> 
      </View>
      <Text style={[styles.stockPrice, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          {price !== null ? `Stock price: $${price}` : ''}
        </Text>
      <View style={styles.graph}></View>
      <View>
      {WatchlistButton()}
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    marginLeft: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  graph: {
    width: 350,
    height: 250,
    backgroundColor: 'gray',
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 10,
    marginBottom:10
    },
  stockPrice: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default StockScreen;
