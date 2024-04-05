import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import banks from '@assets/data/banks';

const bankNames = banks;

const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Define colors

export default function TabTwoScreen() {
  return (
    <View>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.square}></View>
      <View style={styles.bankName}>
        {bankNames.map((bank, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.bullet, { backgroundColor: bulletColors[index % bulletColors.length] }]} />
            <Text style={styles.banks}>{bank.name}</Text>
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
    backgroundColor: 'gray',
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
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
