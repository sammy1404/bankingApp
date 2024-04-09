import { Stack } from "expo-router";

export default function menuStack(){
    return <Stack>
        <Stack.Screen name="three" options={{title:'Market'}}/>
    </Stack>
}