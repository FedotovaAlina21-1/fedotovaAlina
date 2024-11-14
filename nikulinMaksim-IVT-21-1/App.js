import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1.js";
import Lab2 from "./screens/lab2.js";
import Lab3 from "./screens/lab3.js";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}