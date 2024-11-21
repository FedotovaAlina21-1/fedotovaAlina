import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const colors = ["black", "red", "blue", "green", "yellow", "purple"];
const colorsText = [
  "Цвет квадрата черный",
  "Цвет квадрата красный",
  "Цвет квадрата синий",
  "Цвет квадрата зелёный",
  "Цвет квадрата жёлтый",
  "Цвет квадрата фиолетовый",
];
export default function HomeScreen() {
  const [colorIndex, setColorIndex] = useState(0); // Меняет цвет
  const [colorChangeCount, setColorChangeCount] = useState(0); // Счётчик кликов на квадрат
  const [displayText, setDisplayText] = useState(colorsText[0]); // Говорит какого цвета квадрат
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
            setColorIndex((colorIndex + 1) % colors.length); // Меняет цвет
            setColorChangeCount(colorChangeCount + 1); // Счётчик
            //setDisplayText((displayText + 1) % 3);
            setDisplayText(colorsText[(colorIndex + 1) % colors.length]); // Текст цвета
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
