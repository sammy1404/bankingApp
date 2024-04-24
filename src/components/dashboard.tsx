import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import banks from '@assets/data/banks';
import { LineChart } from "react-native-gifted-charts";
import { watchlist } from '@components/addToWatchlist';
import RNPickerSelect from 'react-native-picker-select';
import fetchStockData from '@components/profileGraph'; // Import the function

const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Define colors

export default function TabTwoScreen() {
  const [selectedWatchlistItems, setSelectedWatchlistItems] = useState<string[]>([watchlist[0], watchlist[1], watchlist[2], watchlist[3], watchlist[4]]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [showNoStocksMessage, setShowNoStocksMessage] = useState<boolean>(false); // Flag to track if no stocks are available

  useEffect(() => {
    const fetchData = async () => {
      const newData = await Promise.all(selectedWatchlistItems.map(fetchStockData));
      setStockData(newData);
    };

    fetchData();
  }, [selectedWatchlistItems]);

  const handleWatchlistItemChange = async (index: number, value: string) => {
    const updatedItems = [...selectedWatchlistItems];
    updatedItems[index] = value;
    setSelectedWatchlistItems(updatedItems);
  };

  useEffect(() => {
    // Check if any stock data is available
    const hasStocks = stockData.some(stock => stock.length > 0);
    setShowNoStocksMessage(!hasStocks); // Show message if no stocks are available
  }, [stockData]);

  return (
    <View>
      <Text style={styles.title}>Dashboard</Text>
      {stockData.map((stock, index) => (
        <View key={index} style={styles.square}>
          {stock.length > 0 ? (
            <>
              <LineChart
                areaChart
                hideDataPoints
                xAxisLabelsVerticalShift={20}
                rotateLabel
                data={stock}
                color={bulletColors[index % bulletColors.length]}
              />
              <Text>{selectedWatchlistItems[index]}</Text>
            </>
          ) : null}
        </View>
      ))}
      {showNoStocksMessage && (
        <View>
          <Text style={styles.caption}>Add more stocks to your watchlist for them to appear here!</Text>
        </View>
      )}
      <View style={styles.bankName}>
        <Text style={styles.subTitle}>Select watchlisted stocks</Text>
        {banks.map((stock, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.bullet, { backgroundColor: bulletColors[index % bulletColors.length] }]} />
            <RNPickerSelect
              onValueChange={(value) => handleWatchlistItemChange(index, value)}
              items={watchlist.map((item) => ({ label: item, value: item }))}
              value={selectedWatchlistItems[index]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
  },
  square: {
    width: 350,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  bankName: {
    marginTop: 30,
    marginLeft: 30,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  subTitle:{
    fontSize: 20,
    fontWeight: 'bold', 
    marginBottom: 10
  },
  caption:{
    fontSize: 15,
    fontWeight: '600', 
    marginHorizontal: 30,
    textAlign: 'center',
    color: 'gray'
  }
});
