import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function Lab1() {
  const emoji = ["🍉", "🍌", "🍓", "🍏", "🍊", "🍑"];

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const changeEmo = () => {
    setCurrent((prevIndex) => (prevIndex + 1) % emoji.length);
    setCount((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>FRUIT KOMBAT</Text>
      <TouchableOpacity onPress={changeEmo} style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji[current]}</Text>
      </TouchableOpacity>
      <Text style={styles.counter}>FruitCoin: {count} $$</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginBottom: 30,
  },
  emojiContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 100,
  },
  counter: {
    fontSize: 30,
    marginTop: 20,
  },
});
