import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import banks from '@assets/data/banks';
import dashboard from '@components/dashboard'

const bankNames = banks;

const bulletColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Define colors

export default function TabTwoScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {dashboard()}
        <Text style ={styles.title}>Hot off the Press</Text>
        <View style={styles.square}></View>
        <View style={styles.square}></View>
        <View style={styles.square}></View>
        <View style={[styles.square, { marginBottom: 25 }]}></View>

      </View>
    </ScrollView>   
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
});