import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lab1 from './screens/lab1';
import Lab2 from './screens/lab2';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Лаб. работа 1" component={Lab1} />
        <Tab.Screen name="Лаб. работа 2" component={Lab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
