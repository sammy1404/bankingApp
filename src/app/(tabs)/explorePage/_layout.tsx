import { Stack } from 'expo-router';


export default function Menustack(){
    return <Stack>
        <Stack.Screen name='index' options={{title: 'Explore'}}/>
    </Stack>
}