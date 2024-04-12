import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import banks from '@assets/data/banks';
import { LineChart } from "react-native-gifted-charts";
import { watchlist } from '@components/addToWatchlist';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';

const bankNames = banks;

const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Define colors

export default function TabTwoScreen() {
  const [selectedWatchlistItems, setSelectedWatchlistItems] = useState<string[]>([watchlist[0], watchlist[1], watchlist[2], watchlist[3], watchlist[4]]);

  const testData = [
    { label: '2024-04-01', value: 10 },
    { label: '2024-04-02', value: 23 },
    { label: '2024-04-03', value: 34 },
    { label: '2024-04-04', value: 30 }
  ];
  const testData2 = [
    { label: '2024-04-01', value: 3 },
    { label: '2024-04-02', value: 42 },
    { label: '2024-04-03', value: 21 },
    { label: '2024-04-04', value: 23 }
  ];
  const testData3 = [
    { label: '2024-04-01', value: 3 },
    { label: '2024-04-02', value: 42 },
    { label: '2024-04-03', value: 21 },
    { label: '2024-04-04', value: 23 }
  ];
  const testData4 = [
    { label: '2024-04-01', value: 3 },
    { label: '2024-04-02', value: 42 },
    { label: '2024-04-03', value: 21 },
    { label: '2024-04-04', value: 23 }
  ];
  const testData5 = [
    { label: '2024-04-01', value: 3 },
    { label: '2024-04-02', value: 42 },
    { label: '2024-04-03', value: 21 },
    { label: '2024-04-04', value: 23 }
  ];

  const handleWatchlistItemChange = (index: number, value: string) => {
    const updatedItems = [...selectedWatchlistItems];
    updatedItems[index] = value;
    setSelectedWatchlistItems(updatedItems);
  };

  return (
    <View>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.square}>
        <LineChart
          areaChart
          hideDataPoints
          xAxisLabelsVerticalShift={20}
          rotateLabel
          data={testData}
          data2={testData2}
          startOpacity1={0}
          endOpacity1={0}
          color1='#FF0000'
          startOpacity2={0}
          endOpacity2={0}
          color2='#00FF00'
        />
      </View>
      <View style={styles.bankName}>
        <Text style={styles.subTitle}>Select watchlisted stocks</Text>
        {bankNames.map((stock, index) => (
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
    height: 250,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  bankName: {
    marginTop: 30,
    marginLeft: 30,
  },
  banks: {
    marginBottom: 10,
    fontSize: 16,
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
  }
});
