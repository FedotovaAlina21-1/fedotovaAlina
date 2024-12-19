import { View, Button, StyleSheet } from "react-native";
import React, { useState, useMemo, useEffect } from "react";

const Lab3 = () => {
  const [size, setSize] = useState(100);

  const squareColors = ["red", "green", "blue"];
  const [colorIndex, setColorIndex] = useState(0);

  const [color, setColor] = useState("#000");
  const colors = ["#ff7e5f", "#feb47b", "#86a8e7", "#91eae4", "#ff6a6a"];

  // Используем useMemo для сохранения стилей квадрата
  const squareStyle = useMemo(() => {
    return {
      width: size,
      height: size,
      backgroundColor: squareColors[colorIndex],
    };
  }, [size, colorIndex]);

  // Меняем цвет фона постоянно
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={[styles.square, squareStyle]} />

      <Button
        title="Увеличить квадрат"
        onPress={() => setSize((size + 13) % 100)}
      />
      <Button
        title="Изменить цвет на красный"
        onPress={() => setColorIndex((colorIndex + 1) % 3)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    marginBottom: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Lab3;
