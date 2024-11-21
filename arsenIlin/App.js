import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Lab1 from "./layouts/lab1";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
