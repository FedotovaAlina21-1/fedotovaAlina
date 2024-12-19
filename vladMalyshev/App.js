import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import lab1 from "./screens/lab1";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Лабораторная 1" component={lab1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}