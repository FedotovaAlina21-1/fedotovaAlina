import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
const colors = ["black", "red", "blue"];

const Lab1 = () => {
  const [colorIndex, setColorIndex] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: 100,
            height: 100,
            borderRadius: 120,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % 3);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 120,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Press me!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default Lab1;