import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Linking, StyleSheet, useColorScheme } from 'react-native';

const API_KEY = '30KG124OHWAR6T69';

const StockSearchPage = () => {
  const colorScheme = useColorScheme();
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  const handleSymbolChange = (text: string) => {
    setSymbol(text.toUpperCase());
  };

  const handleRefreshPress = async () => {
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

      // Get stock news
      const responseNews = await fetch(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=d44a941ba02d4423b1fa37d45960a3bd`);
      const dataNews = await responseNews.json();

      if (dataNews.articles) {
        setNews(dataNews.articles.slice(0, 5)); // Limit to 5 articles
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error(error);
      setPrice(null);
      setNews([]);
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
          onPress={handleRefreshPress}
          disabled={loading || symbol.trim() === ''}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </View>
      {loading && <Text style={[styles.loading, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Loading...</Text>}
      {price && (
        <Text style={[styles.price, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          Current Price of {symbol}: ${price}
        </Text>
      )}
      {news.length > 0 ? (
        <ScrollView style={styles.newsContainer} showsVerticalScrollIndicator={false}>
          {news.map((article, index) => (
            <View key={index} style={[styles.articleContainer, { borderColor: colorScheme === 'dark' ? 'white' : 'black' }]}>
              <Text style={[styles.articleTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{article.title}</Text>
              <Text style={[styles.articleDescription, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{article.description}</Text>
              <Button
                title="Read more"
                onPress={() => Linking.openURL(article.url)}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={[styles.noNews, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>No news available for {symbol}</Text>
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
  price: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  newsContainer: {
    flex: 1,
  },
  articleContainer: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  noNews: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StockSearchPage;


// d44a941ba02d4423b1fa37d45960a3bd
// 30KG124OHWAR6T69
