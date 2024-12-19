import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset, double } from "../redux/counterSlice";

export default function lab1() {
  const count =useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.text}>Счётчик: {count}</Text>
        <Button title="Увеличить" onPress={() => dispatch(increment())} />
      </View>

      <View style={styles.counterContainer}>
        <Button title="Обнулить" onPress={() => dispatch(reset())} />
      </View>

      <View style={styles.counterContainer}>
        <Button title="Увеличить x2" onPress={() => dispatch(double())} />
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
