import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Lab1 from './screens/Lab1';
import Lab2 from './screens/Lab2';
import Lab3 from './screens/Lab3';
import SavedImage from './screens/SavedImage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lab1" component={Lab1} />
        <Stack.Screen name="Lab2" component={Lab2} />
        <Stack.Screen name="Lab3" component={Lab3} />
        <Stack.Screen name="SavedImage" component={SavedImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;