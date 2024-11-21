import { Tabs } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
        }}
      >
        <Tabs.Screen
          name="lab1"
          options={{
            title: "Lab1",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="lab-flask" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lab2"
          options={{
            title: "Lab2",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="lab-flask" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lab3"
          options={{
            title: "Lab3",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="lab-flask" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
