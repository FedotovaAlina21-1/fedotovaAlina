import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  
  const colors = ["black", "red", "blue", "green", "yellow", "purple","pink"];
  const colorsText = [
    "Цвет квадрата черный",
    "Цвет квадрата красный",
    "Цвет квадрата синий",
    "Цвет квадрата зелёный",
    "Цвет квадрата жёлтый",
    "Цвет квадрата фиолетовый",
    "Цвет квадрата розовый"
  ];
  export default function HomeScreen() {
    const [colorIndex, setColorIndex] = useState(0);
    const [colorChangeCount, setColorChangeCount] = useState(0); 
    const [displayText, setDisplayText] = useState(colorsText[0]); 
    return (
      <SafeAreaView style={{ flex: 1, display: "flex" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Привет мир</Text>
  
          <Text style={{ marginTop: 20 }}>{displayText}</Text>
          <View
            style={{
              backgroundColor: colors[colorIndex],
              width: 100,
              height: 100,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setColorIndex((colorIndex + 1) % colors.length); 
              setColorChangeCount(colorChangeCount + 1); 
              setDisplayText(colorsText[(colorIndex + 1) % colors.length]); 
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>Нажимай!</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20 }}>
            {" "}
            Цвет поменялся: {colorChangeCount} раз{" "}
          </Text>
        </View>
      </SafeAreaView>
    );
  }