import React from "react";
import { SafeAreaView, View, Button, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";

const ThemedSafeAreaView = ({ children }) => {
  const { toggleTheme, backgroundColor } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.buttonContainer}>
        <Button title="Тема" onPress={toggleTheme} />
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ThemedSafeAreaView;
