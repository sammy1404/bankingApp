import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import banks from '@assets/data/banks';
import { useColorScheme } from '@components/useColorScheme'; // Import useColorScheme hook

const BankScreen = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme(); // Get the current color scheme

  const bank = banks.find((p) => p.id.toString() === id);

  if (!bank) {
    return <Text>Bank not found</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: bank?.name }} />
      <View style={styles.header}>
        <Image source={{ uri: bank.image }} style={styles.image} />
        <Text style={[styles.heading, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          {bank.name}
        </Text>
      </View>
      <View style={styles.graph}></View>
      <View>
        <Text style={[styles.stockPrice, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
          Stock price: {bank.price}
          </Text>
      </View>
    </View>
  );
};

export default BankScreen;

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    marginLeft: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  graph: {
    width: 350,
    height: 250,
    backgroundColor: 'gray',
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 10,
  },
  stockPrice: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
