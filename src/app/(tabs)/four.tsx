import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Linking, StyleSheet } from 'react-native';

// Define an interface for the news article
interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

const API_KEY = 'd44a941ba02d4423b1fa37d45960a3bd'; 

const StockMarketNewsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsArticle[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=stock market trends ${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}&pageSize=5`);
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles as NewsArticle[]);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error(error);
      setNews([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchNews();
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search latest Stockmarket News"
      />
      <Button
        title="Search"
        onPress={fetchNews}
        disabled={!searchQuery.trim()}
      />
      <ScrollView style={styles.newsContainer}>
        {news.map((article, index) => (
          <View key={index} style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
            <Button
              title="Read more"
              onPress={() => Linking.openURL(article.url)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set the background color here
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', // Set the background color of the input
  },
  newsContainer: {
    flex: 1,
  },
  articleContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Add border around the news articles
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
});

export default StockMarketNewsSearch;
