import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { NavigationContainer } from "@react-navigation/native";
import Lab4_1 from "./screens/lab4_1";
import Lab4_2 from "./screens/lab4_2";
const colors = ["black", "red", "yellow"];

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
        <Tab.Screen name="Lab4_1" component={Lab4_1} />
        <Tab.Screen name="Lab4_2" component={Lab4_2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
