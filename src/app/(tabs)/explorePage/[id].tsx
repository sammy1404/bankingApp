import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const bank1 = ()=>{
  const {id} = useLocalSearchParams();
  return(
    <View>
      <Text style={{fontSize: 20, color: 'white'}}>id: {id}</Text>
    </View>
  );
}

export default bank1;