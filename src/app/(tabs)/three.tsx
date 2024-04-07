import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, useColorScheme } from 'react-native';

const API_KEY = '30KG124OHWAR6T69';
const apiKeyName = '6BhLjX7AIB2kLGWWXM2eBSvYIjUm1SOB';

const StockSearchPage = () => {
  const colorScheme = useColorScheme();
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const handleSymbolChange = (text: string) => {
    setSymbol(text.toUpperCase());
  };

  const fetchStockData = async () => {
    setLoading(true);

    try {
      // Get stock price
      const responsePrice = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
      const dataPrice = await responsePrice.json();

      if (dataPrice['Global Quote']) {
        const newPrice = parseFloat(dataPrice['Global Quote']['05. price']).toFixed(2);
        setPrice(newPrice);
      } else {
        setPrice(null);
      }

      // Get company name
      const responseCompanyName = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${symbol}&apikey=${apiKeyName}`);
      const dataCompanyName = await responseCompanyName.json();
      if (dataCompanyName && dataCompanyName.length > 0) {
        const companyName = dataCompanyName[0].name;
        setCompanyName(companyName);
      } else {
        setCompanyName('');
      }

      // Set logo URL
      const logoUrl = `https://financialmodelingprep.com/image-stock/${symbol}.png`;
      setLogoUrl(logoUrl);
    } catch (error) {
      console.error(error);
      setPrice(null);
      setCompanyName('');
      setLogoUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Enter Stock Symbol:</Text>
        <TextInput
          style={[styles.input, { color: colorScheme === 'dark' ? 'white' : 'black' }]}
          value={symbol}
          onChangeText={handleSymbolChange}
          placeholder="e.g., AAPL"
          placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Button
          title="Search"
          onPress={fetchStockData}
          disabled={loading || symbol.trim() === ''}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </View>
      {loading && <Text style={[styles.loading, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Loading...</Text>}
      {price && (
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
            Current Price of {symbol}: ${price}
          </Text>
          {logoUrl && (
            <Image
              source={{ uri: logoUrl }}
              style={styles.logo}
            />
          )}
        </View>
      )}
      {companyName && (
        <Text style={[styles.companyName, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          Company: {companyName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
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
    backgroundColor: 'rgba(220, 220, 220, 0.7)'
  },
  loading: {
    fontSize: 18,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 0,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StockSearchPage;
