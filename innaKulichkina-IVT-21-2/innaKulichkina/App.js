import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ColorAndMoveScreen from './screens/lab1'; 
import CatFactApp from './screens/lab2'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="№1" component={ColorAndMoveScreen} />
        <Tab.Screen name="№2" component={CatFactApp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
