import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";

const colors: string[] = ["black", "red", "blue", "green", "yellow", "purple"];
const colorsText: string[] = [
  "Черный",
  "Красный",
  "Синий",
  "Зелёный",
  "Жёлтый",
  "Фиолетовый",
];

export default function HomeScreen() {
  const [colorIndex, setColorIndex] = useState(0);
  const [boxSize, setBoxSize] = useState(100);

  const [characters, setCharacters] = useState([]);

  const [nextChar, setNextChar] = useState(1);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setCharacters(res.data.results);
      console.log(res);
      console.log(characters);
    });
  }, []);

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [displayText, setDisplayText] = useState(colorsText[0]);

  function NextFunc(val) {
    if (val == 20) {
      setNextChar(1);
    } else {
      setNextChar(nextChar + 1);
    }
  }

  function PrevFunc(val) {
    if (val == 1) {
      setNextChar(20);
    } else {
      setNextChar(nextChar - 1);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>
          {characters[nextChar - 1]?.name}
        </Text>
        <img src={characters[nextChar - 1]?.image} />

        <TouchableOpacity
          onPress={() => {
            PrevFunc(nextChar);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Предыдущий</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            NextFunc(nextChar);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Следующий</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>
          Персонаж №{characters[nextChar - 1]?.id}
        </Text>

        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: boxSize,
            height: boxSize,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % colors.length);
            setDisplayText(colorsText[(colorIndex + 1) % colors.length]);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Поменяй цвет</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBoxSize(randomInt(100, 150));
          }}
          style={{
            backgroundColor: "yellow",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Поменяй размер</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
