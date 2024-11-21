import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from "./screens/HomeScreen";
import lab1 from "./screens/lab1";
import lab2 from "./screens/lab2";
import lab3 from "./screens/lab3";
import lab4 from "./screens/lab4";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="lab1" component={lab1} />
          <Stack.Screen name="lab2" component={lab2} />
          <Stack.Screen name="lab3" component={lab3} />
          <Stack.Screen name="lab4" component={lab4} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
