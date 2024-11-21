import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
const colors = ["black", "red", "yellow" , "green", "gray", "blue"];

const Lab1 = () => {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]); 

  let getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            const randomNumber = getRandomNumber(6);
            setBackgroundColor(colors[randomNumber]); 
          }}
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "gray" }}>Нажми!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Lab1;
