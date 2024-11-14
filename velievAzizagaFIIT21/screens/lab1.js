import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

export default function lab1() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.text}>Счётчик: {count}</Text>
        <Button title="Увеличить" onPress={() => setCount(count + 1)} />
      </View>

      <View style={styles.counterContainer}>
        <Button title="Обнулить" onPress={() => setCount(0)} />
      </View>

      <View style={styles.counterContainer}>
        <Button title="Увеличить x2" onPress={() => setCount(count * 2)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
