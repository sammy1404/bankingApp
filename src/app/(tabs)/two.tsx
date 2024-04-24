import React from 'react';
import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import stocks from '@assets/data/stocks';
import { Link } from 'expo-router';
import { watchlist } from '@/components/addToWatchlist';
import dashboard from '@/components/dashboard'

const stockNames = stocks;

const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Define colors

export default function TabTwoScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {dashboard()}
        <View style={styles.height}>
          <Text style={styles.title}>Watchlist</Text>
        </View>
        
        {watchlist.map((symbol, index) => {
          const stock = stockNames.find(stock => stock.symbol === symbol);
          const stockName = stock ? stock.name : '';
          const stockImage = stock ? stock.logoUrl : '';

          return (
            <Pressable key={index}>
              <Link href={`/marketPage/${symbol}`}>
                <View style={styles.row}>
                  <Image source={{ uri: stockImage }} style={styles.logo} />
                  <View>
                    <Text style={styles.companyName}>{stockName}</Text>
                    <Text style={styles.symbol}>{symbol}</Text>
                  </View>
                </View>
              </Link>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,

  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  symbol: {
    paddingHorizontal: 20,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'lightgray',
    width:350
  },
  height:{
    height: 500
  }
});
