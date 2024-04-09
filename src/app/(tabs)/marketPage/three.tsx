import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, useColorScheme, SafeAreaView, TouchableWithoutFeedback, FlatList, Pressable, Keyboard } from 'react-native';
import stockNames from '@assets/data/stocks'
import { Link } from 'expo-router';

const API_KEY = '30KG124OHWAR6T69';
const apiKeyName = '6BhLjX7AIB2kLGWWXM2eBSvYIjUm1SOB';

const StockSearchPage = () => {
  const colorScheme = useColorScheme();
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [autoComplete, setAutoComplete] = useState<string[]>([]);

  const fetchStockData = async () => {
    setLoading(true);

    try {
      const responsePrice = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
      const dataPrice = await responsePrice.json();

      if (dataPrice['Global Quote']) {
        const newPrice = parseFloat(dataPrice['Global Quote']['05. price']).toFixed(2);
        setPrice(newPrice);
      } else {
        setPrice(null);
      }
    } catch (error) {
      console.error(error);
      setPrice(null);
      setCompanyName('');
      setLogoUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const onChangeText = (text: string) => {
    const uppercaseText = text.toUpperCase();
    setSymbol(uppercaseText);
     

    const filteredStocks = stockNames.filter(stock => stock.symbol.startsWith(uppercaseText));
    setAutoComplete(filteredStocks.map(stock => stock.symbol));
  };

  const onSelectStock = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    fetchStockData();
    setAutoComplete([selectedSymbol]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Enter Stock Symbol:</Text>
          <TextInput
            style={[styles.input, { color: colorScheme === 'dark' ? 'white' : 'black' }]}
            value={symbol}
            onChangeText={onChangeText}
            onSubmitEditing={fetchStockData}
            placeholder="e.g., AAPL"
            placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </View>

        <FlatList
            data={autoComplete}
            renderItem={({ item }) => {
              const stock = stockNames.find(stock => stock.symbol === item);
              const stockName = stock ? stock.name : ''; 
              const stockImage = stock? stock.logoUrl : '';
              
              return (
                <Pressable onPress={() => onSelectStock(item)}>
                  <Link href={`/marketPage/${item}`}>
                    <View style={styles.row}>
                    <Image source={{ uri: stockImage }} style={styles.logo} />
                    <View>
                      <Text style={[styles.companyName, { color: colorScheme === 'dark' ? 'white' : 'black'}]}>{stockName}</Text>
                      <Text style={[styles.autoCompleteItem, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{item}</Text>
                    </View>
                    </View>
                  </Link>
                  
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
        />

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 10,
    marginLeft: 10
  },
  label: {
    marginTop: 15,
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'rgba(220, 220, 220, 0.7)'
  },
  autoCompleteItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  companyName:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 0,
    paddingHorizontal: 20,

  },
  row:{
    flexDirection: 'row'
  }
});

export default StockSearchPage;
