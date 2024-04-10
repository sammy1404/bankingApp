import { LineChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Chart = (stockSymbol: string) => {
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  console.log(stockSymbol);

  useEffect(() => {
    fetchStockData();
  }, [stockSymbol]);


  const fetchStockData = async () => {
    const apiKey = '30KG124OHWAR6T69'; // Replace with your API key

    try {
      const responseData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}`);
      const dataPrice = await responseData.json();

      console.log(dataPrice);
      const weeklyData = dataPrice['Weekly Adjusted Time Series'];

      const formattedData = Object.keys(weeklyData).map(date => ({
        date,
        close: weeklyData[date]['4. close']
      }));
      setFormattedData(formattedData);

      const chartData = formattedData.map(dataPoint => ({
        label: dataPoint.date, // Date on the x-axis
        value: parseFloat(dataPoint.close) // Close value on the y-axis (converted to float)
      }));
      
      setChartData(chartData);

      console.log(chartData)
    }
    catch(error) {
      console.error('Error fetching stock data:', error);
    }
  };
  return (
    <View style={styles.container}>
      <LineChart 
        areaChart1
        hideDataPoints
        isAnimated
        animationDuration={1200}
        startFillColor="#0BA5A4"
        startOpacity={1}
        endOpacity={0.3}
        initialSpacing={0}
        data={formattedData}
        spacing={30}
        thickness={5}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
    </View>
  );
}  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Chart;
