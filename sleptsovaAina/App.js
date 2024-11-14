import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/l1";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}