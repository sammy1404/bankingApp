
const fetchStockData = async (stockSymbol: string) => {
    const apiKey = '30KG124OHWAR6T69'; // Your API key
  
    try {
      const responseData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}`);
      const dataPrice = await responseData.json();
  
      const weeklyData = dataPrice['Weekly Adjusted Time Series'];
  
      const formattedData = Object.keys(weeklyData).slice(0,6).map(date => ({
        date,
        close: weeklyData[date]['4. close']
      }));
  
      const chartData = formattedData.map(dataPoint => ({
        label: dataPoint.date, // Date on the x-axis
        value: parseFloat(dataPoint.close) // Close value on the y-axis (converted to float)
      }));
      console.log(chartData)
  
      return chartData;
    }
    catch(error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  };
  
  export default fetchStockData;
  