import { useState } from "react";
import { Text } from "react-native";
import Lab1 from "./lab1";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeWrapper } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Лаба 1" component={Lab1} />
      <Tab.Screen name="Лаба 2" component={Lab2} />
      <Tab.Screen name="Лаба 3" component={Lab3} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginBottom: 30,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 100,
  },
  counter: {
    fontSize: 30,
    marginTop: 20,
  },
});
