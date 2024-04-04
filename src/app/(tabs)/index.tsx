import { StyleSheet, Image, ScrollView, ImageBackground, Button, Pressable } from 'react-native'; // Import Image from 'react-native'
import { Text, View } from '@/src/components/Themed';
import topFunds from '../../components/topFunds';
import collectionsTab from '../../components/collectionsTab';


export default function homeScreen() {
  return (
    <View>
      {topFunds()}
      {collectionsTab()}
    </View>
  );
};

const styles = StyleSheet.create({
});
