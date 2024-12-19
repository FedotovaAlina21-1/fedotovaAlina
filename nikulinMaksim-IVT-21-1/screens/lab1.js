import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { useTheme } from "../hooks/themeManager.js";

const Lab1 = () => {
  const [count, setCount] = useState(0);
  const onPress1 = () => setCount((prevCount) => prevCount + 1);

  const colors = ["red", "green", "blue"];
  const [colorIndex, setColorIndex] = useState(0);

  const { backgroundColor, textColor, toggleThemeMode } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={{ alignItems: "center" }}>
        <View style={styles.countContainer}>
          <Text>You clicked: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress1}>
          <Text>Press this button</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % 3);
          }}
          style={{ alignItems: "center" }}
        >
          <Text>
            Color is{" "}
            <Text style={{ color: colors[colorIndex] }}>
              {colors[colorIndex]}
            </Text>
          </Text>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: colors[colorIndex],
            }}
          ></View>
        </TouchableOpacity>
      </View>
      <Button title="Change Mode" onPress={toggleThemeMode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },

  boxContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Lab1;
