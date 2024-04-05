import { ScrollView } from 'react-native'; // Import Image from 'react-native'
import { Text, View,  } from '@components/Themed';
import topFunds from '@components/topFunds';
import collectionsTab from '@components/collectionsTab';


export default function homeScreen() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {topFunds()}
      {collectionsTab()}
      </ScrollView>
    </View>
  );
};
/*
const styles = StyleSheet.create({
});
*/