import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { handleAddToWatchlist } from '@/components/addToWatchlist'; // Import handleAddToWatchlist
import { watchlist } from '@/components/addToWatchlist';
import { G } from 'react-native-svg';



const HeartOutlineIcon = ({ color }: { color: string }) => (
  <Ionicons name="heart-outline" size={24} color={color} />
);

const HeartFilledIcon = ({ color }: { color: string }) => (
  <Ionicons name="heart" size={24} color={color} />
);

const WatchlistButton = (symbol: string) => { // Receive symbol as props

  const [clicked, setClicked] = useState(watchlist.includes(symbol)? true: false);

  const handleButtonClick = () => {
    setClicked(!clicked);
      handleAddToWatchlist(symbol, clicked);
  };

  return (
    <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
      <Text style={styles.buttonText}>Add to Watchlist</Text>
      { !clicked ? <HeartOutlineIcon color="gray" /> : <HeartFilledIcon color={clicked ? '#FF69B4' : 'transparent'} /> }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    marginVertical: 0,
  },
  buttonText: {
    color: '#FF69B4',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default WatchlistButton;
