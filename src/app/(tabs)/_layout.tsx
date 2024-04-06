import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@components/useColorScheme';
import { useClientOnlyValue } from '@components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size: number;
  focused: boolean; // Added focused prop
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >

      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name="explorePage"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="safari" size={20} color={focused ? '#007AFF' : 'gray'} focused={focused} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={20}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="line-chart" size={23} color={focused ? '#34C759' : 'gray'} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" size={23} color={focused ? '#5856D6' : 'gray'} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="four"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="newspaper-o" size={23} color={focused ? color : 'gray'} focused={focused} />
          ),
        }}
      />

    </Tabs>

  );
}
