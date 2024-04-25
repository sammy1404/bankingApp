import { StyleSheet, Image, Pressable } from 'react-native'; 
import { Text, View } from '@components/Themed';
import { Link } from 'expo-router'; // Import Link from expo-router
import { useEffect, useState } from 'react';
import stocks from '@assets/data/stocks';

const CollectionsTab = () => {
  const defaultBankImage = 'https://i.imgur.com/M35zeeb.png';
  const [topLosers, setTopLosers] = useState<any[]>([]);

  const topFiveFunds = () => {
    return topLosers.filter(stock => stocks.some(s => s.symbol === stock.symbol)).slice(0, 10);
  }

  const fiveFundsData = topFiveFunds();

  useEffect(() => {
    const fetchLosers = async () => {
      try {
        const responseData = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=6BhLjX7AIB2kLGWWXM2eBSvYIjUm1SOB`);
        const losers = await responseData.json();
        setTopLosers(losers)
      } catch (error) {
        console.error()
      }
    }
    fetchLosers();
  }, []);

  const findStockLogo = (stockData: any) => {
    if (!stockData || !stockData.symbol) return defaultBankImage;
    const stockSymbol = stockData.symbol;
    const company = stocks.find(stock => stock.symbol === stockSymbol);
    return company?.logoUrl || defaultBankImage;
  };

  const findStockName = (stockData: any) => {
    if (!stockData || !stockData.name) return "Name not Found";
    return stockData.name;
  };

  const findStockSymbol = (stockData: any) => {
    if (!stockData || !stockData.symbol) return "Symbol not Found";
    return stockData.symbol;
  };

  const findStockLoss = (stockData: any) => {
    if (!stockData || !stockData.changesPercentage) return "loss not Found";
    return parseFloat(stockData.changesPercentage.toFixed(2));
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View>
        <Text style={[styles.title, styles.extraMargin]}>Biggest Losses</Text>
      </View>
      {fiveFundsData.map((stockData, index) => (
        <Pressable key={index}>
          <Link href={`/marketPage/${findStockSymbol(stockData)}`}> {/* Link to the marketPage */}
            <View style={styles.stockContainer}>
              <Image source={{ uri: findStockLogo(stockData) }} style={styles.logo} />
              <View style={styles.stockInfo}>
                <Text style={styles.companyName}>{findStockName(stockData)}</Text>
                <Text style={styles.symbol}>{findStockSymbol(stockData)}</Text>
              </View>
              <View style={styles.lossContainer}>
                <Text style={styles.loss}>{findStockLoss(stockData)}% ↓</Text>
              </View>
            </View>
          </Link>
        </Pressable>
      ))}
    </View>
  );
};

export default CollectionsTab;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15
  },
  extraMargin: {
    marginTop: 20
  },
  logo: {
    height: 40,
    width: 40,
    marginTop: 5,
    borderRadius: 5,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    width:"100%"
  },
  stockInfo: {
    flex: 1,
    marginLeft: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  symbol: {
    color: 'gray',
  },
  lossContainer: {
    marginLeft: 'auto', // Pushes the loss text to the right
  },
  loss: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'right'
  },
});
