import { LineChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Chart = (stockSymbol: string) => {
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>('3 Months');
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [slicedChartData, setSlicedChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchStockData();
  }, [stockSymbol]);

  const fetchStockData = async () => {
    const apiKey = '30KG124OHWAR6T69'; // Replace with your API key

    try {
      const responseData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}`);
      const dataPrice = await responseData.json();

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
      
    }
    catch(error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleButtonPress = (buttonText: string) => {
    setSelectedButton(buttonText);
    if(buttonText === '3 Months'){
      const timePeriod = 3;
      setTimePeriod(timePeriod);
    }
    
    else if(buttonText === '6 Months'){
      const timePeriod = 6
      setTimePeriod(timePeriod)
    }
    else if(buttonText === '12 Months'){
      const timePeriod = 12
      setTimePeriod(timePeriod)
    }
    else{
      const timePeriod = 24
      setTimePeriod(timePeriod)
    }
    const slicedChartData = chartData.slice(0, timePeriod); 
    setSlicedChartData(slicedChartData);
  };

  return (
    <View style={styles.container}>
      <LineChart 
        areaChart
        data={slicedChartData}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={selectedButton === '3 Months' ? styles.selectedButton : styles.button}
          onPress={() => handleButtonPress('3 Months')}
        >
          <Text style={selectedButton === '3 Months' ? styles.buttonMonthSelected : styles.buttonMonth}>3 Months</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedButton === '6 Months' ? styles.selectedButton : styles.button}
          onPress={() => handleButtonPress('6 Months')}
        >
          <Text style={selectedButton === '6 Months' ? styles.buttonMonthSelected : styles.buttonMonth}>6 Months</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedButton === '12 Months' ? styles.selectedButton : styles.button}
          onPress={() => handleButtonPress('12 Months')}
        >
          <Text style={selectedButton === '12 Months' ? styles.buttonMonthSelected : styles.buttonMonth}>12 Months</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedButton === '24 Months' ? styles.selectedButton : styles.button}
          onPress={() => handleButtonPress('24 Months')}
        >
          <Text style={selectedButton === '24 Months' ? styles.buttonMonthSelected : styles.buttonMonth}>24 Months</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 0,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  buttonMonthSelected: {
    color: 'white',
  },
  buttonMonth: {
    color: 'gray',
  }
});

export default Chart;
